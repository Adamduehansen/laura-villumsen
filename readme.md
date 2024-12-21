# Laura villumsen

## Setup

1. Create a ".env.local" for environment variables.
1. Run `docker compose --env-file=.env.local up` to start Docker
1. Go to http://localhost:8080/wp-admin to start the WordPress installation.
1. Go to Settings -> General and change the Web-address to
   "http://localhost:8000/
1. Go to Settings -> Permalinks and set the structure to "/case/%postname%/"
1. Go to Themes and change theme to "blank".
1. Check that the rest API is working: http://localhost:8080/wp-json.
1. Install Advanced Custom Fields plugin
1. Import data from production site.
