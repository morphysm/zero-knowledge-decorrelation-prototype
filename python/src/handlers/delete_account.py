import logging
from typing import Any, Dict

from lib.database_models import AccountModel


logger = logging.getLogger("delete_account_handler")


def delete_account_handler(event: Dict, context: Any) -> Dict:
    try:
        account_id = event["pathParameters"]["account_id"]
    except KeyError:
        logger.error(event["pathParameters"])
        return dict()
    try:
        AccountModel.delete(account_id)
    except AccountModel.DoesNotExist:
        return {"statusCode": 404}

    return {"statusCode": 200}
