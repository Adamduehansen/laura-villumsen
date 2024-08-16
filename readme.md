# Running Docker containers

`docker compose --env-file .env.local up`

# WordPress API routes:

- Get all posts: http://localhost:8080/wp-json/wp/v2/posts?_embed
- Get specific post:
  https://wp.lauravillumsen.dk/wp-json/wp/v2/posts?slug=musikhuset-koebenhavn/
- Get specific page:
  https://wp.lauravillumsen.dk/wp-json/wp/v2/pages?slug=arbejde
