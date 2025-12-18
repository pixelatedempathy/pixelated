from __future__ import annotations
from dataclasses import dataclass
from typing import Iterable, Dict, Any

@dataclass
class IngestRecord:
    source: str
    data: Dict[str, Any]

class BaseConnector:
    def __init__(self, name: str):
        self.name = name
    def fetch(self) -> Iterable[IngestRecord]:
        """Yield records. Non-prod stub: no network calls."""
        raise NotImplementedError
