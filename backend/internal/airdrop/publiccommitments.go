package airdrop

import (
	"net/http"
	"os"
	"strings"

	"github.com/labstack/echo/v4"
)

type publicCommitmentsResponse struct {
	Commitments []string `json:"commitments"`
}

func (a *airdropHandler) GetPublicCommitments(c echo.Context) error {
	data, err := os.ReadFile("./public/publicCommitments.txt")
	if err != nil {
		return err
	}

	commitments := strings.Split(string(data), ",")
	response := publicCommitmentsResponse{Commitments: commitments}
	return c.JSON(http.StatusOK, response)
}