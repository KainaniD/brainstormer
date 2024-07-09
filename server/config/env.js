module.exports = {
    createEnvironment : function () {
        require('dotenv').config();
        const mode = (process.env.MODE === "dev") ? ".env.dev" : ".env.production";
        require('dotenv').config({ path: mode });
  },
  PORT : process.env.PORT || 4000
}