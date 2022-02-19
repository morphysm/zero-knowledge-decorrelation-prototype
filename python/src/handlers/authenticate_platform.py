import json
import logging
from typing import Any, Dict

logger = logging.getLogger("authenticate_platform_handler")


def authenticate_platform_handler(event: Dict, context: Any) -> str:
    """Authenticate a user with a given platform.

    Currently empty - will implement in different PR.
    """
    logger.info(f"Authenticate platform event: {json.dumps(event)}")
    return "foo"
