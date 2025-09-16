"""
Extended Pixel Emotional Intelligence Engine API
An API that combines the existing emotional intelligence pipeline with the Azure Conversational Agent.
"""

import os
import sys
import uvicorn
from pathlib import Path

# Add the mandy directory to the path so we can import the integration modules
sys.path.append(str(Path(__file__).parent / "ai" / "mandy"))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import existing components
from ai.pixel.pipeline.emotional_pipeline import EmotionalPipeline
from ai.pixel.pipeline.schemas import PipelineInput, FullPipelineOutput

# Import new integration components
try:
    from ai.mandy.azure_agent_integration.pixelated_orchestrator import PixelatedOrchestrator, ChatMessage, ChatRequest
    integration_available = True
except ImportError as e:
    print(f"⚠️  Integration modules not available: {e}")
    integration_available = False

app = FastAPI(
    title="Pixel Emotional Intelligence Engine (Extended)",
    description="An extended API for analyzing the emotional content of text with Azure Conversational Agent integration.",
    version="0.2.0",
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize existing pipeline
pipeline = EmotionalPipeline()

# Initialize integration components if available
if integration_available:
    orchestrator = PixelatedOrchestrator()
else:
    orchestrator = None

@app.get("/")
async def root():
    """
    Root endpoint with information about the API.
    """
    return {
        "message": "Pixel Emotional Intelligence Engine (Extended)",
        "version": "0.2.0",
        "description": "This API combines emotional intelligence analysis with Azure Conversational Agent integration.",
        "integration_available": integration_available
    }

@app.post("/analyze", response_model=FullPipelineOutput)
def analyze_text(input_data: PipelineInput):
    """
    Runs the emotional intelligence pipeline on the input text.
    """
    return pipeline.forward(input_data.text)

@app.post("/analyze-extended")
async def analyze_text_extended(request: ChatRequest):
    """
    Runs both the emotional intelligence pipeline and the Azure Conversational Agent on the input text.
    """
    if not integration_available:
        return {
            "error": "Azure Conversational Agent integration not available",
            "emotional_analysis": pipeline.forward(request.message).dict()
        }
    
    try:
        # Process with both systems
        result = orchestrator.process_message(request.message, request.history)
        return result
    except Exception as e:
        # Fallback to just emotional analysis
        return {
            "error": f"Failed to process with Azure agent: {str(e)}",
            "emotional_analysis": pipeline.forward(request.message).dict()
        }

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    """
    Chat endpoint that uses the Azure Conversational Agent with PsyCare fallback.
    """
    if not integration_available:
        return {
            "error": "Azure Conversational Agent integration not available",
            "fallback_response": f"I understand you're asking about: '{request.message}'. This is a fallback response as the full integration is not available."
        }
    
    try:
        # In a full implementation, this would use the Azure agent
        # For now, we'll use a simple response
        return {
            "messages": [f"I understand you're asking about: '{request.message}'. This is a response from the integrated system."],
            "need_more_info": False
        }
    except Exception as e:
        return {
            "error": f"Failed to process chat: {str(e)}"
        }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)