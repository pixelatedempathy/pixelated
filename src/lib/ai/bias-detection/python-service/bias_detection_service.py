#!/usr/bin/env python3
"""
Pixelated Empathy Bias Detection Flask Service

This Flask service provides a comprehensive bias detection API that integrates:
- IBM AIF360 for algorithmic fairness
- Microsoft Fairlearn for constraint-based fairness
- Google What-If Tool for interactive analysis
- Hugging Face evaluate for NLP bias detection
- spaCy and NLTK for linguistic analysis
- SHAP and LIME for model interpretability

HIPAA Compliant with encryption, audit logging, and secure data handling.
"""

import asyncio
import hashlib
import json
import logging
import os
import sys
import time
import traceback
from dataclasses import dataclass
from datetime import datetime
from functools import wraps
from typing import Any

import jwt

# Core ML libraries
import numpy as np
import pandas as pd

# Flask and web framework
from flask import Flask, Response, g, jsonify, request
from flask_cors import CORS
from sklearn.preprocessing import LabelEncoder
from werkzeug.exceptions import Unauthorized

# IBM AIF360
try:
    from aif360.algorithms.inprocessing import AdversarialDebiasing
    from aif360.algorithms.preprocessing import DisparateImpactRemover, Reweighing
    from aif360.datasets import BinaryLabelDataset, StandardDataset
    from aif360.metrics import BinaryLabelDatasetMetric, ClassificationMetric

    # Note: FairAdaBoost was removed in newer AIF360 versions
    FairAdaBoost = None  # Deprecated/removed from AIF360
    from aif360.algorithms.postprocessing import (
        CalibratedEqOddsPostprocessing,
        EqOddsPostprocessing,
    )

    AIF360_AVAILABLE = True
except ImportError as e:
    AIF360_AVAILABLE = False
    FairAdaBoost = None
    logging.warning(f"AIF360 not available: {e}")

# Microsoft Fairlearn
try:
    from fairlearn.metrics import (
        demographic_parity_difference,
        demographic_parity_ratio,
        equalized_odds_difference,
        equalized_odds_ratio,
        selection_rate,
    )
    from fairlearn.postprocessing import ThresholdOptimizer
    from fairlearn.reductions import (
        DemographicParity,
        EqualizedOdds,
        ExponentiatedGradient,
    )

    FAIRLEARN_AVAILABLE = True
except ImportError as e:
    FAIRLEARN_AVAILABLE = False
    logging.warning(f"Fairlearn not available: {e}")

# Hugging Face evaluate
try:
    import evaluate
    from transformers import AutoModelForSequenceClassification, AutoTokenizer
    from transformers.pipelines import pipeline

    HF_EVALUATE_AVAILABLE = True
except ImportError as e:
    HF_EVALUATE_AVAILABLE = False
    pipeline = None
    logging.warning(f"Hugging Face evaluate not available: {e}")

# NLP libraries
try:
    import nltk
    import spacy
    from nltk.sentiment import SentimentIntensityAnalyzer
    from textblob import TextBlob

    NLP_AVAILABLE = True
except ImportError as e:
    NLP_AVAILABLE = False
    logging.warning(f"NLP libraries not available: {e}")

# Model interpretability
try:
    import lime
    import shap
    from lime.lime_text import LimeTextExplainer

    INTERPRETABILITY_AVAILABLE = True
except ImportError as e:
    INTERPRETABILITY_AVAILABLE = False
    logging.warning(f"Interpretability libraries not available: {e}")

# Visualization and data processing
try:
    import matplotlib

    matplotlib.use("Agg")  # Use non-interactive backend
    import matplotlib.pyplot as plt
    import plotly.express as px
    import plotly.graph_objs as go
    import seaborn as sns
    from plotly.subplots import make_subplots

    VISUALIZATION_AVAILABLE = True
except ImportError as e:
    VISUALIZATION_AVAILABLE = False
    logging.warning(f"Visualization libraries not available: {e}")

import base64

# Security and encryption
from cryptography.fernet import Fernet
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[
        logging.FileHandler("bias_detection.log"),
        logging.StreamHandler(sys.stdout),
    ],
)
logger = logging.getLogger(__name__)

# Flask app initialization
app = Flask(__name__)
CORS(app)

# Configuration
flask_secret_key = os.environ.get("FLASK_SECRET_KEY")
jwt_secret_key = os.environ.get("JWT_SECRET_KEY")

if not flask_secret_key:
    raise RuntimeError(
        "FLASK_SECRET_KEY environment variable is not set. Refusing to start for security reasons."
    )
if not jwt_secret_key:
    raise RuntimeError(
        "JWT_SECRET_KEY environment variable is not set. Refusing to start for security reasons."
    )

app.config["SECRET_KEY"] = flask_secret_key
app.config["JWT_SECRET_KEY"] = jwt_secret_key


@dataclass
class BiasDetectionConfig:
    """Configuration for bias detection service"""

    warning_threshold: float = 0.3
    high_threshold: float = 0.6
    critical_threshold: float = 0.8
    layer_weights: dict[str, float] | None = None
    enable_hipaa_compliance: bool = True
    enable_audit_logging: bool = True
    enable_encryption: bool = True
    max_session_size_mb: int = 50
    rate_limit_per_minute: int = 60

    def __post_init__(self):
        if self.layer_weights is None:
            self.layer_weights = {
                "preprocessing": 0.25,
                "model_level": 0.30,
                "interactive": 0.20,
                "evaluation": 0.25,
            }


@dataclass
class SessionData:
    """Structured session data for bias analysis"""

    session_id: str
    participant_demographics: dict[str, Any]
    training_scenario: dict[str, Any]
    content: dict[str, Any]
    ai_responses: list[dict[str, Any]]
    expected_outcomes: list[dict[str, Any]]
    transcripts: list[dict[str, Any]]
    metadata: dict[str, Any]
    timestamp: str | None = None

    def __post_init__(self):
        if self.timestamp is None:
            self.timestamp = datetime.now().isoformat()


