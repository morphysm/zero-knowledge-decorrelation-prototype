package login

import (
	"errors"
	"net/http"

	"github.com/famed-airdrop-prototype/backend/internal/github"
	"github.com/labstack/echo/v4"
)

type HTTPHandler interface {
	Login(c echo.Context) error
	Callback(c echo.Context) error
}

// loginHandler represents the handler for the airdrop endpoints.
type loginHandler struct {
	client github.Client
}

// NewHandler returns a pointer to the airdrop handler.
func NewHandler(client github.Client) HTTPHandler {
	return &loginHandler{client: client}
}

type LoginResponse struct {
	AccessToken string `json:"accessToken"`
}

// PostPreCommitment returns a json with the final commit
func (lH *loginHandler) Login(c echo.Context) error {
    // Create the dynamic redirect URL for login
    redirectURL := lH.client.GetRedirectURL("http://localhost:8080/login/callback")

	return c.Redirect(http.StatusMovedPermanently, redirectURL)
}

func (lH *loginHandler) Callback(c echo.Context) error {
    code := c.QueryParam("code")
	if code == "" {
		return errors.New("missing code")
	}

    accessToken := lH.client.GetAccessToken(code)
    // githubData := getGithubData(githubAccessToken)

	response := LoginResponse{AccessToken: accessToken}
    return c.JSON(http.StatusOK, response)
}