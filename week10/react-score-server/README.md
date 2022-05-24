# `react-score-server`

The `react-score-server` is the server-side app companion of `react-scores`. It presents some APIs to perform CRUD operations on a student's university exams.

## APIs

Hereafter, we report the designed HTTP APIs, also implemented in the project.

### **List all the exams**

URL: `/api/exams`

HTTP Method: GET.

Description: Get all the exams that the student already passed.

Request body: _None_

```
A short example, if any
```

Response: `200 OK` (success) or `500 Internal Server Error` (generic error).

Response body:

```
[
  {
    "code": "01abc",
    "name": "Web applications I",
    "credits": 6,
    "score": 30,
    "laude": true,
    "date": "2022-06-03"
  },
  {
    ...
  }
]
```

### **Create a new exam**

URL: `/api/exams`

HTTP Method: POST.

Description: Add new passed exam.

Request body:

```
{
  "code": "01abc",
  "score": 30,
  "laude": true,
  "date": "2022-06-03"
}
```

Response: `201 CREATED` (success) or `503 Service unavailable` (generic error) `422 Unprocessable entity`.

Response body: _None_

### **Modify an exam**

URL: `/api/exams/<code>`

HTTP Method: PUT.

Description: Add new passed exam.

Request body:

```
{
  "code": "01abc",
  "score": 30,
  "laude": true,
  "date": "2022-06-03"
}
```

Response: `200 OK` (success) or `503 Service unavailable` (generic error) `422 Unprocessable entity`.

Response body: _None_

### **Delete an existing exam**

URL: `/api/exams/<code>`

HTTP Method: DELETE.

Description: Delete a passed exam.

Example: `/api/exams/01abc`

Request body: _None_

```
{
  "code": "01abc",
  "score": 30,
  "laude": true,
  "date": "2022-06-03"
}
```

Response: `204` (success) or `503 Service unavailable` (generic error) `404`.

Response body: _None_