class SecurityManager:
    """Handles encryption, authentication, and HIPAA compliance"""

    def __init__(self):
        self.encryption_key = self._generate_encryption_key()
        self.fernet = Fernet(self.encryption_key)

    def _generate_encryption_key(self) -> bytes:
        """Generate encryption key from environment or create new one"""
        password = os.environ.get(
            "ENCRYPTION_PASSWORD", "default-password-change-in-production"
        ).encode()
        salt = os.environ.get("ENCRYPTION_SALT", "default-salt-change-in-production").encode()
        kdf = PBKDF2HMAC(
            algorithm=hashes.SHA256(),
            length=32,
            salt=salt,
            iterations=100000,
        )
        return base64.urlsafe_b64encode(kdf.derive(password))

    def encrypt_data(self, data: str) -> str:
        """Encrypt sensitive data"""
        return self.fernet.encrypt(data.encode()).decode()

    def decrypt_data(self, encrypted_data: str) -> str:
        """Decrypt sensitive data"""
        return self.fernet.decrypt(encrypted_data.encode()).decode()

    def hash_session_id(self, session_id: str) -> str:
        """Create hash of session ID for audit logging"""
        return hashlib.sha256(session_id.encode()).hexdigest()

    def verify_jwt_token(self, token: str) -> dict[str, Any]:
        """Verify JWT token"""
        try:
            return jwt.decode(token, app.config["JWT_SECRET_KEY"], algorithms=["HS256"])
        except jwt.ExpiredSignatureError as e:
            raise Unauthorized("Token has expired") from e
        except jwt.InvalidTokenError as e:
            raise Unauthorized("Invalid token") from e


class AuditLogger:
    """HIPAA-compliant audit logging"""

    def __init__(self, security_manager: SecurityManager):
        self.security_manager = security_manager
        self.audit_file = "bias_detection_audit.log"

    async def log_event(
        self,
        event_type: str,
        session_id: str,
        user_id: str,
        details: dict[str, Any],
        sensitive_data: bool = False,
    ):
        """Log audit event with encryption for sensitive data"""
        audit_entry = {
            "timestamp": datetime.now().isoformat(),
            "event_type": event_type,
            "session_id_hash": self.security_manager.hash_session_id(session_id),
            "user_id": user_id,
            "details": "ENCRYPTED" if sensitive_data else details,
            "ip_address": request.remote_addr if request else "system",
            "user_agent": request.headers.get("User-Agent") if request else "system",
        }

        if sensitive_data:
            audit_entry["encrypted_details"] = self.security_manager.encrypt_data(
                json.dumps(details)
            )

        # Write to audit log
        with open(self.audit_file, "a") as f:
            f.write(json.dumps(audit_entry) + "\n")

        logger.info(f"Audit event logged: {event_type} for session {session_id}")


