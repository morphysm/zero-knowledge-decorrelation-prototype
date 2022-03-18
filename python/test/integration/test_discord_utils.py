import os

import discord  # type: ignore
import pytest

from python.lib.discord_utils import (
    get_all_users,
    get_badges_for_guild,
    get_discord_client,
)

pytestmark = [pytest.mark.asyncio]

BOT_TOKEN = os.environ["DISCORD_TOKEN"]


@pytest.fixture
async def client() -> discord.Client:
    client = await get_discord_client(auth_token=BOT_TOKEN)
    return client


class TestGetDiscordClient:
    @staticmethod
    async def test_get_discord_client() -> None:
        client = await get_discord_client(auth_token=BOT_TOKEN)
        assert client


class TestGetBadgesForGuild:
    @staticmethod
    async def test_get_badges_for_guild(client: discord.Client) -> None:
        await get_all_users(client)
        assert False
        badges = await get_badges_for_guild(client, "931828851565273108")
        assert len(badges) > 0
