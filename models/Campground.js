// import mongoose
var mongoose = require("mongoose");

// create a schema 
campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	price: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

// create a model 
module.exports = mongoose.model("Campground", campgroundSchema);