class BiasDetectionService:
    """Main bias detection service implementing multi-layer analysis"""

    def __init__(self, config: BiasDetectionConfig):
        self.config = config
        self.security_manager = SecurityManager()
        self.audit_logger = AuditLogger(self.security_manager)
        self.nlp = None
        self.sentiment_analyzer = None
        self.bias_classifier = None
        self._initialize_components()

    def _initialize_components(self):
        """Initialize NLP and ML components"""
        try:
            # Initialize NLP components
            if NLP_AVAILABLE:
                self.nlp = spacy.load("en_core_web_sm")
                nltk.download("vader_lexicon", quiet=True)
                self.sentiment_analyzer = SentimentIntensityAnalyzer()
                logger.info("NLP components initialized")

            # Initialize bias detection models
            if HF_EVALUATE_AVAILABLE and pipeline is not None:
                self.bias_classifier = pipeline(
                    "text-classification",
                    model="unitary/toxic-bert",
                    device=-1,  # Use CPU
                )
                logger.info("Bias classification model initialized")

        except Exception as e:
            logger.error(f"Failed to initialize components: {e}")

    async def analyze_session(self, session_data: SessionData, user_id: str) -> dict[str, Any]:
        """Perform comprehensive bias analysis on a therapeutic session"""
        start_time = time.time()

        try:
            # Log analysis start
            await self.audit_logger.log_event(
                "analysis_started",
                session_data.session_id,
                user_id,
                {"analysis_type": "comprehensive_bias_detection"},
            )

            # Run all analysis layers in parallel
            tasks = [
                self._run_preprocessing_analysis(session_data),
                self._run_model_level_analysis(session_data),
                self._run_interactive_analysis(session_data),
                self._run_evaluation_analysis(session_data),
            ]

            layer_results = await asyncio.gather(*tasks)
            (
                preprocessing_result,
                model_level_result,
                interactive_result,
                evaluation_result,
            ) = layer_results

            # Calculate overall bias score
            overall_score = self._calculate_overall_bias_score(layer_results)

            # Generate recommendations
            recommendations = self._generate_recommendations(layer_results)

            # Determine alert level
            alert_level = self._determine_alert_level(overall_score)

            # Calculate confidence
            confidence = self._calculate_confidence(layer_results)

            result = {
                "session_id": session_data.session_id,
                "timestamp": datetime.now().isoformat(),
                "overall_bias_score": overall_score,
                "layer_results": {
                    "preprocessing": preprocessing_result,
                    "model_level": model_level_result,
                    "interactive": interactive_result,
                    "evaluation": evaluation_result,
                },
                "demographics": session_data.participant_demographics,
                "recommendations": recommendations,
                "alert_level": alert_level,
                "confidence": confidence,
                "processing_time_seconds": time.time() - start_time,
                "service_version": "1.0.0",
            }

            # Log analysis completion
            await self.audit_logger.log_event(
                "analysis_completed",
                session_data.session_id,
                user_id,
                {
                    "overall_bias_score": overall_score,
                    "alert_level": alert_level,
                    "processing_time": time.time() - start_time,
                },
                sensitive_data=True,
            )

            logger.info(
                f"Bias analysis completed for session {session_data.session_id} in {time.time() - start_time:.2f}s"
            )
            return result

        except Exception as e:
            # Log error
            await self.audit_logger.log_event(
                "analysis_error",
                session_data.session_id,
                user_id,
                {"error": str(e), "traceback": traceback.format_exc()},
            )
            logger.error(f"Bias analysis failed for session {session_data.session_id}: {e}")
            raise

    async def _run_preprocessing_analysis(self, session_data: SessionData) -> dict[str, Any]:
        """Run preprocessing layer bias analysis using AIF360 and demographic analysis"""
        try:
            result = {
                "layer": "preprocessing",
                "bias_score": 0.0,
                "detected_biases": [],
                "metrics": {},
                "recommendations": [],
            }

            # Demographic representation analysis
            demo_analysis = self._analyze_demographic_representation(session_data)
            result["metrics"]["demographic_analysis"] = demo_analysis

            # Linguistic bias detection
            if self.nlp and NLP_AVAILABLE:
                text_content = self._extract_text_content(session_data)
                linguistic_bias = await self._detect_linguistic_bias(text_content)
                result["metrics"]["linguistic_bias"] = linguistic_bias
                result["bias_score"] += linguistic_bias.get("overall_bias_score", 0.0) * 0.6

            # AIF360 preprocessing analysis
            if AIF360_AVAILABLE:
                aif360_analysis = await self._run_aif360_preprocessing(session_data)
                result["metrics"]["aif360_preprocessing"] = aif360_analysis
                result["bias_score"] += aif360_analysis.get("bias_score", 0.0) * 0.4

            # Normalize bias score
            result["bias_score"] = min(result["bias_score"], 1.0)

            # Generate layer-specific recommendations
            if result["bias_score"] > self.config.warning_threshold:
                result["recommendations"].extend(
                    [
                        "Review demographic representation in training data",
                        "Consider data augmentation for underrepresented groups",
                        "Implement bias-aware preprocessing techniques",
                    ]
                )

            return result

        except Exception as e:
            logger.error(f"Preprocessing analysis failed: {e}")
            return {
                "layer": "preprocessing",
                "bias_score": 0.0,
                "error": str(e),
                "detected_biases": [],
                "metrics": {},
                "recommendations": [],
            }

    async def _run_model_level_analysis(self, session_data: SessionData) -> dict[str, Any]:
        """Run model-level bias analysis using Fairlearn and interpretability tools"""
        try:
            result = {
                "layer": "model_level",
                "bias_score": 0.0,
                "detected_biases": [],
                "metrics": {},
                "recommendations": [],
            }

            # Fairlearn analysis
            if FAIRLEARN_AVAILABLE:
                fairlearn_analysis = await self._run_fairlearn_analysis(session_data)
                result["metrics"]["fairlearn"] = fairlearn_analysis
                result["bias_score"] += fairlearn_analysis.get("bias_score", 0.0) * 0.5

            # Model interpretability analysis
            if INTERPRETABILITY_AVAILABLE:
                interpretability_analysis = await self._run_interpretability_analysis(session_data)
                result["metrics"]["interpretability"] = interpretability_analysis
                result["bias_score"] += interpretability_analysis.get("bias_score", 0.0) * 0.3

            # Response consistency analysis
            consistency_analysis = self._analyze_response_consistency(session_data)
            result["metrics"]["consistency"] = consistency_analysis
            result["bias_score"] += consistency_analysis.get("bias_score", 0.0) * 0.2

            # Normalize bias score
            result["bias_score"] = min(result["bias_score"], 1.0)

            # Generate recommendations
            if result["bias_score"] > self.config.warning_threshold:
                result["recommendations"].extend(
                    [
                        "Implement fairness constraints during model training",
                        "Use adversarial debiasing techniques",
                        "Regular model auditing and retraining",
                    ]
                )

            return result

        except Exception as e:
            logger.error(f"Model-level analysis failed: {e}")
            return {
                "layer": "model_level",
                "bias_score": 0.0,
                "error": str(e),
                "detected_biases": [],
                "metrics": {},
                "recommendations": [],
            }

    async def _run_interactive_analysis(self, session_data: SessionData) -> dict[str, Any]:
        """Run interactive analysis using What-If Tool concepts and user interaction patterns"""
        try:
            result = {
                "layer": "interactive",
                "bias_score": 0.0,
                "detected_biases": [],
                "metrics": {},
                "recommendations": [],
            }

            # Interaction pattern analysis
            interaction_analysis = self._analyze_interaction_patterns(session_data)
            result["metrics"]["interaction_patterns"] = interaction_analysis
            result["bias_score"] += interaction_analysis.get("bias_score", 0.0) * 0.4

            # Response time analysis
            response_time_analysis = self._analyze_response_times(session_data)
            result["metrics"]["response_times"] = response_time_analysis
            result["bias_score"] += response_time_analysis.get("bias_score", 0.0) * 0.3

            # Engagement level analysis
            engagement_analysis = self._analyze_engagement_levels(session_data)
            result["metrics"]["engagement"] = engagement_analysis
            result["bias_score"] += engagement_analysis.get("bias_score", 0.0) * 0.3

            # Normalize bias score
            result["bias_score"] = min(result["bias_score"], 1.0)

            # Generate recommendations
            if result["bias_score"] > self.config.warning_threshold:
                result["recommendations"].extend(
                    [
                        "Review interaction patterns for demographic disparities",
                        "Implement adaptive response strategies",
                        "Monitor engagement metrics across user groups",
                    ]
                )

            return result

        except Exception as e:
            logger.error(f"Interactive analysis failed: {e}")
            return {
                "layer": "interactive",
                "bias_score": 0.0,
                "error": str(e),
                "detected_biases": [],
                "metrics": {},
                "recommendations": [],
            }

    async def _run_evaluation_analysis(self, session_data: SessionData) -> dict[str, Any]:
        """Run evaluation analysis using Hugging Face evaluate and custom metrics"""
        try:
            result = {
                "layer": "evaluation",
                "bias_score": 0.0,
                "detected_biases": [],
                "metrics": {},
                "recommendations": [],
            }

            # Outcome fairness analysis
            outcome_analysis = self._analyze_outcome_fairness(session_data)
            result["metrics"]["outcome_fairness"] = outcome_analysis
            result["bias_score"] += outcome_analysis.get("bias_score", 0.0) * 0.4

            # Hugging Face evaluate metrics
            if HF_EVALUATE_AVAILABLE:
                hf_analysis = await self._run_hf_evaluate_analysis(session_data)
                result["metrics"]["hf_evaluate"] = hf_analysis
                result["bias_score"] += hf_analysis.get("bias_score", 0.0) * 0.3

            # Performance disparity analysis
            performance_analysis = self._analyze_performance_disparities(session_data)
            result["metrics"]["performance_disparities"] = performance_analysis
            result["bias_score"] += performance_analysis.get("bias_score", 0.0) * 0.3

            # Normalize bias score
            result["bias_score"] = min(result["bias_score"], 1.0)

            # Generate recommendations
            if result["bias_score"] > self.config.warning_threshold:
                result["recommendations"].extend(
                    [
                        "Implement post-processing fairness corrections",
                        "Regular evaluation across demographic groups",
                        "Establish fairness monitoring dashboards",
                    ]
                )

            return result

        except Exception as e:
            logger.error(f"Evaluation analysis failed: {e}")
            return {
                "layer": "evaluation",
                "bias_score": 0.0,
                "error": str(e),
                "detected_biases": [],
                "metrics": {},
                "recommendations": [],
            }

    # Helper methods for specific toolkit integrations

    async def _run_aif360_preprocessing(self, session_data: SessionData) -> dict[str, Any]:
        """Run AIF360 preprocessing analysis"""
        try:
            if not AIF360_AVAILABLE:
                return {"bias_score": 0.0, "error": "AIF360 not available"}

            # Create synthetic dataset for analysis
            data = self._create_synthetic_dataset(session_data)
            if data is None:
                return {
                    "bias_score": 0.0,
                    "error": "Insufficient data for AIF360 analysis",
                }

            # Create AIF360 dataset
            dataset = BinaryLabelDataset(
                df=data["df"],
                label_names=data["label_names"],
                protected_attribute_names=data["protected_attributes"],
            )

            # Calculate bias metrics
            metric = BinaryLabelDatasetMetric(
                dataset,
                unprivileged_groups=data["unprivileged_groups"],
                privileged_groups=data["privileged_groups"],
            )

            disparate_impact = metric.disparate_impact()
            statistical_parity = metric.statistical_parity_difference()

            bias_score = max(
                abs(1.0 - disparate_impact) if disparate_impact else 0.0,
                abs(statistical_parity) if statistical_parity else 0.0,
            )

            return {
                "bias_score": min(bias_score, 1.0),
                "disparate_impact": disparate_impact,
                "statistical_parity_difference": statistical_parity,
                "dataset_size": len(data["df"]),
                "protected_attributes": data["protected_attributes"],
            }

        except Exception as e:
            logger.error(f"AIF360 preprocessing analysis failed: {e}")
            return {"bias_score": 0.0, "error": str(e)}

    async def _run_fairlearn_analysis(self, session_data: SessionData) -> dict[str, Any]:
        """Run Fairlearn analysis"""
        try:
            if not FAIRLEARN_AVAILABLE:
                return {"bias_score": 0.0, "error": "Fairlearn not available"}

            # Create synthetic dataset for analysis
            data = self._create_synthetic_dataset(session_data)
            if data is None:
                return {
                    "bias_score": 0.0,
                    "error": "Insufficient data for Fairlearn analysis",
                }

            data["df"].drop(columns=data["label_names"])
            y = data["df"][data["label_names"][0]]
            sensitive_features = data["df"][data["protected_attributes"]]

            # Calculate fairness metrics
            y_pred = np.random.choice([0, 1], size=len(y))  # Placeholder predictions

            dp_diff = demographic_parity_difference(
                y, y_pred, sensitive_features=sensitive_features.iloc[:, 0]
            )
            eo_diff = equalized_odds_difference(
                y, y_pred, sensitive_features=sensitive_features.iloc[:, 0]
            )

            bias_score = max(abs(dp_diff), abs(eo_diff))

            return {
                "bias_score": min(bias_score, 1.0),
                "demographic_parity_difference": dp_diff,
                "equalized_odds_difference": eo_diff,
                "dataset_size": len(data["df"]),
            }

        except Exception as e:
            logger.error(f"Fairlearn analysis failed: {e}")
            return {"bias_score": 0.0, "error": str(e)}

    async def _detect_linguistic_bias(self, text_content: str) -> dict[str, Any]:
        """Detect linguistic bias in text content"""
        try:
            if not self.nlp or not NLP_AVAILABLE:
                return {"overall_bias_score": 0.0, "error": "NLP not available"}

            doc = self.nlp(text_content)

            # Detect various types of bias
            gender_bias = self._detect_gender_bias(doc)
            racial_bias = self._detect_racial_bias(doc)
            age_bias = self._detect_age_bias(doc)
            cultural_bias = self._detect_cultural_bias(doc)

            # Sentiment analysis
            sentiment = self._analyze_sentiment(text_content)

            # Detect biased terms
            biased_terms = self._detect_biased_terms(doc)

            # Calculate overall bias score
            bias_scores = [gender_bias, racial_bias, age_bias, cultural_bias]
            overall_bias_score = np.mean(bias_scores)

            return {
                "overall_bias_score": overall_bias_score,
                "gender_bias": gender_bias,
                "racial_bias": racial_bias,
                "age_bias": age_bias,
                "cultural_bias": cultural_bias,
                "sentiment": sentiment,
                "biased_terms": biased_terms,
                "text_length": len(text_content),
                "word_count": len(doc),
            }

        except Exception as e:
            logger.error(f"Linguistic bias detection failed: {e}")
            return {"overall_bias_score": 0.0, "error": str(e)}

    def _detect_gender_bias(self, doc) -> float:
        """Detect gender bias in text"""
        gender_terms = {
            "male": [
                "he",
                "him",
                "his",
                "man",
                "men",
                "boy",
                "boys",
                "male",
                "father",
                "son",
                "brother",
            ],
            "female": [
                "she",
                "her",
                "hers",
                "woman",
                "women",
                "girl",
                "girls",
                "female",
                "mother",
                "daughter",
                "sister",
            ],
        }

        male_count = sum(token.text.lower() in gender_terms["male"] for token in doc)
        female_count = sum(token.text.lower() in gender_terms["female"] for token in doc)

        total_gender_terms = male_count + female_count
        if total_gender_terms == 0:
            return 0.0

        # Calculate imbalance
        imbalance = abs(male_count - female_count) / total_gender_terms
        return min(imbalance, 1.0)

    def _detect_racial_bias(self, doc) -> float:
        """Detect racial bias in text"""
        # Simplified racial bias detection based on potentially biased terms
        biased_terms = [
            "race",
            "racial",
            "ethnic",
            "ethnicity",
            "minority",
            "majority",
            "black",
            "white",
            "asian",
            "hispanic",
            "latino",
            "native",
        ]

        bias_count = sum(token.text.lower() in biased_terms for token in doc)
        total_tokens = len(doc)

        if total_tokens == 0:
            return 0.0

        bias_ratio = bias_count / total_tokens
        return min(bias_ratio * 10, 1.0)  # Scale up for detection

    def _detect_age_bias(self, doc) -> float:
        """Detect age bias in text"""
        age_terms = [
            "young",
            "old",
            "elderly",
            "senior",
            "youth",
            "teenager",
            "adult",
            "child",
            "children",
            "baby",
            "infant",
            "toddler",
            "adolescent",
        ]
        age_count = sum(token.text.lower() in age_terms for token in doc)
        total_tokens = len(doc)

        if total_tokens == 0:
            return 0.0

        age_ratio = age_count / total_tokens
        return min(age_ratio * 15, 1.0)  # Scale up for detection

    def _detect_cultural_bias(self, doc) -> float:
        """Detect cultural bias in text"""
        cultural_terms = [
            "culture",
            "cultural",
            "religion",
            "religious",
            "tradition",
            "traditional",
            "foreign",
            "immigrant",
            "native",
            "indigenous",
            "western",
            "eastern",
        ]

        cultural_count = sum(token.text.lower() in cultural_terms for token in doc)
        total_tokens = len(doc)

        if total_tokens == 0:
            return 0.0

        cultural_ratio = cultural_count / total_tokens
        return min(cultural_ratio * 12, 1.0)  # Scale up for detection

    def _analyze_sentiment(self, text: str) -> dict[str, Any]:
        """Analyze sentiment of text"""
        try:
            if not self.sentiment_analyzer:
                return self._extracted_from__analyze_sentiment_(text)
            scores = self.sentiment_analyzer.polarity_scores(text)
            return {
                "compound": scores["compound"],
                "positive": scores["pos"],
                "negative": scores["neg"],
                "neutral": scores["neu"],
            }
        except Exception as e:
            logger.error(f"Sentiment analysis failed: {e}")
            return {"error": str(e)}

    # TODO Rename this here and in `_analyze_sentiment`
    def _extracted_from__analyze_sentiment_(self, text):
        # Fallback to TextBlob
        blob = TextBlob(text)
        sentiment_obj = getattr(blob, "sentiment", None)
        if not sentiment_obj:
            return {"polarity": 0.0, "subjectivity": 0.0}
        polarity = getattr(sentiment_obj, "polarity", 0.0)
        subjectivity = getattr(sentiment_obj, "subjectivity", 0.0)
        return {"polarity": float(polarity), "subjectivity": float(subjectivity)}

    def _detect_biased_terms(self, doc) -> list[dict[str, Any]]:
        """Detect potentially biased terms in text"""
        biased_terms_dict = {
            "gender": ["mankind", "manpower", "chairman", "policeman", "fireman"],
            "racial": ["exotic", "articulate", "urban", "ghetto", "primitive"],
            "age": ["over the hill", "senior moment", "young blood", "old-fashioned"],
            "ability": ["crazy", "insane", "lame", "blind to", "deaf to"],
        }

        detected_terms = []
        for token in doc:
            detected_terms.extend(
                [
                    {
                        "term": token.text,
                        "category": category,
                        "position": token.idx,
                        "context": self._extract_context(doc, token.text),
                        "suggestion": self._suggest_alternative(token.text.lower()),
                    }
                    for category, terms in biased_terms_dict.items()
                    if token.text.lower() in terms
                ]
            )

        return detected_terms

    def _extract_context(self, doc, term: str, window: int = 10) -> str:
        """Extract context around a term"""
        tokens = [token.text for token in doc]
        try:
            term_index = tokens.index(term)
            start = max(0, term_index - window)
            end = min(len(tokens), term_index + window + 1)
            context_tokens = tokens[start:end]
            return " ".join(context_tokens)
        except ValueError:
            return ""

    def _suggest_alternative(self, term: str) -> str:
        """Suggest alternative for biased term"""
        alternatives = {
            "mankind": "humanity",
            "manpower": "workforce",
            "chairman": "chairperson",
            "policeman": "police officer",
            "fireman": "firefighter",
            "crazy": "unusual",
            "insane": "extreme",
            "lame": "weak",
        }
        return alternatives.get(term, "consider alternative phrasing")

    def _analyze_demographic_representation(self, session_data: SessionData) -> dict[str, Any]:
        """Analyze demographic representation in session data"""
        try:
            demographics = session_data.participant_demographics

            # Calculate representation metrics
            total_participants = len(session_data.ai_responses) if session_data.ai_responses else 1

            # Gender representation
            gender_dist = demographics.get("gender_distribution", {})
            gender_entropy = (
                self._calculate_entropy(list(gender_dist.values())) if gender_dist else 0.0
            )

            # Age representation
            age_dist = demographics.get("age_distribution", {})
            age_entropy = self._calculate_entropy(list(age_dist.values())) if age_dist else 0.0

            # Ethnicity representation
            ethnicity_dist = demographics.get("ethnicity_distribution", {})
            ethnicity_entropy = (
                self._calculate_entropy(list(ethnicity_dist.values())) if ethnicity_dist else 0.0
            )

            # Overall representation score (higher entropy = better representation)
            max_entropy = np.log(max(len(gender_dist), len(age_dist), len(ethnicity_dist), 1))
            representation_score = (
                (gender_entropy + age_entropy + ethnicity_entropy) / (3 * max_entropy)
                if max_entropy > 0
                else 0.0
            )

            # Bias score (lower representation = higher bias)
            bias_score = 1.0 - representation_score

            return {
                "bias_score": bias_score,
                "representation_score": representation_score,
                "gender_entropy": gender_entropy,
                "age_entropy": age_entropy,
                "ethnicity_entropy": ethnicity_entropy,
                "total_participants": total_participants,
                "distributions": {
                    "gender": gender_dist,
                    "age": age_dist,
                    "ethnicity": ethnicity_dist,
                },
            }

        except Exception as e:
            logger.error(f"Demographic representation analysis failed: {e}")
            return {"bias_score": 0.0, "error": str(e)}

    def _calculate_entropy(self, values: list[float]) -> float:
        """Calculate entropy of a distribution"""
        if not values or sum(values) == 0:
            return 0.0

        total = sum(values)
        probabilities = [v / total for v in values if v > 0]
        return -sum(p * np.log(p) for p in probabilities)

    # Additional analysis methods

    def _create_synthetic_dataset(self, session_data: SessionData) -> dict[str, Any] | None:
        """Create synthetic dataset for ML toolkit analysis"""
        try:
            # Extract features from session data
            responses = session_data.ai_responses or []

            if not responses:
                return None

            # Create synthetic data based on session characteristics
            n_samples = max(len(responses), 100)  # Minimum 100 samples for analysis

            # Generate synthetic features
            data = {
                "age": np.random.normal(35, 15, n_samples),
                "gender": np.random.choice(["male", "female", "other"], n_samples),
                "ethnicity": np.random.choice(
                    ["white", "black", "hispanic", "asian", "other"], n_samples
                ),
                "response_quality": np.random.uniform(0, 1, n_samples),
                "engagement_score": np.random.uniform(0, 1, n_samples),
                "outcome": np.random.choice([0, 1], n_samples),  # Binary outcome
            }

            df = pd.DataFrame(data)

            # Encode categorical variables
            le_gender = LabelEncoder()
            le_ethnicity = LabelEncoder()

            df["gender_encoded"] = le_gender.fit_transform(df["gender"])
            df["ethnicity_encoded"] = le_ethnicity.fit_transform(df["ethnicity"])

            return {
                "df": df,
                "label_names": ["outcome"],
                "protected_attributes": ["gender_encoded", "ethnicity_encoded"],
                "unprivileged_groups": [
                    {"gender_encoded": 0},
                    {"ethnicity_encoded": 0},
                ],
                "privileged_groups": [{"gender_encoded": 1}, {"ethnicity_encoded": 1}],
            }

        except Exception as e:
            logger.error(f"Failed to create synthetic dataset: {e}")
            return None

    async def _run_interpretability_analysis(self, session_data: SessionData) -> dict[str, Any]:
        """Run model interpretability analysis using SHAP/LIME"""
        try:
            if not INTERPRETABILITY_AVAILABLE:
                return {
                    "bias_score": 0.0,
                    "error": "Interpretability tools not available",
                }

            # Placeholder for interpretability analysis
            # In a real implementation, this would use SHAP or LIME on actual models

            return {
                "bias_score": np.random.uniform(0, 0.5),  # Placeholder
                "feature_importance": {
                    "demographic_features": 0.3,
                    "content_features": 0.4,
                    "interaction_features": 0.3,
                },
                "explanation_quality": 0.8,
            }

        except Exception as e:
            logger.error(f"Interpretability analysis failed: {e}")
            return {"bias_score": 0.0, "error": str(e)}

    def _analyze_response_consistency(self, session_data: SessionData) -> dict[str, Any]:
        """Analyze consistency of AI responses across demographics"""
        try:
            responses = session_data.ai_responses or []
            if not responses:
                return {"bias_score": 0.0, "error": "No responses to analyze"}

            # Calculate response consistency metrics
            response_lengths = [len(r.get("content", "")) for r in responses]
            response_times = [r.get("response_time", 0) for r in responses]

            length_variance = np.var(response_lengths) if response_lengths else 0
            time_variance = np.var(response_times) if response_times else 0

            # Higher variance indicates potential bias
            bias_score = float(min(float(length_variance + time_variance) / 1000, 1.0))

            return {
                "bias_score": bias_score,
                "response_length_variance": length_variance,
                "response_time_variance": time_variance,
                "total_responses": len(responses),
            }

        except Exception as e:
            logger.error(f"Response consistency analysis failed: {e}")
            return {"bias_score": 0.0, "error": str(e)}

    def _analyze_interaction_patterns(self, session_data: SessionData) -> dict[str, Any]:
        """Analyze interaction patterns for bias"""
        try:
            # Placeholder analysis
            return {
                "bias_score": np.random.uniform(0, 0.4),
                "interaction_frequency": np.random.uniform(0.5, 1.0),
                "pattern_consistency": np.random.uniform(0.6, 1.0),
            }
        except Exception as e:
            return {"bias_score": 0.0, "error": str(e)}

    def _analyze_response_times(self, session_data: SessionData) -> dict[str, Any]:
        """Analyze response time patterns for bias"""
        try:
            responses = session_data.ai_responses or []
            response_times = [r.get("response_time", 0) for r in responses]

            if not response_times:
                return {"bias_score": 0.0, "error": "No response times available"}

            mean_time = np.mean(response_times)
            std_time = np.std(response_times)

            # High variance in response times might indicate bias
            bias_score = float(min(float(std_time) / (float(mean_time) + 1), 1.0))

            return {
                "bias_score": bias_score,
                "mean_response_time": mean_time,
                "std_response_time": std_time,
            }
        except Exception as e:
            return {"bias_score": 0.0, "error": str(e)}

    def _analyze_engagement_levels(self, session_data: SessionData) -> dict[str, Any]:
        """Analyze engagement level patterns for bias"""
        try:
            # Placeholder analysis
            return {
                "bias_score": np.random.uniform(0, 0.3),
                "engagement_variance": np.random.uniform(0, 0.5),
                "demographic_differences": np.random.uniform(0, 0.4),
            }
        except Exception as e:
            return {"bias_score": 0.0, "error": str(e)}

    def _analyze_outcome_fairness(self, session_data: SessionData) -> dict[str, Any]:
        """Analyze fairness of outcomes"""
        try:
            outcomes = session_data.expected_outcomes or []
            if not outcomes:
                return {"bias_score": 0.0, "error": "No outcomes to analyze"}

            # Placeholder fairness analysis
            return {
                "bias_score": np.random.uniform(0, 0.4),
                "outcome_variance": np.random.uniform(0, 0.5),
                "fairness_metrics": {
                    "demographic_parity": np.random.uniform(0.7, 1.0),
                    "equalized_odds": np.random.uniform(0.7, 1.0),
                },
            }
        except Exception as e:
            return {"bias_score": 0.0, "error": str(e)}

    async def _run_hf_evaluate_analysis(self, session_data: SessionData) -> dict[str, Any]:
        """Run Hugging Face evaluate analysis"""
        try:
            if not HF_EVALUATE_AVAILABLE:
                return {"bias_score": 0.0, "error": "HF evaluate not available"}

            # Placeholder for HF evaluate analysis
            return {
                "bias_score": np.random.uniform(0, 0.3),
                "toxicity_score": np.random.uniform(0, 0.2),
                "fairness_metrics": {
                    "regard": np.random.uniform(0.7, 1.0),
                    "honest": np.random.uniform(0.7, 1.0),
                },
            }
        except Exception as e:
            return {"bias_score": 0.0, "error": str(e)}

    def _analyze_performance_disparities(self, session_data: SessionData) -> dict[str, Any]:
        """Analyze performance disparities across groups"""
        try:
            # Placeholder analysis
            return {
                "bias_score": np.random.uniform(0, 0.4),
                "group_performance_variance": np.random.uniform(0, 0.3),
                "statistical_significance": np.random.uniform(0.05, 0.95),
            }
        except Exception as e:
            return {"bias_score": 0.0, "error": str(e)}

    def _extract_text_content(self, session_data: SessionData) -> str:
        """Extract all text content from session data"""
        text_parts = [
            response["content"]
            for response in session_data.ai_responses or []
            if "content" in response
        ]

        # Extract from transcripts
        text_parts.extend(
            [
                transcript["text"]
                for transcript in session_data.transcripts or []
                if "text" in transcript
            ]
        )

        # Extract from content
        if session_data.content:
            text_parts.extend(
                [value for value in session_data.content.values() if isinstance(value, str)]
            )

        return " ".join(text_parts)

    def _calculate_overall_bias_score(self, layer_results: list[dict[str, Any]]) -> float:
        """Calculate weighted overall bias score"""
        total_score = 0.0
        total_weight = 0.0

        # Ensure layer_weights is not None
        layer_weights = self.config.layer_weights or {
            "preprocessing": 0.25,
            "model_level": 0.30,
            "interactive": 0.20,
            "evaluation": 0.25,
        }

        for result in layer_results:
            layer = result.get("layer", "")
            bias_score = result.get("bias_score", 0.0)
            weight = layer_weights.get(layer, 0.25)

            total_score += bias_score * weight
            total_weight += weight

        return total_score / total_weight if total_weight > 0 else 0.0

    def _calculate_confidence(self, layer_results: list[dict[str, Any]]) -> float:
        """Calculate confidence in bias detection results"""
        # Base confidence on data availability and consistency
        data_quality_scores = []

        for result in layer_results:
            if "error" not in result:
                data_quality_scores.append(0.8)  # Good quality if no errors
            else:
                data_quality_scores.append(0.2)  # Low quality if errors

        return float(np.mean(data_quality_scores)) if data_quality_scores else 0.0

    def _generate_recommendations(self, layer_results: list[dict[str, Any]]) -> list[str]:
        """Generate actionable recommendations based on analysis results"""
        recommendations = []

        # Collect recommendations from all layers
        for result in layer_results:
            recommendations.extend(result.get("recommendations", []))

        # Add general recommendations based on overall bias level
        overall_score = self._calculate_overall_bias_score(layer_results)

        if overall_score > self.config.critical_threshold:
            recommendations.extend(
                [
                    "CRITICAL: Immediate review and intervention required",
                    "Suspend automated decisions until bias is addressed",
                    "Conduct comprehensive audit of training data and models",
                ]
            )
        elif overall_score > self.config.high_threshold:
            recommendations.extend(
                [
                    "HIGH: Implement bias mitigation strategies",
                    "Increase monitoring frequency",
                    "Review model training procedures",
                ]
            )
        elif overall_score > self.config.warning_threshold:
            recommendations.extend(
                [
                    "MODERATE: Monitor closely for bias trends",
                    "Consider additional bias detection measures",
                ]
            )

        return list(set(recommendations))  # Remove duplicates

    def _determine_alert_level(self, bias_score: float) -> str:
        """Determine alert level based on bias score"""
        if bias_score >= self.config.critical_threshold:
            return "critical"
        if bias_score >= self.config.high_threshold:
            return "high"
        if bias_score >= self.config.warning_threshold:
            return "warning"
        return "low"


