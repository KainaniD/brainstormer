To Build:

/server/.env
- set the below variables (for development mode: MODE = dev)
PORT=4000
MODE="dev"
SECRET=(your secret)
MONGO_USER=(your mongo username)
MONGO_PASS=(your mongo password)

/server/.env.dev
- set the below variable
ORIGIN="http://localhost:5173/"

to start the project, use ./start-project within the root directory
