from __future__ import annotations
from typing import Iterable
from .base import BaseConnector, IngestRecord

class PubMedConnector(BaseConnector):
    def __init__(self):
        super().__init__('pubmed')
    def fetch(self) -> Iterable[IngestRecord]:
        # Non-prod stub example
        yield IngestRecord(source=self.name, data={
            'title': 'Example PubMed abstract',
            'abstract': 'This is a placeholder abstract for testing.',
            'mesh_terms': ['Therapy', 'Counseling']
        })
