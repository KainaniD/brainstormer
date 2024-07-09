//ENVIRONMENT VARS
require('./env.js').createEnvironment();


const mongoose = require('mongoose');
const mongoUser = encodeURIComponent(process.env.MONGO_USER);
const mongoPass = encodeURIComponent(process.env.MONGO_PASS);
const mongoURL=`mongodb+srv://${mongoUser}:${mongoPass}@`

module.exports = {
  connectDB : function () {
  const url = mongoURL;
 
  try {
    mongoose.connect(url);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  const dbConnection = mongoose.connection;
  dbConnection.once("open", (_) => {
    console.log(`Database connected!`);
  });
 
  dbConnection.on("error", (err) => {
    console.error(`connection error: ${err}`);
  });
  return;
}
}