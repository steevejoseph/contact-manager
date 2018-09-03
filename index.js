// Include dependencies
var express 				= require("express"),
	mongoose				= require("mongoose"),
	passport				= require("passport"),
	bodyParser				= require("body-parser"),
	LocalStrategy			= require("passport-local"),
	passportLocalMongoose	= require("passport-local-mongoose"),
	app     				= express();

// Include the Schemas/Models
var	Contact  = require("./models/contact.js"),
	User     = require("./models/user.js");

// Connect to URL set in env variables.
mongoose.connect('mongodb://team7:ABC123@ds133152.mlab.com:33152/contact-manager', {useNewUrlParser: true});

app.set("view engine", "ejs");

// Add the Express Session In
// call .use on express object (app var) on something we're requiring, 
// and executing, with options
app.use(require("express-session")({
    // this secret will be used to 
    // encode (encrypt) and decode(decrypt) the sessions.
    secret:"I love you",
    resave: false,
    saveUninitialized: false
}));

// Tell Express to ---- USE PASSPORT-----
app.use(passport.initialize());
app.use(passport.session());

// Two more lines before we can start working on the routes
// Responsible for encoding data and putting it back into the session
passport.serializeUser(User.serializeUser());
// Responsible for reading the session, taking data from the session and unencoding it
passport.deserializeUser(User.deserializeUser());

app.use(express.static(__dirname + '/public'));

// render root route (splash/landing page).
app.get("/", function(req, res){
	res.render('splash.ejs');
});

app.listen(process.env.PORT, process.env.IP, function(){
	console.log('Server running!');
});
