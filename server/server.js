//ENVIRONMENT VARS
require('./config/env.js').createEnvironment();

//GLOBAL VARS
userHelper = require('./database/userSession.js');

//IMPORTS
const express = require('express');
const app = express();
app.use(express.json());

require('./config/database.js').connectDB();


//CORS
const cors = require('cors');
const corsOptions = {
    origin: process.env.ORIGIN,
    credentials: true
}
app.use(cors(corsOptions));

//SESSION
const passport = require('passport');
const session = require('express-session');

userHelper.initPassport(app, passport, session);

//API CALLS
userHelper.register(app);
userHelper.login(app, passport);
userHelper.getUser(app);
userHelper.logout(app);

//Server started
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});