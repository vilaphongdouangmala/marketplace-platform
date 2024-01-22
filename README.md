# messaging-platform


## Backend

### Running Nest.js

#### Without Docker

1. Start the PostgreSQL database using Docker Compose. Open your terminal and navigate to the root project directory, then run:

```
docker-compose up -d postgres
```

2. Navigate to the `backend` directory.
3. Run command to activate nvm.

```
nvm use 18.18.0
```

4. Install npm packages (only needed the first time):

```
npm install
```

5. Create the `.env` file and add this setting (only needed the first time):

```
POSTGRES_HOST=localhost
POSTGRES_USERNAME=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DATABASE=postgres
POSTGRES_PORT=5432
ACCESS_KEY_ID=
SECRECT_KEY_ID=
BUCKET_NAME=
```

6. If you want to run migrations on PostgreSQL, please follow the 'Run Migration' instructions below.
7. Init admin user (first time only):

```
npm run command-nest init-admin-user
```

8. To start the server in debug mode, run:

```
npm run start:dev
```

9. Open your web browser and go to [http://localhost:3000/api/](http://localhost:3000/api/) to see the API documentation.

### Running Migrations

_Note: If you run the nestjs inside the docker, add 'docker-compose exec nestjs' in front of all command below_

To run migrations, follow these steps:

1. Build the project:

```
npm run build
```

2. If you want to create a new migration, run this command (skip this step if you don't need to create a new migration):

```
npm run makemigration migrations/{migration_name}
npm run build
```

3. Run the migration:

```
npm run migrate
```
