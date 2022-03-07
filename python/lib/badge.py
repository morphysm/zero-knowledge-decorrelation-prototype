"""Standard representation of a badge."""
import json
from dataclasses import asdict, dataclass
from datetime import datetime
from typing import Optional

from python.lib.enums import Platform


@dataclass
class Badge:
    id: str
    name: str
    platform: Platform

    address: Optional[str] = None
    image_url: Optional[str] = None
    created_datetime: Optional[datetime] = None
    description: Optional[str] = None

    def to_json(self) -> str:
        """Return as JSON serialized string."""
        badge_dict = asdict(self)
        del badge_dict["id"]  # internal use only
        # Enum is not serializable
        badge_dict["platform"] = badge_dict["platform"].name
        return json.dumps(badge_dict)
