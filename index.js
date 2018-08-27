var express = require("express"),
    app     = express();


app.get("/", function(req, res){
	res.render('splash.ejs');
});



app.listen(9000, process.env.IP, function(){
	console.log('Server running!');
})