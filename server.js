/**********************************************************************************************
 * WEB222 - Assignment 2
 * I declare that this assignment is my own work in accordance with Seneca Academic policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 * Name: Bolarinwa Komolafe
 * Student ID: 122948169
 * Date: 11th June, 2017
 * Online (Heroku) URL: https://stormy-cove-57005.herokuapp.com
 * 
 **********************************************************************************************/

var path = require("path");
var express = require("express");
var dataService = require("./data-service.js");
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

// setup a route to return a JSON formatted string containing all the employees within the employees.json file

app.get("/employees", (req, res) =>{

    if(req.query.status){
        
        dataService.getEmployeesByStatus(req.query.status).then((data)=>{
            res.json(data);
            //res.json({message: req.query.status});
        }).catch((errorMessage)=>{
            res.send(errorMessage);
        })
    }else if(req.query.manager){
        //res.json({message: req.query.manager});
        dataService.getEmployeesByManager(req.query.manager).then((data)=>{
            res.json(data);
            //res.json({message: req.query.status});
        }).catch((errorMessage)=>{
            res.send(errorMessage);
        })
    }else if(req.query.department){
        dataService.getEmployeesByDepartment(req.query.department).then((data)=>{
            res.json(data);
            //res.json({message: req.query.status});
        }).catch((errorMessage)=>{
            res.send(errorMessage);
        })
    }else if((req.query).length != 0){
        //res.json({message: req.query.manager});
        dataService.getAllEmployees().then((data)=>{
            res.json(data);
            //res.json({message: req.query.status});
        }).catch((errorMessage)=>{
            res.send(errorMessage);
        })
    }
    else{
        dataService.getMessage().then((dataMessage)=>{
            res.json({message: dataMessage});
        }).catch((errorMessage)=>{
            res.json(errorMessage);
        });
        
    }
    
});

app.get("/employee/:empNum", (req,res) => {
    //res.json({message: req.params.empNum});
    dataService.getEmployeeByNum(req.params.empNum).then((data)=>{
        res.json(data);
        //res.json({message: req.params.empNum});
    }).catch((errorMessage)=>{
        res.send(errorMessage);
    });
});

app.get("/managers", (req, res)=>{
    //res.json({message: 'true'});
    dataService.getManagers().then((data)=>{
        res.json(data);
    }).catch((errorMessage)=>{
        res.send(errorMessage);
    });
});

/*app.get("/employees", (req, res)=>{
    //res.json({message: 'true'});
    dataService.getAllEmployees().then((data)=>{
        res.json(data);
    }).catch((errorMessage)=>{
        res.send(errorMessage);
    });
});*/

app.get("/departments", (req, res)=>{
    //res.json({message: 'departments'});
    dataService.getDepartments().then((data)=>{
        res.json(data);
    }).catch((errorMessage)=>{
        res.send(errorMessage);
    });
});
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});


// setup http server to listen on HTTP_PORT
dataService.initialize().then(()=>{
  app.listen(HTTP_PORT, onHttpStart);  
}).catch((errorMessage)=>{
  res.send(errorMessage);
});