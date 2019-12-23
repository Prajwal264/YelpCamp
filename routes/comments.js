var express = require("express");
var router = express.Router({ mergeParams: true });
var Campground = require("../models/Campground");
var Comment = require("../models/Comments");
var middleware = require("../middleware");

// Comments routes 

// new route
router.get("/new", middleware.isLoggedIn, function(req, res){
	// get the current campground
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	});
});


// create route
router.post("/", middleware.isLoggedIn, function(req, res){
	// find the current campground 	
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			req.flash("error", "Something went wrong");
			console.log(err);
		} else {
			// create the comment
			Comment.create(req.body.comment, function(err, comment){
				
				// associate the comment with the username and id
				comment.author.id = req.user._id;
				comment.author.username = req.user.username;
				
				// save the comments array
				comment.save();
				
				// associate comment with campground
				campground.comments.push(comment);
				
				// save comment to campground
				campground.save();
				
				req.flash("success", "Successfully added comment");
				
				// redirect to the show page	
				res.redirect("/campgrounds/" + campground._id);
			});
		}
	});
});

// comment edit route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
	Comment.findById(req.params.comment_id, function(err, comment){
		if(err){
			res.redirect("back");
		} else {
			res.render("comments/edit", {campground_id: req.params.id, comment: comment});
		}
		
	})
});

// comment update route
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment){
		if(err){
			console.log(err);
			res.redirect("back");
		} else {
			req.flash("success", "Comment has been edited");
			res.redirect("/campgrounds/" + req.params.id)
		}
	});
});

// comment destroy route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	// find the comment
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("back");
		} else {
			req.flash("success", "Comment has been deleted");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});


// export router
module.exports = router;
