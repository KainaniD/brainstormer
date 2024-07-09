const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const UserSchema = new mongoose.Schema({
   username:{type: String, required: true},
   email:{type: String, required: true},
   attempts: {type:Number, required: true, default: 10},
   restricted: {type:Boolean, required: true, default: false}
})

UserSchema.plugin(passportLocalMongoose); 

const userModel = mongoose.model("users", UserSchema, "users")

module.exports = userModel