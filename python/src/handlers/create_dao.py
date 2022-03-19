"""Create an account in the database."""
import asyncio
import json
import logging
from typing import Any, Dict

from lib.database_models import DaoModel
from lib.discord_utils import get_badges


logger = logging.getLogger("create_dao_handler")


def create_dao_handler(event: Dict, context: Any) -> Dict:
    event_body = json.loads(event["body"])

    logger.info(f"Creating DAO. Event Body: {event_body}")

    badges = asyncio.run(get_badges)

    try:
        dao = DaoModel(**event_body, badges=badges)
    except Exception as e:
        logger.error(e)
        return {
            "statusCode": 400,
            "body": json.dumps(
                {"error": f"Invalid arguments to create DAO {json.dumps(event_body)}"}
            ),
        }

    dao.save()
    return {"statusCode": 200, "body": dao.attribute_values}
