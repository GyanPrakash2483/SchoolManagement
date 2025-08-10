
# School Management API

A minimal RESTful API for managing a list of schools, built with Node.js and Express. Supports adding schools, listing all schools sorted by distance, and clearing all records.

## Features
- Add a new school with name, address, latitude, and longitude
- List all schools, sorted by distance from a given location
- Delete all school records
- Built with Node.js, Express, and MySQL

## Getting Started


### Prerequisites
- Node.js (v14 or higher)
- pnpm (or npm/yarn)
- MySQL database (see environment variables below)


### Installation
```bash
pnpm install
```


### Running the Server
```bash
pnpm start
```

The server will start on port 8080 by default (see `src/index.js`).


## API Documentation

- **Postman Collection:** [School Management API Collection](https://www.postman.com/research-physicist-55455105/schoolmanagement/collection/009r21u/school-management-api?action=share&creator=46705676)
- **Live API:** [https://schoolmanagement-production-2963.up.railway.app/](https://schoolmanagement-production-2963.up.railway.app/)

You can import the Postman collection to explore and test all available endpoints.

### Endpoints

- `POST /addSchool` — Add a new school (JSON body: name, address, latitude, longitude)
- `GET /listSchools?latitude=...&longitude=...` — List all schools, sorted by distance from the given coordinates
- `DELETE /clearRecords` — Delete all schools from the database


## Environment Variables

Create a `.env` file in the project root with the following variables:

```
MYSQL_HOST=your_mysql_host
MYSQL_PORT=your_mysql_port
MYSQL_USER=your_mysql_user
MYSQL_PASSWORD=your_mysql_password
```
