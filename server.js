//The server for the project
//front end currently localhost/test.html
//used the code from lectures 11 and 12 to implement the REST API
//implementation of sqlite3 learned and taken from here https://github.com/mapbox/node-sqlite3
//source: http://dalelane.co.uk/blog/?p=3152

var express = require('express');
var app = express();
var http = require('http').Server(app);
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database('theDatabase.db');

db.run("CREATE TABLE IF NOT EXISTS peeps (username varchar(20) PRIMARY KEY, password varchar(20), city varchar(20), state varchar(20), country varchar(20))");
db.run("CREATE TABLE IF NOT EXISTS locate (name varchar(20) PRIMARY KEY, type varchar(20), city varchar(20), country varchar(20))");


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

//post request...create new user
app.post('/users', function(req,res){
	var postBody = req.body;
	var username = postBody.username;
	var password = postBody.password;
	var city = postBody.city;
	var state = postBody.state;
	var country = postBody.country;

	if(!username | !password | !city | !state | !country){
		res.send('BLANK');
		return; //return early
	}

	db.get('SELECT * FROM peeps WHERE username=?', [username], function(err,rows){
		if(err){
			res.send('ERROR');
			return;
		} else {
			if(rows == undefined){
				var stmt = db.prepare("INSERT into peeps VALUES (?,?,?,?,?)");
				stmt.run(username,password,city,state,country);
				stmt.finalize();
				res.send('OK');
				return;
			} else {
				res.send('TAKEN');
				return;
			}
		}
	});
	return;	
});

//user get request
app.get('/users/*/*', function(req,res){
	db.get('SELECT * FROM peeps WHERE username=?', req.params[0], function(err,rows){
		if(err){
			res.send({status: "ERROR"});
			return;
		} else {
			console.log(rows);
			if(rows == undefined){
				res.send({failedUsername: req.params[0], failedPassword: req.params[1]});
				return;
			}
			if(rows.password == req.params[1]){
				res.send(rows);
				return;	
			} else {
				res.send({failedUsername: req.params[0], failedPassword: req.params[1]});
				return;
			}	
		}
	});
	return;
});

app.put('/users/*/*', function(req,res){
	var postBody = req.body;
	var password = postBody.password;
	var city = postBody.city;
	var state = postBody.state;
	var country = postBody.country;

	if(!password | !city | !state | !country){
		res.send('BLANK');
		return; //return early
	}

	db.get('SELECT * FROM peeps WHERE username=?', req.params[0], function(err,rows){
		if(err){
			res.send("ERROR");
			return;
		} else {
			console.log(rows);
			if(rows == undefined){
				res.send("IncorrectInfo");
				return;
			}
			if(rows.password == req.params[1]){
				db.run('UPDATE peeps SET password = ?, city = ?, state = ?, country = ? WHERE username = ?', [password,city,state,country,req.params[0]], function(err,rows){
					if(err){
						res.send("ERROR");
						return;
					} else {
						res.send("OK");
						return;
					}
				});	
			} else {
				res.send("IncorrectInfo");
				return;
			}	
		}
	});
	return;

});

//user delete request
app.delete('/users/*/*', function(req,res){
	db.get('SELECT * FROM peeps WHERE username=?', req.params[0], function(err,rows){
		if(err){
			res.send("ERROR");
			return;
		} else {
			console.log(rows);
			if(rows == undefined){
				res.send("IncorrectInfo");
				return;
			}
			if(rows.password == req.params[1]){
				db.run('DELETE FROM peeps WHERE username = ?', req.params[0], function(err,rows){
					if(err){
						res.send("ERROR");
						return;
					} else {
						res.send("OK");
						return;
					}
				});	
			} else {
				res.send("IncorrectInfo");
				return;
			}	
		}
	});
	return;
});


// start the server on http://localhost:3000/
var server = app.listen(3000, function () {
  var port = server.address().port;
  console.log('Server started at http://localhost:%s/', port);
});