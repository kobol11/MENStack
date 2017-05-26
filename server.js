/**********************************************************************************************
 * WEB222 - Assignment 2
 * I declare that this assignment is my own work in accordance with Seneca Academic policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 * Name: Bolarinwa Komolafe
 * Student ID: 122948169
 * Date: 17th May, 2017
 * Online (Heroku) URL: 
 * 
 **********************************************************************************************/

var path = require("path");
var express = require("express");
var app = express();
app.use(express.static('public'));
var HTTP_PORT = process.env.PORT || 8000;
 
// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

// setup a 'route' to listen on the default url path (http://localhost)
app.get("/", function(req,res){
   res.sendFile(path.join(__dirname + "/views/home.html"));
   
});

// setup another route to listen on /about
app.get("/about", function(req,res){
   res.sendFile(path.join(__dirname + "/views/about.html"));
});

// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT, onHttpStart);
