import logging
from typing import Any, Dict

from lib.database_models import AccountModel


logger = logging.getLogger("delete_account_handler")


def delete_account_handler(event: Dict, context: Any) -> Dict:
    account_id = event["pathParameters"]["account"]

    try:
        account = AccountModel.get(account_id)
        logger.info(f"Deleting account {account}")
        account.delete()
    except AccountModel.DoesNotExist:
        logger.exception(f"Account with account id {account_id} not found")
        return {"statusCode": 404}
    return {"statusCode": 200}
