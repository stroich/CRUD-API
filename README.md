# Node CRUD API

# Getting Started

1. Install Node.js

2. Clone the repository:

```
git clone https://github.com/stroich/CRUD-API.git
```

3. Navigate to the crud-api directory

```
cd CRUD-API
```

4. Install the dependencies

```
npm install
```

5. Start the server

```
npm run start:prod
```

# Technologies

- Language: JavaScript or TypeScript
- Frameworks/Libraries: Node.js 20 LTS, dotenv, cross-env, uuid
- Development Tools: eslint, prettier, webpack, nodemon
- Testing: Jest

# Features

1. CRUD operations on users:

- GET: /api/users - retrieve all users
- GET: /api/users/:userId - retrieve a specific user
- POST: /api/users - create a new user

* **Data Params**

  ```json
  {
    "username": "Vladislav",
    "age": 20,
    "hobbies": ["cooking", "sport"]
  }
  ```

- PUT: /api/users/:userId - update an existing user

* **Data Params**

  ```json
  {
    "username": "Vladislav",
    "age": 20,
    "hobbies": ["cooking", "sport"]
  }
  ```

- DELETE: /api/users/:userId - delete a user

2. Error handling:

- 400 Bad Request - invalid data or missing required fields
- 404 Not Found - requested resource not found
- 500 Internal Server Error - unexpected error

3. Development and production modes:

- start:dev for development with live reload
- start:prod for building and running in production

4. Horizontal scaling:

- start:multi for launching multiple instances using Node.js Cluster
