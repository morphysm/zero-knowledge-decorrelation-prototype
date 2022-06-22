package github

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

type Client interface {
	GetAccessToken(code string) string
	GetRedirectURL(callbackUrl string) string
	GetUser(ctx context.Context, accessToken string) (User, error)
}

// githubClient represents a GitHub client.
type client struct {
	clientID string
	// TODO memmory encript 
	clientSecret string
}

func NewClient(clientID string, clientSecret string) Client {
	return &client{
		clientID: clientID,
		clientSecret: clientSecret,
	}
}

func (c *client) GetRedirectURL(callbackUrl string) string {
	return fmt.Sprintf(
        "https://github.com/login/oauth/authorize?client_id=%s&redirect_uri=%s",
        c.clientID,
        callbackUrl,
    )
}


// TODO rework this to be cogruent with fame-github-backend
func (c *client) GetAccessToken(code string) string {
    // Set us the request body as JSON
    requestBodyMap := map[string]string{
        "client_id": c.clientID,
        "client_secret": c.clientSecret,
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