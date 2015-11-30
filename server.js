//The server for the project
<<<<<<< HEAD
//front end currently localhost/test.html
//used the code from lectures 11 and 12 to implement the REST API
//implementation of sqlite3 learned and taken from here https://github.com/mapbox/node-sqlite3
//source: http://dalelane.co.uk/blog/?p=3152
=======
//source: lectures 11 and 12 to implement the REST API
//source: https://github.com/mapbox/node-sqlite3
//source: http://dalelane.co.uk/blog/?p=3152
//source: http://stackoverflow.com/questions/1748794/is-there-an-arraylist-in-javascript
>>>>>>> origin/master

var express = require('express');
var app = express();
var http = require('http').Server(app);
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database('theDatabase.db');

db.run("CREATE TABLE IF NOT EXISTS peeps (username varchar(20) PRIMARY KEY, password varchar(20), city varchar(20), state varchar(20), country varchar(20), places TEXT, completed TEXT)");
db.run("CREATE TABLE IF NOT EXISTS locate (name varchar(50), type varchar(20), city varchar(20), state varchar(20), country varchar(20), count INTEGER)");


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
<<<<<<< HEAD
				var stmt = db.prepare("INSERT into peeps VALUES (?,?,?,?,?)");
				stmt.run(username,password,city,state,country);
=======
				var thePlaces = [];
				var places = JSON.stringify(thePlaces);
				var theCompletes = [];
				var completed = JSON.stringify(theCompletes)
				var stmt = db.prepare("INSERT into peeps VALUES (?,?,?,?,?,?,?)");
				stmt.run(username,password,city,state,country,places,completed);
>>>>>>> origin/master
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
<<<<<<< HEAD
				res.send("IncorrectInfo");
