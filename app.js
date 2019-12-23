// import express package
var express = require("express");

// create an express variable
var app = express();

// import body parser
var bodyParser = require("body-parser");

// import mongoose
var mongoose = require("mongoose");

// import flash 
var flash = require("connect-flash");

// import passport
var passport = require("passport");

var LocalStrategy = require("passport-local");

var passportLocalMongoose = require("passport-local-mongoose");

var expressSession = require("express-session");

var methodOverride = require("method-override");

var User = require("./models/User.js");

var Campground = require("./models/Campground.js");

var Comment = require("./models/Comments.js")


var seedDB = require("./seed.js");

// require routes
var campgroundRoutes = require("./routes/campgrounds");
var commentRoutes = require("./routes/comments");
var indexRoutes = require("./routes/index");

// execute seed
// seedDB();

// create a connection 
// local connection
mongoose.connect("mongodb://localhost:27017/Yelpcamp", {useNewUrlParser: true, useUnifiedTopology: true});

// global connection
mongoose.connect("mongodb+srv://Prajwal264:Kingsnvrdie264@yelpcamp-ul0jg.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});

// mongodb+srv://Prajwal264:<password>@yelpcamp-ul0jg.mongodb.net/test?retryWrites=true&w=majority

// allow the express variable to use body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// dependencies

// set default view engine
app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(methodOverride("_method"));

// use flash
app.use(flash());

// passport configuration
// set up the export session
app.use(expressSession({
	secret: "Yelpcamp is great",
	resave: false,
	saveUninitialized: false
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// add local strategy
passport.use(new LocalStrategy(User.authenticate()));

// serialize and deserialize user
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// set the middleware for ever route
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.success = req.flash("success");
	res.locals.error = req.flash("error");
	return next();
})

// use the required routes
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


// listener
app.listen(3000, process.env.IP, function() {
  console.log("Yelpcamp server has started");
});
