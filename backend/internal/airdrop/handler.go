package airdrop

import (
	"fmt"
	"net/http"
	"os/exec"
	"strings"

	"github.com/labstack/echo/v4"
	"github.com/labstack/gommon/log"
)

type HTTPHandler interface {
	PostPreCommitment(c echo.Context) error
}

// airdropHandler represents the handler for the airdrop endpoints.
type airdropHandler struct{}

// NewHandler returns a pointer to the airdrop handler.
func NewHandler() HTTPHandler {
	return &airdropHandler{}
}

type (
	PreCommitRequest struct {
		PreCommitment string `json:"preCommitment" validate:"required"`
	}

	PreCommitResponse struct {
		Reward string `json:"reward"`
	}
)




// PostPreCommitment returns a json with the final commit
func (healthHandler *airdropHandler) PostPreCommitment(c echo.Context) error {
	var body PreCommitRequest
	if err := c.Bind(&body); err != nil {
		return err
	}

	if err := c.Validate(body); err != nil {
		return err
    }

	// TODO get reward from famed-github-backend
	rewardID := 42

	// Call node script with preCommitment and rewardID. 
	// Both musst not be larger that 31 bytes and can be passed as decimal string or hex string (prepended with 0x).  
	command := fmt.Sprintf("npx ts-node ./zeroknowledge/pedersen.ts --preCommitment=%s --rewardID=%d", body.PreCommitment, rewardID)
	parts := strings.Fields(command)   
	data, err := exec.Command(parts[0], parts[1:]...).Output()
	if err != nil {
		log.Error(err)
	}

	fmt.Println(data)

	command = fmt.Sprintf("npx ts-node ./zeroknowledge/pedersen.ts --preCommitment=%s --rewardID=%d", body.PreCommitment, rewardID)
	parts = strings.Fields(command)   
	data, err = exec.Command(parts[0], parts[1:]...).Output()
	if err != nil {
		log.Error(err)
	}

	response := PreCommitResponse{Reward: "42"}
	return c.JSON(http.StatusOK, response)
}
