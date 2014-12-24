var express = require("express");
var session = require("cookie-session");

var app = express();

app.set("trust proxy", 1);

app.use(session({
	name: "gabriel",
	keys: ["key1"],
	signed: false
}));


app.use(function(req, res, next) {
	var n = req.session.views || 0;
	req.session.views = ++n;
	next();
});

app.get("/", function(req, res) {
	res.render("index.ejs", {myVar : req.session.views});
});

app.get("/contact", function(req, res) {
	res.setHeader("Content-Type", "text/plain");
	res.end("Wanna get in touch with us ?");
});

app.get("/post/:id", function(req, res) {
	res.setHeader("Content-Type", "text/plain");
	res.end("This is the post id " + req.params.nbre);
});

app.get("/counter/:nbre", function(req, res) {
	var names = ["Isis", "Myriam", "Gabriel"];
	res.render("counter.ejs", {counter: req.params.nbre, names: names});
});

app.use(function(req, res, next) {
	res.setHeader("Content-Type", "text/plain");
	res.status(404).send("This page does not exist");
});

app.listen(8080);