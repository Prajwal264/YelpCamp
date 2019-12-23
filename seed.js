// import mongoose
var mongoose = require("mongoose");

// import campgrounds
var Campground = require("./models/Campground.js");

// import comments
var Comment = require("./models/Comments.js");	

// static comments 
var seeds = [
	{ 
		name: "Clouds Rest",
		image: "https://www.holidify.com/images/cmsuploads/compressed/6677326239_f4074c97b8_z_20190212181551.jpg",
		description: "Chopta is one destination which has recently made it to the list of the best offbeat destination in the country. It is a little place tucked away in the Garhwal Mountains and is the best retreat to beat the summer heat. The Magpie Camp in Chopta lets you experience this place in its true form. The view of the surrounding valley and mountains is enough to take your breath away. There are several tourist sites here like the Chandrashila Peak, Deoria Tal, and Tungnath Temple. This is one place which deserves your time."
	},
	{ 
		name: "Mehar, Jaisalmer",
		image: "https://www.holidify.com/images/cmsuploads/compressed/25439743351_5e7c669338_z_20190212183635.jpg",
		description: "For those of you looking for a stay in the deserts of Rajasthan, Mehar is the perfect place to plan your stay. Located near the dunes, the Mehar camp lets you experience the arid deserts of Jaisalmer from up close. It has been defined by tourists as a place to eat, drink and be merry! The camps have all the facilities to make it a comfortable stay and have your day packed with fun-filled activities. The main advantage of this place is its proximity to touristy places like Kuldhara, Damodara, Lodhruva and the other abandoned villages."
	},
	{ 
		name: "Coorg Planter’s Camp, Coorg",
		image: "https://www.holidify.com/images/cmsuploads/compressed/40058688553_db7ca0c3f2_z_20190212185858.jpg",
		description: "Coorg is one of the top tourist destinations in the country and is thronged by people during the holiday seasons. However, very few of these tourists think of staying in the unconventional camp sites to make their stay ever more enjoyable. The Coorg Planter’s Camp is an eco camp built right in the middle of the forests. It provides you with an opportunity to visit the famous coffee and cardamom plantations of Coorg. Just take a walk through these plantations or relax near a waterfall and you will experience the healing touch of nature."
	}
]

function seedDB(){
	// remove all campgrounds
	Campground.deleteMany({}, function(err){
		if(err){
			console.log(err);
		} else {
			console.log("Camgrounds removed");
		}
		// add new campgrounds
		seeds.forEach(function(seed){
		Campground.create(seed, function(err, campground){
			if(err){
				console.log(err);
			} else {
				console.log("Added a new Campground");
				// add new comments 
				Comment.create({
					text: "This is a nice place",
					author: "Rick"
				}, function(err, comment){
					if(err) {
						console.log(err);
					} else {
						console.log("Comment Created");
						// associate the comment with the current campground
						campground.comments.push(comment);
						campground.save();
						console.log("Comment is associated with the campground");
					}
				})
			}
		});
	});
	});
}

// export return
module.exports = seedDB;