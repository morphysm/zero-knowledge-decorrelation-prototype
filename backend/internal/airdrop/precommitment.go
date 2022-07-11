package airdrop

import (
	"fmt"
	"log"
	"net/http"
	"os/exec"
	"strings"

	"github.com/labstack/echo/v4"
)

type (
	PreCommitRequest struct {
		BearerToken   string `header:"Authorization" validate:"required"`
		RewardID      string `json:"rewardId" validate:"required"`
		PreCommitment string `json:"preCommitment" validate:"required"`
	}
)

// PostPreCommitment returns a json with the final commit
func (a *airdropHandler) PostPreCommitment(c echo.Context) error {
	var payload PreCommitRequest
	if err := c.Bind(&payload); err != nil {
		return err
	}

	if err := (&echo.DefaultBinder{}).BindHeaders(c, &payload); err != nil {
		return err
	}

	if err := c.Validate(payload); err != nil {
		return err
	}

	// TODO add SC claim check

	// TODO get reward from famed-github-backend
	user, err := a.gitHubClient.GetUser(c.Request().Context(), payload.BearerToken)
	if err != nil {
		return err
	}

	// TODO
	fmt.Printf("TODO check that user %s is owner of reward %s", user.Login, payload.RewardID)

	// Following node command executions are super hacky, should be replaced by node server or ideally go implementation.

	// Call node script with preCommitment and rewardID.
	// Both musst not be larger that 31 bytes and can be passed as decimal string or hex string (prepended with 0x).
	command := fmt.Sprintf("npx ts-node ./zeroknowledge/pedersen.ts --preCommitment=%s --rewardID=%s", payload.PreCommitment, payload.RewardID)
	parts := strings.Fields(command)
	commitmentBytes, err := exec.Command(parts[0], parts[1:]...).Output()
	if err != nil {
		log.Printf("error generating commitment bytes: %v", err)
		return err
	}

	// Call node script with commitment to update list of commitments and calculate merkle root.
	commitmentHex := strings.TrimSuffix(string(commitmentBytes), "\n")
	fmt.Println(commitmentHex)
	command = fmt.Sprintf("npx ts-node ./zeroknowledge/addNewCommitment.ts --commitment=%s", commitmentHex)
	parts = strings.Fields(command)
	output, err := exec.Command(parts[0], parts[1:]...).Output()
	if err != nil {
		log.Printf("error generating new merkle root: %v", err)
		return err
	}

	splittedOutput := strings.Split(string(output), "root:")
	newMerkleRoot := strings.TrimSuffix(splittedOutput[len(splittedOutput)-1], "\n")
	err = a.ethClient.PostMerkleRoot(c.Request().Context(), newMerkleRoot)
	if err != nil {
		log.Printf("error posting merkle root: %v", err)
		return err
	}

	// TO add SC claim updated

	return c.NoContent(http.StatusOK)
}
