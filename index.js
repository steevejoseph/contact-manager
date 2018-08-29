// Include dependencies
var express  = require("express"),
	mongoose = require("mongoose"),
	app      = express();

// Include the Schemas/Models
var	Contact  = require("./models/contact.js"),
	User     = require("./models/user.js");

// Connect to URL set in env variables.
mongoose.connect('mongodb://team7:ABC123@ds133152.mlab.com:33152/contact-manager', {useNewUrlParser: true});

app.use(express.static(__dirname + '/public'));

// render root route (splash/landing page).
app.get("/", function(req, res){
	res.render('splash.ejs');
});

//change back to orig 
app.listen(2000, process.env.IP, function(){
	console.log('Server running!');
});
