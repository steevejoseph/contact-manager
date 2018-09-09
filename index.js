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
	res.render('landing.ejs');
});


app.get("/signup", function(req, res){
	res.render("login.ejs");
	
});

// Authenticated signup logic.
app.post("/signup", function(req, res){

	User.register(new User({username:req.body.username}), req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render("login.ejs");
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
    				console.log(contactList);
    				contactList = JSON.stringify(contactList);
    				console.log(typeof contactList);
    				res.render("dashboard.ejs", {user:user, contactList:contactList});
    			}

    		});
    	}
    });
});


// app.get("/:id/addcontact", function(req, res){
// 	res.render("addcontact.ejs", {userId:req.params.id});
// });

app.post("/:id/addcontact", function(req, res){
	// pull info from page.
	// make new contact
	// redir to the "home" page.
	console.log("HIT ADDCONTACT!");
	Contact.create({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		fullName: req.body.firstName + " " + req.body.lastName,
		company: req.body.company,
		mobilePhone: req.body.mobilePhone,
		homePhone: req.body.homePhone,
		email: req.body.email,
		birthday: req.body.birthday,
		
		user: req.params.id, 

		
	}, function(err, newContact){
		if(err){console.log(err);}
	});
});


function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
};

app.delete("/:id/deletecontact", function(req, res) {
    var contactID = mongoose.Types.ObjectId(req.body.id);
    var userID = req.params.id;
    console.log(contactID);
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
// render search route (splash/landing page).
// app.get("/:id/searchcontact", function(req, res) {
// 	res.render('search.ejs');
// });

app.post("/:id/searchcontact", function(req, res) {
    var query = req.body.query;
    var userID = req.params.id;
    Contact.find({name:query, user:userID}, function(err, contacts) {
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

//logout route!
app.get("/:id/logout", function(req, res){
	req.logout();
	res.redirect("/");
});

// api route for new user.
app.post("/api/users/new", function(req, res){
	
	console.log(req.body);
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
			console.log(new_user);
			res.send(JSON.stringify(new_user));
		}
	});
});

app.listen(process.env.PORT, process.env.IP, function(){
	console.log('Server running!');
	
});

