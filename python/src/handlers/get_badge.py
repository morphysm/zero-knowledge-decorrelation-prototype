"""List all accounts matching query params."""
from typing import Any, Dict


def get_badge_handler(event: Dict, context: Any) -> Dict:
    """Get badge with path param as ID."""
    return {"statusCode": 200, "body": "Test"}
