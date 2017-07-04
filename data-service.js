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
};

const Sequelize = require('sequelize');
var sequelize = new Sequelize('d2m0g0qf7q1ub1', 'zzfvcterqeotaq', 'b4e2997ad9b3813519b10f5a347f05990941a7c061b6dfe8640c472f20183d0a',{
    host: 'ec2-184-73-249-56.compute-1.amazonaws.com',
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
        ssl: true
    }
});

// This function reads the content of the "./data/employees.json" file
module.exports.initialize = ()=>{
    return new Promise((resolve, reject)=>{
        reject();
    });
};


// This function will provide full array of employee objects using the resolve method of the returned promise
module.exports.getAllEmployees = ()=>{
    return new Promise((resolve, reject)=>{
        reject();
    });
};

// This function will provide an array of employee objects whose status matches the "status" parameter
// using the resolve method of the returned promise
module.exports.getEmployeesByStatus = (status)=>{
    return new Promise((resolve, reject)=>{
        reject();
    });
};

// This function will provide an array of employee objects whose "department" property matches the department
// parameter using the resolve method of the returned promise
module.exports.getEmployeesByDepartment = (department)=>{
    return new Promise((resolve, reject)=>{
        reject();
    });
};

// This function will provide an array of employee objects whose "employeeManagerNum" matches the 
// "manager" parameter using the resolve method of the returned promise
module.exports.getEmployeesByManager = (manager) =>{
    return new Promise((resolve, reject)=>{
        reject();
    });
};

// This function will provide a single employee object whose "employeeNum" property matches the 
// "num" parameter using the resolve method of the returned promise
module.exports.getEmployeeByNum = (num) =>{
    return new Promise((resolve, reject)=>{
        reject();
    });
};

// This function will provide an array of employee objects whose "isManager" property is true using
// the resolve method of the returned promise
module.exports.getManagers = ()=>{
    return new Promise((resolve, reject)=>{
        reject();
    });
};


// This function will provide the full array of "department" objects using the resolve method of the 
// returned promise
module.exports.getDepartments = ()=>{
    return new Promise((resolve, reject)=>{
        reject();
    });
};

// This function helps in adding new employee to the employee database
module.exports.addEmployee = (employeeData)=>{
return new Promise((resolve, reject)=>{
        reject();
    });
};

// This function helps in updating the employee database
module.exports.updateEmployee = (employeeData)=>{
    return new Promise((resolve, reject)=>{
        reject();
    });
};