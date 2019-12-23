var express = require("express");
var router = express.Router();
var Campground = require("../models/Campground");
var Comments = require("../models/Comments");
var middleware = require("../middleware");

// Campground routes

// campgrounds page
router.get("/", function(req, res) {
	Campground.find({}, function(error, campgrounds){
		if(error) {
			console.log(error);
		} else {
			res.render("campgrounds/index", { campgrounds: campgrounds });
		}
	});
});

// add new campgrounds page
router.get("/new", middleware.isLoggedIn, function(req, res) {
  res.render("campgrounds/new");
});

// Show: to show the details of particular campgrounds
router.get("/:id", function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, campgrounds){
		if(err){
			console.log(err);
		} else {
			res.render("campgrounds/show", { campgrounds: campgrounds })
		}
	});
});

// edit route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		res.render("campgrounds/edit", { campground: campground });
	});
});

// campground update route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground){
		if(err){
			res.redirect("/campgrounds");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// campground delete route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err, campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			Comments.deleteMany({ _id: { $in: campground.comments } }, function(err){
				if(err){
					console.log(err)
				} else {
					res.redirect("/campgrounds");
				}
			});
		}
	});
});

// add the campground to the array
router.post("/", middleware.isLoggedIn, function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var price = req.body.price;
  var author = {
	  id: req.user._id,
	  username: req.user.username
  }
  var newCampground = {name: name, image: image, description: description, price: price, author: author};
  Campground.create(newCampground, function(error, campgrounds){
	  if(error) {
		  console.log(error);
	  } else {
		res.redirect("/campgrounds");
	  }
  });
});

// export router
module.exports = router;
