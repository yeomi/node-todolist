var http = require("http");
var url = require("url");
var querystring = require("querystring");
var EventEmitter = require("events").EventEmitter;
var markdown = require("markdown").markdown;

console.log(markdown.toHTML("Un paragraphe en **markdown** !"));
/*
var EventEmitter = require("events").EventEmitter;
var jeu = new EventEmitter();
jeu.on('gameover', function(message) {
	console.log(message);
});
jeu.emit('gameover', 'you lose!');
*/

var server = http.createServer(function(req, res) {
	var page = url.parse(req.url).pathname;
	var params = querystring.parse(url.parse(req.url).query);

  	res.writeHead(200, {"Content-Type": "text/plain"});

  	res.write("Don't you have a name?");
  	
  	res.end();
});

server.on("close", function() {
	console.log("We're closing bye");
});
server.listen(8080);

server.close();
