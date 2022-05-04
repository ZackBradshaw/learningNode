var http = require("http");
var url = require("url");
var fs = require("fs");

http
  .createServer(function (req, res) {
    var path = url.parse(req.url).pathname;
    var fsCallback = function (err, data) {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        return res.end("404 Not found");
      }
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    };
    switch (path) {
      case "/about":
        doc = fs.readFile(__dirname + "/about.html", fsCallback);
        break;
      case "/contact-me":
        doc = fs.readFile(__dirname + "/contact-me.html", fsCallback);
        break;
      default:
        doc = fs.readFile(__dirname + "/index.html", fsCallback);
    }
  })
  .listen(8080);
