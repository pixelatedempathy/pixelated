from __future__ import annotations
from typing import Dict, Any

NORMALIZED_FIELDS = ['id','source','text','topics','license','provenance']

def normalize_pubmed(record: Dict[str, Any]) -> Dict[str, Any]:
    return {
        'id': None,
        'source': 'pubmed',
        'text': f"{record.get('title','')}\n\n{record.get('abstract','')}",
        'topics': record.get('mesh_terms', []),
        'license': 'permissive',
        'provenance': {'source_url': 'https://pubmed.ncbi.nlm.nih.gov/'}
    }
