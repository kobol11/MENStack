var message = "";

module.exports.setMessage = (msg) => {
    return new Promise((resolve,reject)=>{
        message = msg;
        resolve();
    });
   
};

module.exports.getMessage = () => {
    return new Promise((resolve,reject)=>{
        if(message.length > 0){
            resolve(message)
        }else{
            reject("Oh No!");
        }
    });
}

var employees = [];
var departments = [];
var fs = require("fs");
module.exports.initialize = ()=>{
    return new Promise((resolve, reject)=>{
        fs.readFile('./data/employees.json', (err, data)=>{
            if (err){
                reject("unable to read file");
            }
            else 
            employees = JSON.parse(data);
            resolve(fs.readFile('./data/departments.json', (err, data)=>{
            if (err){
                reject("unable to read file");
            }
            else 
            departments = JSON.parse(data);
            resolve();
        }));
        });

        
            
    });
};

module.exports.getAllEmployees = ()=>{
    return new Promise((resolve, reject)=>{
        if(employees.length > 0){
            resolve(employees);
        }
        else{
            reject("no results returned");
        }
    });
};

module.exports.getEmployeesByStatus = (status)=>{
    return new Promise((resolve, reject)=>{
        var store = [];
    
            for (var i = 0; i < employees.length; i++){
                if(employees[i].status === status){
                    store.push(employees[i]);
                }
            }
        if(result.length > 0)
        resolve(result);
    
    else{
        reject("no results returned");
    }

            });
};

module.exports.getEmployeesByDepartment = (department)=>{
    return new Promise((resolve, reject)=>{
        var result = [];
    
        for (var i = 0; i < employees.length; i++){
            if (employees[i].department == department){
                result.push(employees[i]);
            }
        }
        if(result.length > 0)
        resolve(result);
    
    else{
        reject("no results returned");
    }
    });
};

module.exports.getEmployeesByManager = (manager) =>{
    return new Promise((resolve, reject)=>{
         var result = [];
        
             for (var i = 0; i < employees.length; i++){
                 if(employees[i].employeeManagerNum == manager){
                     result.push(employees[i]);
                 }
             }
             if (result.length > 0)
             resolve(result);
        
         else{
               reject("no results returned");
         }
    });
};

module.exports.getEmployeeByNum = (num) =>{
    return new Promise((resolve, reject)=>{
        var result = [];
        
             for (var i = 0; i < employees.length; i++){
                 if(parseInt(employees[i].employeeNum) == parseInt(num)){
                     result.push(employees[i]);
                 }
             }
             if (result.length > 0)
             resolve(result);
         
         else{
               reject("no results returned");
         }
    });
};

module.exports.getManagers = ()=>{
    return new Promise((resolve, reject)=>{
        var result = [];
        for (var i = 0; i < employees.length; i++){
            if(employees[i].isManager){
                result.push(employees[i]);
            }
        }
        if (result.length > 0)
             resolve(result);
         
         else{
               reject("no results returned");
         }
    });
};

module.exports.getDepartments = ()=>{
    return new Promise((resolve, reject)=>{
        var result = [];
    for (var i = 0; i < departments.length; i++){
        result.push(departments[i]);
    }
        if (result.length > 0)
             resolve(result);
         
         else{
               reject("no results returned");
         }
    });
};