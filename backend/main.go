package main

import (
	"context"
	"log"
	"os"
	"os/signal"
	"time"

	"github.com/famed-airdrop-prototype/backend/internal/config"
	"github.com/famed-airdrop-prototype/backend/internal/server"
	"github.com/labstack/echo/v4"
)

const (
	// http://patorjk.com/software/taag/#p=display&f=Small%20Slant&t=FamedAirdropBackend
	banner = `
   ____                  _____   _        __              ___           __               __
  / __/__ ___ _  ___ ___/ / _ | (_)______/ /______  ___  / _ )___ _____/ /_____ ___  ___/ /
 / _// _ '/  ' \/ -_) _  / __ |/ / __/ _  / __/ _ \/ _ \/ _  / _ '/ __/  '_/ -_) _ \/ _  / 
/_/  \_,_/_/_/_/\__/\_,_/_/ |_/_/_/  \_,_/_/  \___/ .__/____/\_,_/\__/_/\_\\__/_//_/\_,_/  
                                                 /_/                                       
Go Backend
`
)

func main() {
	//Load config
	cfg, err := config.Load()
	if err != nil {
		log.Fatal(err)
	}

	// Prepare server
	echoServer := prepareServer(cfg)

	// Start server
	start(echoServer, cfg)
}

// Main setup
func prepareServer(cfg *config.Config) *echo.Echo {
	echoServer, echoServerErr := server.NewBackendServer(cfg)
	if echoServerErr != nil {
		log.Fatal(echoServerErr)
	}

	return echoServer
}

// start an echo server with gracefully shutdown.
func start(e *echo.Echo, cfg *config.Config) {
	// Start server for famed backend.
	go func() {
		e.HideBanner = true
		e.StdLogger.Printf(banner)

		if err := e.Start(":" + cfg.App.Port); err != nil {
			log.Fatalf("shutting down the server. %s", err)
		}
	}()

	// Wait for interrupt signal to gracefully shut down the server with a timeout of 10 seconds.
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt)
	<-quit

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	if err := e.Shutdown(ctx); err != nil {
		log.Fatal(err)
	}
}
