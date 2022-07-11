package airdrop

import (
	"github.com/labstack/echo/v4"
)

func (a *airdropHandler) GetZkey(c echo.Context) error {
	return c.File("./public/circuit_final.zkey")
}

func (a *airdropHandler) GetWasm(c echo.Context) error {
	return c.File("./public/circuit.wasm")
}