To-Do List API

A To-Do List API built with Node.js, Express.js, and MongoDB, supporting CRUD operations for managing tasks.

Features
Add tasks: Create new tasks.

View tasks: Retrieve all tasks.

Edit tasks: Update task details.

Delete tasks: Remove tasks.

Unit tests for all CRUD operations.

Tech Stack
Backend: Node.js, Express.js
Database: MongoDB
Testing: Mocha, Chai

API Endpoints
Method	Endpoint	Description

GET	/api/tasks	Get all tasks

POST	/api/task	Create a new task

PUT	/api/task/:id	Update a task by ID

DELETE	/api/task/:id	Delete a task by ID

Setup
Clone the repository:
Install dependencies:

Create a .env file.
PORT=5000
MONGO_URI="your mongodb uri"



