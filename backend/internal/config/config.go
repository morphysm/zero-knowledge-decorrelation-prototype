package config

type Config struct {
	App struct {
		Host string
		Port string
	}
}

func Load() (*Config, error) {
	cfg := Config{
		App: struct {
			Host string
			Port string
		}{
			Host: "127.0.0.1",
			Port: "8080",
		}}

	return &cfg, nil
}


