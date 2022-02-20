import requests

# TODO: Pull from CDK output file
BASE_URL = "https://ck7q26rfh5.execute-api.us-east-1.amazonaws.com/prod/"


class TestMintBadges:
    @staticmethod
    def test_mint_badges_valid_response() -> None:
        """Make a request to the mint badges endpoint.

        Currently just verify an "ok" response is returned.

        In the future, will will read from the blockchain
        to assert that an NFT was actually minted.
        """
        resp = requests.post(f"{BASE_URL}/badges")
        assert resp.status_code == 200, resp.content


class TestGetBadges:
    @staticmethod
    def test_get_badges_valid_response() -> None:
        """Make a request to the get_badges endpoint.

        Currently just verify an "ok" response is returned.
        """
        resp = requests.get(f"{BASE_URL}/badges")
        assert resp.status_code == 200, resp.content


class TestGetAvailableBadges:
    @staticmethod
    def test_get_available_badges_valid_response() -> None:
        """Make a request to the get_available_badges endpoint.

        Currently just verify an "ok" response is returned.
        """
        resp = requests.get(f"{BASE_URL}/badges")
        assert resp.status_code == 200, resp.content


class TestAuthenticateApi:
    @staticmethod
    def test_get_available_badges_valid_response() -> None:
        """Make a request to the get_available_badges endpoint.

        Currently just verify an "ok" response is returned.
        """
        resp = requests.get(f"{BASE_URL}/badges")
        assert resp.status_code == 200, resp.content
