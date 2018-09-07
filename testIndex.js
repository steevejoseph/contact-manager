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
mongoose.connect(process.env.DBHOST, {useNewUrlParser: true});

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

// tell express to use body-parser so we can read POSTs
app.use(express.bodyParser());

// Two more lines before we can start working on the routes
// Responsible for encoding data and putting it back into the session
passport.serializeUser(User.serializeUser());
// Responsible for reading the session, taking data from the session and unencoding it
passport.deserializeUser(User.deserializeUser());

app.use(express.static(__dirname + '/public'));

//delid dis
var banana = new Contact({
    firstName:"banana",
    lastName:"last",
    email:"banan@gmail.com"
});
banana.save(function(err, newContact) {
    if(err) console.log(err);
    else console.log(newContact);
});
app.get("/", function(req, res) {
	res.render('search.ejs');
});

// render search route (splash/landing page).
app.get("/searchcontact", function(req, res) {
	res.render('search.ejs');
});
app.post("/searchcontact", function(req, res) {
    var query = req.body.query;
    Contact.find({$text:{$search:query}}, function(err, contacts) {
        if(err) {
            console.log(err);
            res.render('search.ejs');
        }
        else {
            for(var i = 0; i < contacts.length; i++) {
                console.log(contacts[i]);
            }
            res.render('search.ejs', {contacts:contacts});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
	console.log('Server running!');
});