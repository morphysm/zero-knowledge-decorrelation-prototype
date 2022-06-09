package login

import (
	"bytes"
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
)

type HTTPHandler interface {
	Login(c echo.Context) error
	Callback(c echo.Context) error
}

// loginHandler represents the handler for the airdrop endpoints.
type loginHandler struct{
	clientID string
	// TODO memmory encript 
	clientSecret string
}

// NewHandler returns a pointer to the airdrop handler.
func NewHandler(clientID string, clientSecret string) HTTPHandler {
	return &loginHandler{clientID: clientID, clientSecret: clientSecret}
}

// PostPreCommitment returns a json with the final commit
func (lH *loginHandler) Login(c echo.Context) error {
    // Create the dynamic redirect URL for login
    redirectURL := fmt.Sprintf(
        "https://github.com/login/oauth/authorize?client_id=%s&redirect_uri=%s",
        lH.clientID,
        "http://localhost:8080/login/callback",
    )

	return c.Redirect(http.StatusMovedPermanently, redirectURL)
}

func (lH *loginHandler) Callback(c echo.Context) error {
    code := c.QueryParam("code")
	if code == "" {
		return errors.New("missing code")
	}

    githubAccessToken := lH.getGithubAccessToken(code)
    githubData := getGithubData(githubAccessToken)
    return c.JSON(http.StatusOK, githubData)
}

// TODO move this to a client package
func (lH *loginHandler) getGithubAccessToken(code string) string {
    // Set us the request body as JSON
    requestBodyMap := map[string]string{
        "client_id": lH.clientID,
        "client_secret": lH.clientSecret,
        "code": code,
    }
    requestJSON, _ := json.Marshal(requestBodyMap)

    // POST request to set URL
    req, reqerr := http.NewRequest(
        "POST",
        "https://github.com/login/oauth/access_token",
        bytes.NewBuffer(requestJSON),
    )
    if reqerr != nil {
        log.Panic("Request creation failed")
    }
    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("Accept", "application/json")

    // Get the response
    resp, resperr := http.DefaultClient.Do(req)
    if resperr != nil {
        log.Panic("Request failed")
    }

    // Response body converted to stringified JSON
    respbody, _ := ioutil.ReadAll(resp.Body)

    // Represents the response received from Github
    type githubAccessTokenResponse struct {
        AccessToken string `json:"access_token"`
        TokenType   string `json:"token_type"`
        Scope       string `json:"scope"`
    }

    // Convert stringified JSON to a struct object of type githubAccessTokenResponse
    var ghresp githubAccessTokenResponse
    json.Unmarshal(respbody, &ghresp)

    // Return the access token (as the rest of the
    // details are relatively unnecessary for us)
    return ghresp.AccessToken
}

func getGithubData(accessToken string) string {
    // Get request to a set URL
    req, reqerr := http.NewRequest(
        "GET",
        "https://api.github.com/user",
        nil,
    )
    if reqerr != nil {
        log.Panic("API Request creation failed")
    }

    // Set the Authorization header before sending the request
    // Authorization: token XXXXXXXXXXXXXXXXXXXXXXXXXXX
    authorizationHeaderValue := fmt.Sprintf("token %s", accessToken)
    req.Header.Set("Authorization", authorizationHeaderValue)

    // Make the request
    resp, resperr := http.DefaultClient.Do(req)
    if resperr != nil {
        log.Panic("Request failed")
    }

    // Read the response as a byte slice
    respbody, _ := ioutil.ReadAll(resp.Body)

    // Convert byte slice to string and return
    return string(respbody)
}

