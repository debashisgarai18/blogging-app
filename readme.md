# This is a blogging wesite
- users can sigin/signup here
- can manage their blogs like -> write, update, delete, etc. 

### Techs used:
- backend - Cloudfare workers - with Hono 
- db - postgres + prisma + connection pooling 
- frontend - reactJS + tailwind


# some infos:
#### for serverless BEs
- use the connection pool url in the .toml file - as the backend will pick the url from the .env file there
- use the normal db connection string in the .env file of prisma - as prisma will directly connect to the Postgres DB 