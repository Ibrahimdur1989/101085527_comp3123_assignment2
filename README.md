# COMP3123 Assignment 2
#### Name: Ebrahim Al-Serri
#### Student ID:101085527


This is the React frontend for Assignment 2.
It connects to my backend from Assignment 1 (Node + Express + MongoDB)



## How to Run 

### Option 1 - Run without Docker

### 1. Backend

### `npm install` 
### `npm start`

Backend runs on: http://localhost:8081 

### 2. frontend

### cd frontend
### `npm install` 
### `npm start`

frontend runs on: http://localhost:3000


### Option 2 - Run with Docker (Docker Compose)

From the project root (Where docker-compose.yml is located)

to clear up:
### `docker-compose down`

to build 
### `docker-compose up --build`

This will start 3 containers:
* comp3123-mongo -- MongoDB (port 27017:27017)
* comp3123-backend -- Backend (port 8081:8081)
* comp3123-frontend -- Frontend (port 3000:3000)

Then open:
* Frontend: http://localhost:3000
* Backend API: http://localhost:8081/api/v1


## Features
```
* Login / Signup
* View employees
* Add / Edit / Delete employee
* Search by department or position
* JWT stored in localStorage
* Authentication state managed using Context API
```


## API Endpoints Used 
```
* POST    /api/v1/user/signup
* POST    /api/v1/user/login
* GET     /api/v1/emp/employees
* POST    /api/v1/emp/employees
* PUT     /api/v1/emp/employees/:id
* DELETE  /api/v1/emp/employees/:id
* GET     /api/v1/emp/employees/search
```
## Build (Production)

From the frontend folder

### `npm run build`

