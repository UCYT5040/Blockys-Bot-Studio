var express = require("express"), 
    app = express(), 
    bodyParser = require('body-parser'), 
    port = process.env["PORT"] || 8080; 
var path = require("path") 
app.use(express.static(path.join(__dirname, 'static'))); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }));
const Database = require("@replit/database")
const db = new Database()
fs = require('fs')

 
app.get("/", function(req, res) { 
    res.sendFile(path.join(__dirname, 'views/index.html'));
}); 

app.get("/tutorials", function(req, res) { 
  if (req.query.tutorial == undefined) {
    res.sendFile(path.join(__dirname, 'views/tutorials.html')); 
  }
  else {
    fs.readFile(path.join(__dirname, 'views/tutorials/' + req.query.tutorial + '.txt'), 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    } 
    res.send("<!doctype HTML>\n<html>\n<head>\n<script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js\"></script>\n<link href=\"/style.css\" rel=\"stylesheet\">\n</head>\n<body>\n<img src=\"https://docs.google.com/drawings/d/e/2PACX-1vQIYDbAw897pheP3RpHiOB2opv_gPKzh7EQOfX8GuPtT-tufCg9FwR4GYCQ5ZKSRG2FX2BuxK0OWVtq/pub?w=630&amp;h=210\">\n<div class=\"linklist\">\n<p><a href=\"javascript:void\" onclick=\"$(&quot;#linklist&quot;).toggle();\">Show/Hide Link List</a></p>\n<ul id=\"linklist\">\n<li><a href=\"/\">Home</a></li>\n<li><a href=\"/account\">Account</a></li>\n<li><a href=\"/tutorials\">Tutorials</a></li></ul></div><p>"+ data + "</p></body></html>")
    });
  }
});
 
app.listen(port)