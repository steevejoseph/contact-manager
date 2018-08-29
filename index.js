// Include dependencies
var express  = require("express"),
	mongoose = require("mongoose"),
	app      = express();

// Include the Schemas/Models
var	Contact  = require("./models/contact.js"),
	User     = require("./models/user.js");

// Connect to URL set in env variables.
mongoose.connect('mongodb://team7:ABC123@ds133152.mlab.com:33152/contact-manager', {useNewUrlParser: true});

// render root route (splash/landing page).
app.get("/", function(req, res){
	res.render('splash.ejs');
});

app.listen(process.env.PORT, process.env.IP, function(){
	console.log('Server running!');
})
