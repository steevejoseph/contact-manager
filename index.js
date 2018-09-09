// Include dependencies
var express 				= require("express"),
	mongoose				= require("mongoose"),
	passport				= require("passport"),
	bodyParser				= require("body-parser"),
	LocalStrategy			= require("passport-local"),
	passportLocalMongoose	= require("passport-local-mongoose"),
	sanitize				= require("mongo-sanitize"),
	app     				= express();


// Include the Schemas/Models
var	Contact  = require("./models/contact.js"),
	User     = require("./models/user.js");

// Connect to URL set in env variables.
mongoose.connect('mongodb://team7:ABC123@ds133152.mlab.com:33152/contact-manager', {useNewUrlParser: true});
// mongoose.connect(process.env.DBURL, {useNewUrlParser:true});

app.set("view engine", "ejs");

// required for bodyParser now: :/
// (grabbing form data as req.body)
app.use(bodyParser.urlencoded({extended:true}));


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

passport.use(new LocalStrategy(User.authenticate()));

// Two more lines before we can start working on the routes
// Responsible for encoding data and putting it back into the session
passport.serializeUser(User.serializeUser());
// Responsible for reading the session, taking data from the session and unencoding it
passport.deserializeUser(User.deserializeUser());

// Serve the public dir
app.use(express.static(__dirname + '/public'));


// render root route (splash/landing page). 
app.get("/", function(req, res){
	res.render('login.ejs');
});


app.get("/signup", function(req, res){
	res.render("signup.ejs");
	
});

// Authenticated signup logic.
app.post("/signup", function(req, res){

	User.register(new User({username:req.body.username}), req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render("signup.ejs");
		}
		
		passport.authenticate("local")(req, res, function(){
			res.render('login.ejs');
		});
	});
});



app.get("/login", function(req, res){
	res.render('login.ejs'); 
});

// Perform authentication on login
app.post("/login", function(req, res){
	passport.authenticate('local', function(err, user, info) {
    if (err) { 
    	console.log(err);
    	return;
    	
    } if (!user) { 
    	console.log('Incorrect username or password');
    	return res.redirect('/login'); 
    }
    
    req.logIn(user, function(err) {
      if (err) { 
      	console.log(err);
    }
    
    res.redirect('/' + user._id);
    
    });
  })(req, res);
});


// "homepage", will be transferred to "dashboard".
app.get("/:id", isLoggedIn,function(req, res) {
    
    User.findById(req.params.id, function(err, user){
    	if(err){
    		console.log(err);
    	} 
    	else{
    		Contact.find({user:req.params.id}, function(err, contactList){
    			if(err){console.log(err);}
    			else{
    				contactList = JSON.stringify(contactList);
    				res.render("dashboard.ejs", {user:user, contactList:contactList});
    			}
    		});
    	}
    });
});

app.post("/:id/addcontact", function(req, res){
	// pull info from page.
	// make new contact
	// redir to the "home" page.
	Contact.create({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		fullName: req.body.firstName + " " + req.body.lastName,
		company: req.body.company,
		mobilePhone: req.body.mobilePhone,
		homePhone: req.body.homePhone,
		email: req.body.email,
		birthday: req.body.birthday,
		user: req.params.id
	}, function(err, newContact){
		if(err){console.log(err);
		} 
		res.send(JSON.stringify(newContact._id));
	});
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
};

app.post("/:id/deletecontact", function(req, res) {
    var contactID = mongoose.Types.ObjectId(req.body.contactID);
    var userID = req.params.id;
    Contact.findByIdAndRemove(contactID, function(err0, contact) {
        if(err0) console.log(err0);
        else {
            Contact.find({user:userID}, function(err1, contacts) {
                if(err1) console.log(err1);
                else res.redirect("/" + userID);
            });
        }
    });
});

app.post("/:id/searchcontact", function(req, res) {
	var query = sanitize(req.body.query);
	var userID = req.params.id;

	Contact.find({ user: userID, fullName: {'$regex': query, '$options': 'i'} }, function(err, contacts) {
        if(err) {
            console.log(err);
        }
        else {
			res.send(JSON.stringify(contacts));
        }
    });
});

//logout route!
app.get("/:id/logout", function(req, res){
	req.logout();
	res.redirect("/");
});

// api route for new user.
app.post("/api/users/new", function(req, res){
	User.create({
			firstName: req.body.firstName,
	    	lastName: req.body.lastName,
	
	    	// email validation will be done on frontend.
	    	email: req.body.email,
	    	username: req.body.username,
	
	    	// hashed password
	    	password: req.body.password,
	    	birthday: req.body.date
	},	function(err, new_user){
		if(err) console.log(err);
		else{
			res.send(JSON.stringify(new_user));
		}
	});
});

app.listen(process.env.PORT, process.env.IP, function(){
	console.log('Server running!');
});

