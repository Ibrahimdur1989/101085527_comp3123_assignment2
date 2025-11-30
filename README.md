# COMP3123 Assignment 2
#### Name: Ebrahim Al-Serri
#### Student ID:101085527


This is the React frontend for Assignment 2.
It connects to my backend from Assignment 1 (Node + Express + MongoDB)



## How to Run (Backend)&(Frontend)

### `npm install` 
### `npm start`

Backend must be running on: http://localhost:8081 \
forntend must be running on: http://localhost:3000


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
## Build

### `npm run build`

