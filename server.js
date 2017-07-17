/**********************************************************************************************
 * WEB222 - Assignment 6
 * I declare that this assignment is my own work in accordance with Seneca Academic policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 * Name: Bolarinwa Komolafe
 * Student ID: 122948169
 * Date: 16th July, 2017
 * Online (Heroku) URL: https://stormy-cove-57005.herokuapp.com
 * 
 **********************************************************************************************/
const dataServiceComments = require("./data-service-comments.js");
var path = require("path");
var express = require("express");
var dataService = require("./data-service.js");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
var app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'layout',
    helpers: {
        equal: function(lvalue, rvalue, options){
            if(arguments.length < 3)
            throw new Error ("Handlebars helper equal needs 2 parameters");
            if(lvalue != rvalue){
                return options.inverse(this);
            }else{
                return options.fn(this);
            }
        }
    }}));
app.set('view engine', '.hbs');
var HTTP_PORT = process.env.PORT || 8000;
 
// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

// setup a 'route' to listen on the default url path (http://localhost)
app.get("/", function(req,res){
   res.render("home");
   
});

// setup another route to listen on /about
app.get("/about", function(req,res){
    dataServiceComments.getAllComments().then((result)=>{
        res.render("about", {data: result});
    }).catch(()=>{
        res.render("about");
    })
   
});

// setup a route to return employee list

app.get("/employees", (req, res) =>{

    if(req.query.status){
        
        dataService.getEmployeesByStatus(req.query.status).then((data)=>{
            res.render("employeeList", {data:data, title:"Employees"});
        }).catch((errorMessage)=>{
            res.render("employeeList", {data:{}, title:"Employees"});
        })
    }else if(req.query.manager){
        dataService.getEmployeesByManager(req.query.manager).then((data)=>{
            res.render("employeeList", {data:data, title:"Employees"});
        }).catch((errorMessage)=>{
            res.render("employeeList", {data:{}, title:"Employees"});
        })
    }else if(req.query.department){
        dataService.getEmployeesByDepartment(req.query.department).then((data)=>{
            res.render("employeeList", {data:data, title:"Employees"});
        }).catch((errorMessage)=>{
            res.render("employeeList", {data:{}, title:"Employees"});
        })
    }else if((req.query).length != 0){
        dataService.getAllEmployees().then((data)=>{
            res.render("employeeList", {data:data, title:"Employees"});
        }).catch((errorMessage)=>{
            res.render("employeeList", {data:{}, title:"Employees"});
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

// Setting up a route to get employee based on the employee number
app.get("/employee/:empNum", (req,res) => {

    /*dataService.getEmployeeByNum(req.params.empNum).then((data)=>{
        res.render("employee", {data:data});
    }).catch(()=>{
       res.status(404).send("Employee Not Found");
    });*/

// initialize an empty object to store the values
let viewData = {};
dataService.getEmployeeByNum(req.params.empNum)
.then((data)=>{
    viewData.data = data; // store employee data in the "viewData" object as "data"
}).catch(()=>{
    viewData.data = null; // set employee to null if there was an error
}).then(dataService.getDepartments)
.then((data)=>{
    viewData.departments = data; // store department data in the "viewData" object as "departments"
    // loop through viewData.departments and once we have found the departmentId that matches
    // the employee's "department" value, add a "selected" property to the matching
    // viewData.departments object
    for(let i = 0; i < viewData.departments.length; i++){
        if(viewData.departments[i].departmentId == viewData.data.department){
            viewData.departments[i].selected = true;
        }
    }
}).catch(()=>{
    viewData.departments = []; // set departments to empty if there was an error
}).then(()=>{
    if(viewData.data == null){ // if no employee - return an error
        res.status(404).send("Employee not found");
    }else{
        res.render("employee", {viewData: viewData}); // render the "employee" view
    }
});
});

// Setting up a route to get list of managers
app.get("/managers", (req, res)=>{
    dataService.getManagers().then((data)=>{
        res.render("employeeList", {data: data, title:"Employees (Managers)"});
    }).catch((errorMessage)=>{
        res.render("employeeList", {data: {}, title:"Employees (Managers)"});
    });
});

// Setting up a route for getting the department list
app.get("/departments", (req, res)=>{
    dataService.getDepartments().then((data)=>{
        res.render("departmentList", {data: data, title: "Departments"});
    }).catch((errorMessage)=>{
        res.render("departmentList", {data: {}, title: "Departments"});
    });
});

// Setting up a route to add new employee
app.get("/employees/add", (req, res)=>{
    dataService.getDepartments().then((data)=>{res.render("addEmployee", {departments: data});}).catch(()=>{
        res.render("addEmployee", {departments: {}});
    });

});

// Setting up a route to show all employees after a new employee is added 
app.post("/employees/add", (req, res)=>{
    console.log(req.body);
    dataService.addEmployee(req.body).then(()=>{
    res.redirect("/employees");
    });
});

// Setting up a route to show all employees after the employee list is updated
app.post("/employee/update", (req, res)=>{
    console.log(req.body);
    dataService.updateEmployee(req.body).then(()=>{
    res.redirect("/employees");
    });
});

app.get("/departments/add", (req, res)=>{
    res.render("addDepartment");

});

app.post("/departments/add", (req, res)=>{
    console.log(req.body);
    dataService.addDepartment(req.body).then(()=>{
    res.redirect("/departments");
    });
});

app.post("/department/update", (req, res)=>{
    console.log(req.body);
    dataService.updateDepartment(req.body).then(()=>{
    res.redirect("/departments");
    });
});

app.get("/department/:departmentId", (req,res) => {
    dataService.getDepartmentById(req.params.departmentId).then((data)=>{
        res.render("department", {data:data});
    }).catch(()=>{
       res.status(404).send("Department Not Found");
    });
});

app.get("/employee/delete/:empNum", (req, res)=>{
    dataService.deleteEmployeeByNum(req.params.empNum).then(()=>{
        res.redirect("/employees");
    }).catch(()=>{
    res.status(500).send("Unable to Remove Employee/ Employee Not Found");
    })
});

app.post("/about/addComment", (req, res)=>{
    dataServiceComments.addComment(req.body).then(()=>{
    res.redirect("/about");
    }).catch((err)=>{
        console.log(err);
        res.redirect("/about");
    });
});

app.post("/about/addReply", (req, res)=>{
    dataServiceComments.addReply(req.body).then(()=>{
    res.redirect("/about");
    }).catch((err)=>{
        console.log(err);
        res.redirect("/about");
    });
});

// Setting up a route to capture every other request
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});



// setup http server to listen on HTTP_PORT
dataService.initialize().then(dataServiceComments.initialize).then(()=>{
  app.listen(HTTP_PORT, onHttpStart);  
}).catch((errorMessage)=>{
  res.send(errorMessage);
});

/*dataServiceComments.initialize()
.then(()=>{
    dataServiceComments.addComment({
        authorName: "Comment 1 Author",
        authorEmail: "comment1@mail.com",
        subject: "Comment 1",
        commentText: "Comment Text 1"
    
    }).then((id)=>{
        dataServiceComments.addReply({
            comment_id: id,
            authorName: "Reply 1 Author",
            authorEmail: "reply1@mail.com",
            commentText: "Reply Text 1"
        
    }).then(dataServiceComments.getAllComments)
        .then((data)=>{
            console.log("comment: " + data[data.length - 1]);
            process.exit();
        });
    });    
}).catch((err)=>{
    console.log("Error: " + err);
    process.exit();
});*/
