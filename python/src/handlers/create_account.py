"""Create an account in the database."""
import json
import logging
from typing import Any, Dict

from lib.database_models import AccountModel


logger = logging.getLogger("create_account_handler")


def create_user_handler(event: Dict, context: Any) -> Dict:
    event_body = json.loads(event["body"])

    try:
        account = AccountModel(**event_body)
    except Exception as e:
        logger.error(e)
        return {
            "statusCode": 400,
            "body": json.dumps(
                {
                    "error": f"Invalid arguments to create account {json.dumps(event_body)}"
                }
            ),
        }

    account.save()
    return {"statusCode": 200, "body": account.to_json()}
