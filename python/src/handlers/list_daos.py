"""List all accounts matching query params."""
import json
from typing import Any, Dict

from lib.database_models import AccountModel


def list_daos_handler(event: Dict, context: Any) -> Dict:
    """List accounts matching params.

    TODO: Implement filtering, pagination, etc.
    """
    accounts = AccountModel.scan()
    return {
        "statusCode": 200,
        "body": json.dumps([a.attribute_values for a in accounts]),
    }