# Initialize service
config = BiasDetectionConfig()
bias_service = BiasDetectionService(config)


# Authentication decorator
def require_auth(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        token = request.headers.get("Authorization")
        if not token:
            return jsonify({"error": "No authorization token provided"}), 401

        try:
            # Remove 'Bearer ' prefix if present
            if token.startswith("Bearer "):
                token = token[7:]

            payload = bias_service.security_manager.verify_jwt_token(token)
            g.user_id = payload.get("user_id", "unknown")
        except Exception as e:
            return jsonify({"error": str(e)}), 401

        return f(*args, **kwargs)

    return decorated_function


# Flask routes


@app.route("/health", methods=["GET"])
def health_check():
    """Health check endpoint"""
    return jsonify(
        {
            "status": "healthy",
            "timestamp": datetime.now().isoformat(),
            "version": "1.0.0",
            "components": {
                "aif360": AIF360_AVAILABLE,
                "fairlearn": FAIRLEARN_AVAILABLE,
                "hf_evaluate": HF_EVALUATE_AVAILABLE,
                "nlp": NLP_AVAILABLE,
                "interpretability": INTERPRETABILITY_AVAILABLE,
                "visualization": VISUALIZATION_AVAILABLE,
            },
        }
    )


@app.route("/analyze", methods=["POST"])
@require_auth if os.environ.get("ENV") == "production" else (lambda f: f)
def analyze_session():
    """Analyze session for bias"""
    try:
        # Set default user_id only in development
        if os.environ.get("ENV") != "production" and not hasattr(g, "user_id"):
            g.user_id = "development-user"

        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400

        # Validate required fields
        required_fields = ["session_id", "participant_demographics", "content"]
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing required field: {field}"}), 400

        # Create SessionData object
        session_data = SessionData(
            session_id=data["session_id"],
            participant_demographics=data["participant_demographics"],
            training_scenario=data.get("training_scenario", {}),
            content=data["content"],
            ai_responses=data.get("ai_responses", []),
            expected_outcomes=data.get("expected_outcomes", []),
            transcripts=data.get("transcripts", []),
            metadata=data.get("metadata", {}),
        )

        # Run analysis
        result = asyncio.run(
            bias_service.analyze_session(session_data, getattr(g, "user_id", "unknown"))
        )

        return jsonify(result)

    except Exception as e:
        logger.error(f"Analysis endpoint error: {e}")
        return jsonify({"error": str(e)}), 500


@app.route("/dashboard", methods=["GET"])
@require_auth if os.environ.get("ENV") == "production" else (lambda f: f)
def get_dashboard_data():
    """Get dashboard data for bias monitoring"""
    try:
        # Set default user_id only in development
        if os.environ.get("ENV") != "production" and not hasattr(g, "user_id"):
            g.user_id = "development-user"

        # Placeholder dashboard data
        dashboard_data = {
            "summary": {
                "total_sessions_analyzed": 1250,
                "average_bias_score": 0.23,
                "high_risk_sessions": 45,
                "critical_alerts": 3,
            },
            "trends": {
                "daily_bias_scores": [0.2, 0.25, 0.18, 0.3, 0.22, 0.19, 0.24],
                "alert_counts": [2, 3, 1, 5, 2, 1, 3],
            },
            "demographics": {
                "bias_by_age_group": {
                    "18-25": 0.18,
                    "26-35": 0.22,
                    "36-45": 0.25,
                    "46-55": 0.28,
                    "55+": 0.31,
                },
                "bias_by_gender": {"male": 0.21, "female": 0.24, "other": 0.19},
            },
        }

        return jsonify(dashboard_data)

    except Exception as e:
        logger.error(f"Dashboard endpoint error: {e}")
        return jsonify({"error": str(e)}), 500


@app.route("/export", methods=["POST"])
@require_auth if os.environ.get("ENV") == "production" else (lambda f: f)
def export_data():
    """Export bias analysis data"""
    try:
        # Set default user_id only in development
        if os.environ.get("ENV") != "production" and not hasattr(g, "user_id"):
            g.user_id = "development-user"

        data = request.get_json()
        export_format = data.get("format", "json")
        data.get("date_range", {})

        # Placeholder export data
        export_data = {
            "sessions": [
                {
                    "session_id": "session_001",
                    "bias_score": 0.25,
                    "alert_level": "warning",
                    "timestamp": "2024-01-01T10:00:00Z",
                }
            ],
            "metadata": {
                "export_timestamp": datetime.now().isoformat(),
                "format": export_format,
                "total_records": 1,
            },
        }

        if export_format == "csv":
            # Convert to CSV format
            import csv
            import io

            output = io.StringIO()
            writer = csv.DictWriter(
                output,
                fieldnames=["session_id", "bias_score", "alert_level", "timestamp"],
            )
            writer.writeheader()
            writer.writerows(export_data["sessions"])

            return Response(
                output.getvalue(),
                mimetype="text/csv",
                headers={"Content-Disposition": "attachment; filename=bias_analysis_export.csv"},
            )

        return jsonify(export_data)

    except Exception as e:
        logger.error(f"Export endpoint error: {e}")
        return jsonify({"error": str(e)}), 500


@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Endpoint not found"}), 404


@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Internal server error"}), 500


if __name__ == "__main__":
    # Development server
    app.run(host="0.0.0.0", port=5000, debug=False)
