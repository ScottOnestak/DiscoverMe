//The server for the project
//front end currently localhost/test.html

var express = require('express');
var app = express();

//reqired to support parsing of POST request bodies
var bodyParser = require('body-parser');
app.use(bodyParser.json()); //support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); //support encoded bodies

//put all static files in static_files/ subdirectory
//and the server will serve them from there: e.g.,:
//      http://localhost:3000/test.html
//will send the file static_file/test.html to the user's web browser
app.use(express.static('static_files'));


//Rest API
app.post('/users', function(req,res){
	var postBody = req.body;
	var username = postBody.username;
	var password = postBody.password;
	var city = postBody.city;
	var state = postBody.state;
	var country = postBody.country;

	if(!username | !password | !city | !state | !country){
		res.send('ERROR');
		return; //return early
	}

	//add to database here

});


// start the server on http://localhost:3000/
var server = app.listen(3000, function () {
  var port = server.address().port;
  console.log('Server started at http://localhost:%s/', port);
});
