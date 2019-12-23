// import mongoose
var mongoose = require("mongoose");
// import passport-local-mongoose
var passportLocalMongoose = require("passport-local-mongoose");

// set up user schema
var userSchema = new mongoose.Schema({
	username: String,
	password: String
});

// add the passport-local-mongoose to userSchema
userSchema.plugin(passportLocalMongoose);

// export model
module.exports = mongoose.model("User", userSchema);