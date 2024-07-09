To Create:

Make mongodb cluster

/server/config/database.js
- change everything past @ in mongourl with your cluster url

/server/.env
- set the below variables (for development mode: MODE = dev)
PORT
MODE
SECRET
MONGO_USER
MONGO_PASS

/server/.env.dev
- set the below variable
ORIGIN="http://localhost:5173/"

to start the project, use ./start-project within the root directory