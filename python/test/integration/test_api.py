from datetime import datetime
from typing import Dict

import pytest
import requests

from python.lib.enums import Platform


# TODO: Pull from CDK output file
BASE_URL = "https://ck7q26rfh5.execute-api.us-east-1.amazonaws.com/prod/"


class TestMintBadges:
    @staticmethod
    def test_mint_badges_valid_request() -> None:
        """Make a request to the mint badges endpoint.

        Currently just verify an "ok" response is returned.

        In the future, will will read from the blockchain
        to assert that an NFT was actually minted.
        """
        body = {"address": "foo", "description": "bar"}
        resp = requests.post(f"{BASE_URL}/badges", json=body)
        assert resp.status_code == 200, resp.content

    @staticmethod
    def test_mint_badges_invalid_request() -> None:
        resp = requests.post(f"{BASE_URL}/auth")
        assert resp.status_code == 400, resp.content


class TestGetBadges:
    @staticmethod
    @pytest.mark.parametrize(
        "params",
        [
            dict(),
            {
                "since": datetime.now(),
                "limit": 10,
                "status": "minted",
            },
        ],
    )
    @pytest.mark.parametrize("platform", [Platform.DISCORD])
    def test_get_badges_valid_request(params: Dict, platform: Platform) -> None:
        """Make a request to the get_badges endpoint.

        Currently just verify an "ok" response is returned.
        """
        params["platform"] = platform.name
        resp = requests.get(f"{BASE_URL}/badges", params=params)
        assert resp.status_code == 200, resp.content

    @staticmethod
    def test_get_badges_invalid_request() -> None:
        resp = requests.get(f"{BASE_URL}/badges")
        assert resp.status_code == 400, resp.content


class TestAuthenticateApi:
    @staticmethod
    @pytest.mark.parametrize("platform", [Platform.DISCORD])
    def test_authenticate_platform_valid_request(platform: Platform) -> None:
        """Make a request to the authenticate_platform endpoint.

        Currently just verify an "ok" response is returned.
        """
        body = {
            "platform": platform.name,
            "authorization_code": "123",
            "scopes": ["read"],
        }
        resp = requests.post(f"{BASE_URL}/auth", json=body)
        assert resp.status_code == 200, resp.content

    @staticmethod
    def test_authenticate_platform_invalid_request() -> None:
        resp = requests.post(f"{BASE_URL}/auth")
        assert resp.status_code == 400, resp.content
