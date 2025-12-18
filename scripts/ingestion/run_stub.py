#!/usr/bin/env python3
from __future__ import annotations
import json
import sys
from pathlib import Path

# Ensure repo root on path for imports
ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from scripts.ingestion.connectors.pubmed import PubMedConnector
from scripts.ingestion.normalize.schema import normalize_pubmed


def main() -> int:
    conn = PubMedConnector()
    for rec in conn.fetch():
        norm = normalize_pubmed(rec.data)
        print(json.dumps(norm, ensure_ascii=False))
    return 0

if __name__ == '__main__':
    raise SystemExit(main())
