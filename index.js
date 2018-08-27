var express  = require("express"),
	mongoose = require("mongoose"),
    app      = express();


mongoose.connect('mongodb://team7:ABC123@ds133152.mlab.com:33152/contact-manager', use);

app.get("/", function(req, res){
	res.render('splash.ejs');
});



app.listen(process.env.PORT, process.env.IP, function(){
	console.log('Server running!');
})