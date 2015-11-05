//The server for the project
//front end currently localhost/test.html

var fs = require("fs");
var file = "users.db";
var exists = fs.existsSync(file);

if(!exists){
	fs.openSync(file, "w");
}

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

db.serialize(function() {
	if(!exists){
		db.run("CREATE TABLE peeps (username varchar(20) NOT NULL PRIMARY KEY, password varchar(20) NOT NULL, city varchar(30) NOT NULL, state varchar(30) NOT NULL, country varchar(30) NOT NULL)");
	}  
});

var express = require('express');
var app = express();

//reqired to support parsing of POST request bodies
var bodyParser = require('body-parser');
app.use(bodyParser.json()); //support json encoded bodies
app.use(bodyParser.urlencoded({extended: false})); //support encoded bodies

//put all static files in static_files/ subdirectory
//and the server will serve them from there: e.g.,:
//      http://localhost:3000/test.html
//will send the file static_file/test.html to the user's web browser
app.use(express.static('static_files'));

//<script src=""></script>
//<script src="https://raw.github.com/andris9/jStorage/master/jstorage.js"></script>

//$script(['json2.js', 'jstorage.js'], 'bundle');

//var db = openDatabase('people', '1.0', 'database of people', 2 * 1024 * 1024);

//db.usercollection.insert({"username"})

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

	$.jStorage.set(username, json2.stringify({password: password, city: city, state: state, country: country}));

	//db.run("INSERT into peeps (username,password,city,state,country) VALUES (?,?,?,?,?)", [username,password,city,state,country]);
	res.send('OK');
	
});


// start the server on http://localhost:3000/
var server = app.listen(3000, function () {
  var port = server.address().port;
  console.log('Server started at http://localhost:%s/', port);
});
