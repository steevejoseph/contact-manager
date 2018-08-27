var express = require("express"),
    app     = express();


app.get("/", function(req, res){
	res.render('splash.ejs');
});



app.listen(process.env.PORT, process.env.IP, function(){
	console.log('Server running!');
})