=======
				res.send({status: 'ERROR');
>>>>>>> origin/master
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

app.post('/places/*/*', function(req,res){
	var postBody = req.body;
	var name = postBody.name;
	var type = postBody.type;
	var city = postBody.city;
	var state = postBody.state;
	var country = postBody.country;

	console.log(name + " " + type + " " + city + " " + state + " " + country);

	if(!name | !type | !city | !state | !country){
		res.send({status:'BLANK'});
		return;
	}

	db.get('SELECT * from locate WHERE name=? AND city=? AND state=? AND country=?', [name,city,state,country], function(err,rows){
		if(err){
			res.send({status: 'ERROR'});
			return;
		} else {
			//create current count to update the popularity of a location
			var currentCount;
			if(rows == undefined){
				//insert into locate table
				var currentCount = 1;
				var stmt = db.prepare("INSERT into locate VALUES (?,?,?,?,?,?)");
				stmt.run(name,type,city,state,country,currentCount);
				stmt.finalize();
			} else {
<<<<<<< HEAD
				currentCount = rows.count +1;
				db.run('UPDATE locate SET count =? WHERE name =? AND city=? AND state=? AND country=?', [currentCount,name,city,state,country], function(err,rows){
					if(err){
						res.send({status: 'ERROR'});
=======
				currentCount = rows.count;
			}

			//increment the current count and update the object with the new count
			currentCount++;
			
			db.run('UPDATE locate SET count =? WHERE name =? AND city=? AND state=? AND country=?', [currentCount,name,city,state,country], function(err,rows){
				if(err){
					res.send({status: 'ERROR'});
>>>>>>> origin/master
						return;
					} 
				});	
			}
			
			
			//insert the reference to the locate in the peeps
			db.get('SELECT * from peeps WHERE username=?', req.params[0],function(err,row){
				if(err){
					res.send({status:'MADE ERROR'});
					return;
				} else {
					if(row == undefined){
						res.send({status: 'ERROR'});
						return;
					}
					
					var thePlaces = JSON.parse(row.places);
					thePlaces.push({"name": name,
									"type": type,
								    "city": city,
									"state": state,
									"country": country});

					var add = JSON.stringify(thePlaces);

					//console.log(add);

					if(row.password == req.params[1]){
						db.run('UPDATE peeps SET places=? WHERE username=?', [add,req.params[0]], function(err,rows){
							if(err){
								res.send({status:'ERROR'});
								return;
							} else {
								db.get('SELECT * FROM peeps WHERE username=?', req.params[0], function(err,rows){
									if(err){
										res.send({status:'MADE ERROR'});
										return;
									} else {
										console.log(rows);
										if(rows == undefined){
											res.send({status: 'MADE ERROR'});
											return;
										}
										if(rows.password == req.params[1]){
											console.log(rows);
											res.send(rows);
											return;	
										} else {
											res.send({status: 'MADE ERROR'});
											return;
										}
									}
								}); 
							}
						});
					} else {
						res.send({status: 'ERROR'});
						return;
					}
				}
			});
		}
	});
	return;
});

app.put('/complete/*/*', function(req,res){
	var postBody = req.body;
	var name = postBody.name;
	var type = postBody.type;
	var city = postBody.city;
	var state = postBody.state;
	var country = postBody.country;

	console.log("Passed parameters: " + name + " " + type + " " + city + " " + state + " " + country);

	db.get('SELECT * from peeps WHERE username=?', req.params[0], function(err,rows){
		if(err){
			console.log('first error');
			res.send({status: "ERROR"});
			return;
		} else {
			console.log(rows);
			if(rows == undefined){
				console.log('rows undefined');
				res.send({status: "IncorrectInfo"});
				return;
			}
			if(rows.password == req.params[1]){
				var theArray = JSON.parse(rows.places);

				console.log(theArray.length);

				var newArray = [];

				for(var i = 0; i < theArray.length; i++){
					console.log("checking: " + theArray[i].name);
					if(theArray[i].name == name & theArray[i].city == city & theArray[i].state == state & theArray[i].country == country){
						console.log("Splicing: " + theArray[i].name);
						theArray.splice(i,1);
					}
				}

				var returnArray = JSON.stringify(theArray);

				console.log("returnArray");
				console.log(returnArray);

				var completed = JSON.parse(rows.completed);

				completed.push({"name": name,
								"type": type,
								"city": city,
								"state": state,
								"country": country});

				var newComplete = JSON.stringify(completed);

				console.log(newComplete);


				db.run('UPDATE peeps SET places=?, completed=? WHERE username=?', [returnArray,newComplete,req.params[0]], function(err,rows){
					if(err){
						console.log('update error');
						res.send({status:'ERROR'});
						return;
					} else {
						db.get('SELECT * FROM peeps WHERE username=?', req.params[0], function(err,rows){
							if(err){
								res.send({status:'ERROR'});
								return;
							} else {
								console.log(rows);
								if(rows == undefined){
									res.send({status: 'ERROR'});
									return;
								}
								if(rows.password == req.params[1]){
									console.log(rows);
									res.send(rows);
									return;	
								} else {
									res.send({status: 'ERROR'});
									return;
								}
							}
						}); 
					}
				});
			} else {
				console.log('incorrect password');
				res.send({status: "IncorrectInfo"});
				return;
			}	
		}
	});
});


app.put('/remove/*/*', function(req,res){
	var postBody = req.body;
	var name = postBody.name;
	var type = postBody.type;
	var city = postBody.city;
	var state = postBody.state;
	var country = postBody.country;

	db.get('SELECT * from peeps WHERE username=?', req.params[0], function(err,rows){
		if(err){
			res.send({status: "ERROR"});
			return;
		} else {
			console.log(rows);
			if(rows == undefined){
				res.send({status: "IncorrectInfo"});
				return;
			}
			if(rows.password == req.params[1]){
				var theArray = JSON.parse(rows.places);

				console.log(theArray.length);

				var newArray = [];

				for(var i = 0; i < theArray.length; i++){
					console.log("checking: " + theArray[i].name);
					if(theArray[i].name == name & theArray[i].city == city & theArray[i].state == state & theArray[i].country == country){
						console.log("Splicing: " + theArray[i].name);
						theArray.splice(i,1);
					}
				}

				var returnArray = JSON.stringify(theArray);

				console.log("returnArray");
				console.log(returnArray);


				db.run('UPDATE peeps SET places=? WHERE username=?', [returnArray,req.params[0]], function(err,rows){
					if(err){
						res.send({status:'ERROR'});
						return;
					} else {
						db.get('SELECT * FROM peeps WHERE username=?', req.params[0], function(err,rows){
							if(err){
								res.send({status:'ERROR'});
								return;
							} else {
								console.log(rows);
								if(rows == undefined){
									res.send({status: 'ERROR'});
									return;
								}
								if(rows.password == req.params[1]){
									console.log(rows);
									res.send(rows);
									return;	
								} else {
									res.send({status: 'ERROR'});
									return;
								}
							}
						}); 
					}
				});
			} else {
				res.send({status: "IncorrectInfo"});
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
