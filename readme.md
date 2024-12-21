# Laura villumsen

## Setup

1. Create a ".env.local" for environment variables.
2. Run `docker compose --env-file=.env.local up` to start Docker
3. Go to http://localhost:8080/wp-admin to start the WordPress installation.
4. Go to Settings -> Permalinks and set the structure to "/case/%postname%/"
5. Check that the rest API is working: http://localhost:8080/wp-json.
6. Install Advanced Custom Fields plugin
7. Import data from production site.
