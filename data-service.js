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
            reject("Oh No! Sorry your request cannot be completed");
        }
    });
}



// This function reads the content of the "./data/employees.json" file
module.exports.initialize = ()=>{
    return new Promise((resolve, reject)=>{
        fs.readFile('./data/employees.json', (err, data)=>{
            if (err){
                reject("unable to read file");
            }
            else 
            employees = JSON.parse(data);
            empCount = employees.length;
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


// This function will provide full array of employee objects using the resolve method of the returned promise
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

// This function will provide an array of employee objects whose status matches the "status" parameter
// using the resolve method of the returned promise
module.exports.getEmployeesByStatus = (status)=>{
    return new Promise((resolve, reject)=>{
        var result = [];
    
            for (var i = 0; i < employees.length; i++){
                if(employees[i].status == status){
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

// This function will provide an array of employee objects whose "department" property matches the department
// parameter using the resolve method of the returned promise
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

// This function will provide an array of employee objects whose "employeeManagerNum" matches the 
// "manager" parameter using the resolve method of the returned promise
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

// This function will provide a single employee object whose "employeeNum" property matches the 
// "num" parameter using the resolve method of the returned promise
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

// This function will provide an array of employee objects whose "isManager" property is true using
// the resolve method of the returned promise
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


// This function will provide the full array of "department" objects using the resolve method of the 
// returned promise
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

// This function helps in adding new employee to the employee database
module.exports.addEmployee = (employeeData)=>{
return new Promise((resolve, reject)=>{
    empCount++;
    employeeData.employeeNum = empCount;
    employees.push(employeeData);
    resolve();
});
};

// This function helps in updating the employee database
module.exports.updateEmployee = (employeeData)=>{
    return new Promise((resolve, reject)=>{
        for (var i = 0; i < employees.length; i++){
            if (employees[i].employeeNum == employeeData.employeeNum){
                employees[i] = employeeData;
            }
        }
        resolve();
    });
};