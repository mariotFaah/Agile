# API Documentation - Payroll Management System

## Base URL
```
http://localhost:8000
```

## Employees API

### GET /api/employees
- Description: Get all employees
- Response: Array of employees

### GET /api/employees/:id
- Description: Get employee by ID
- Parameters:
  - `id`: Employee ID
- Response: Employee object

### POST /api/employees
- Description: Create a new employee
- Request body:
  ```json
  {
    "nom": "string",
    "prenom": "string",
    "salaire_base": "decimal"
  }
  ```
- Response: Created employee ID

### PUT /api/employees/:id
- Description: Update an employee
- Parameters:
  - `id`: Employee ID
- Request body:
  ```json
  {
    "nom": "string",
    "prenom": "string",
    "salaire_base": "decimal"
  }
  ```
- Response: Success message

### DELETE /api/employees/:id
- Description: Delete an employee
- Parameters:
  - `id`: Employee ID
- Response: Success message

## Primes API

### GET /api/primes
- Description: Get all primes
- Response: Array of primes

### GET /api/primes/:id
- Description: Get prime by ID
- Parameters:
  - `id`: Prime ID
- Response: Prime object

### POST /api/primes
- Description: Create a new prime
- Request body:
  ```json
  {
    "libelle": "string",
    "montant": "decimal",
    "mois": "integer",
    "annee": "integer",
    "id_employe": "integer"
  }
  ```
- Response: Created prime ID

### PUT /api/primes/:id
- Description: Update a prime
- Parameters:
  - `id`: Prime ID
- Request body:
  ```json
  {
    "libelle": "string",
    "montant": "decimal",
    "mois": "integer",
    "annee": "integer",
    "id_employe": "integer"
  }
  ```
- Response: Success message

### DELETE /api/primes/:id
- Description: Delete a prime
- Parameters:
  - `id`: Prime ID
- Response: Success message

## Retenues API

### GET /api/retenues
- Description: Get all retenues
- Response: Array of retenues

### GET /api/retenues/:id
- Description: Get retenue by ID
- Parameters:
  - `id`: Retenue ID
- Response: Retenue object

### POST /api/retenues
- Description: Create a new retenue
- Request body:
  ```json
  {
    "libelle": "string",
    "montant": "decimal",
    "mois": "integer",
    "annee": "integer",
    "id_employe": "integer"
  }
  ```
- Response: Created retenue ID

### PUT /api/retenues/:id
- Description: Update a retenue
- Parameters:
  - `id`: Retenue ID
- Request body:
  ```json
  {
    "libelle": "string",
    "montant": "decimal",
    "mois": "integer",
    "annee": "integer",
    "id_employe": "integer"
  }
  ```
- Response: Success message

### DELETE /api/retenues/:id
- Description: Delete a retenue
- Parameters:
  - `id`: Retenue ID
- Response: Success message

## Bulletins API

### GET /api/bulletins
- Description: Get all bulletins
- Response: Array of bulletins

### GET /api/bulletins/:id
- Description: Get bulletin by ID
- Parameters:
  - `id`: Bulletin ID
- Response: Bulletin object

### POST /api/bulletins/generate
- Description: Generate a new bulletin
- Request body:
  ```json
  {
    "id_employe": "integer",
    "mois": "integer",
    "annee": "integer"
  }
  ```
- Response: Created bulletin ID

### PUT /api/bulletins/:id
- Description: Update a bulletin
- Parameters:
  - `id`: Bulletin ID
- Request body:
  ```json
  {
    "mois": "integer",
    "annee": "integer",
    "salaire_brut": "decimal",
    "salaire_net": "decimal",
    "id_employe": "integer"
  }
  ```
- Response: Success message

### DELETE /api/bulletins/:id
- Description: Delete a bulletin
- Parameters:
  - `id`: Bulletin ID
- Response: Success message

## Error Responses

All endpoints may return the following error responses:

- `400 Bad Request`: Invalid request data
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error
