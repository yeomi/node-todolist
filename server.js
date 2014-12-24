var express = require("express");
var session = require("cookie-session");
var bodyParser = require("body-parser");
var app = express();


app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(session({
	name: "todolist",
	keys: ["key1", "key2"],
	signed: false
}));

app.use(function(req, res, next) {
	req.session.todolist = req.session.todolist || ["Buy milk", "Finish my node.js lesson", "Go to gym"];
	next();
});

app.get("/", function(req, res) {

	var templateVars = {
		todolist : req.session.todolist
	};
	res.render("index.ejs", templateVars);
});

app.post("/add", function(req, res) {
	if(req.body.task != undefined && req.body.task != "") {
		req.session.todolist.push(req.body.task);
	}
	res.redirect('/');
});

app.get("/delete/:id", function(req, res) {
	if(req.params.id != "") {
		req.session.todolist.splice(req.params.id, 1);
	}
	res.redirect('/');
});

app.listen(8080);