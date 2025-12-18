from __future__ import annotations
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from scripts.ingestion.connectors.pubmed import PubMedConnector
from scripts.ingestion.normalize.schema import normalize_pubmed


def test_pubmed_stub_normalization_contains_text_and_topics():
    conn = PubMedConnector()
    rec = next(iter(conn.fetch()))
    norm = normalize_pubmed(rec.data)
    assert 'text' in norm and isinstance(norm['text'], str) and len(norm['text']) > 0
    assert 'topics' in norm and isinstance(norm['topics'], list)
    assert norm['source'] == 'pubmed'
