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
var Employee = sequelize.define('Employee',{
    employeeNum: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true

    },
    firstName: Sequelize.STRING,
    last_name: Sequelize.STRING,
    email: Sequelize.STRING,
    SSN: Sequelize.STRING,
    addressStreet: Sequelize.STRING,
    addresCity: Sequelize.STRING,
    addressState: Sequelize.STRING,
    addressPostal: Sequelize.STRING,
    maritalStatus: Sequelize.STRING,
    isManager: Sequelize.BOOLEAN,
    employeeManagerNum: Sequelize.INTEGER,
    status: Sequelize.STRING,
    department: Sequelize.INTEGER,
    hireDate: Sequelize.STRING
},{
    createdAt: false,
    updatedAt: false
});
var Department = sequelize.define('Department', {
    departmentId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    departmentName: Sequelize.STRING
},{
    createdAt: false,
    updatedAt: false
});
// This function reads the content of the "./data/employees.json" file
module.exports.initialize = ()=>{
    return new Promise((resolve, reject)=>{
        sequelize.sync().then(resolve()).catch(reject("unable to sync the database"));
        
    });
};


// This function will provide full array of employee objects using the resolve method of the returned promise
module.exports.getAllEmployees = ()=>{
    return new Promise((resolve, reject)=>{
        sequelize.sync().then(function() {
            Employee.findAll().then(resolve(data)).catch(reject('no results returned'));
        });       
    });
};

// This function will provide an array of employee objects whose status matches the "status" parameter
// using the resolve method of the returned promise
module.exports.getEmployeesByStatus = (status)=>{
    return new Promise((resolve, reject)=>{
       sequelize.sync().then(function() {
            Employee.findAll({
                where: {
                    status: status
                }
            }).then(resolve(data)).catch(reject('no results returned'));
        });
    });
};

// This function will provide an array of employee objects whose "department" property matches the department
// parameter using the resolve method of the returned promise
module.exports.getEmployeesByDepartment = (department)=>{
    return new Promise((resolve, reject)=>{
        sequelize.sync().then(function() {
            Employee.findAll({
                where: {
                    department: department
                }
            }).then(resolve(data)).catch(reject('no results returned'));
        });
    });
};

// This function will provide an array of employee objects whose "employeeManagerNum" matches the 
// "manager" parameter using the resolve method of the returned promise
module.exports.getEmployeesByManager = (manager) =>{
    return new Promise((resolve, reject)=>{
        sequelize.sync().then(function() {
            Employee.findAll({
                where: {
                    employeeManagerNum: manager
                }
            }).then(resolve(data)).catch(reject('no results returned'));
        });
    });
};

// This function will provide a single employee object whose "employeeNum" property matches the 
// "num" parameter using the resolve method of the returned promise
module.exports.getEmployeeByNum = (num) =>{
    return new Promise((resolve, reject)=>{
        sequelize.sync().then(function() {
            Employee.findAll({
                where: {
                    employeeNum: num
                }
            }).then(resolve(data)).catch(reject('no results returned'));
        });
    });
};

// This function will provide an array of employee objects whose "isManager" property is true using
// the resolve method of the returned promise
module.exports.getManagers = ()=>{
    return new Promise((resolve, reject)=>{
        sequelize.sync().then(function() {
            Employee.findAll({
                where: {
                    isManager: true
                }
            }).then(resolve(data)).catch(reject('no results returned'));
        });
    });
};


// This function will provide the full array of "department" objects using the resolve method of the 
// returned promise
module.exports.getDepartments = ()=>{
    return new Promise((resolve, reject)=>{
       sequelize.sync().then(function() {
            Department.findAll().then(resolve(data)).catch(reject('no results returned'));
        });
    });
};

// This function helps in adding new employee to the employee database
module.exports.addEmployee = (employeeData)=>{
return new Promise((resolve, reject)=>{
    employeeData.isManager = (employeeData.isManager)? true : false;
    for (var prop in employeeData) {
        if (employeeData[prop] === ''){
            employeeData[prop] = null;
        }
    }
        sequelize.sync().then(function() {
            Employee.create({
                employeeNum: employeeData.employeeNum,
                firstName: employeeData.firstName,
                last_name: employeeData.last_name,
                email: employeeData.email,
                SSN: employeeData.SSN,
                addressStreet: employeeData.addressStreet,
                addresCity: employeeData.addresCity,
                addressState: employeeData.addressState,
                addressPostal: employeeData.addressPostal,
                maritalStatus: employeeData.maritalStatus,
                isManager: employeeData.isManager,
                employeeManagerNum: employeeData.employeeManagerNum,
                status: employeeData.status,
                department: employeeData.department,
                hireDate: employeeData.hireDate
            }).then(resolve()).catch(reject('unable to create employee'));
        });
    });
};

// This function helps in updating the employee database
module.exports.updateEmployee = (employeeData)=>{
    return new Promise((resolve, reject)=>{
        employeeData.isManager = (employeeData.isManager)? true : false;
        for (var prop in employeeData) {
        if (employeeData[prop] === ''){
            employeeData[prop] = null;
        }
    }
        sequelize.sync().then(function() {
            Employee.update({
                employeeNum: employeeData.employeeNum,
                firstName: employeeData.firstName,
                last_name: employeeData.last_name,
                email: employeeData.email,
                SSN: employeeData.SSN,
                addressStreet: employeeData.addressStreet,
                addresCity: employeeData.addresCity,
                addressState: employeeData.addressState,
                addressPostal: employeeData.addressPostal,
                maritalStatus: employeeData.maritalStatus,
                isManager: employeeData.isManager,
                employeeManagerNum: employeeData.employeeManagerNum,
                status: employeeData.status,
                department: employeeData.department,
                hireDate: employeeData.hireDate
            }, {
                where: {employeeNum: employeeData.employeeNum}
            }).then(resolve()).catch(reject('unable to update employee'));
        });
    });
};

module.exports.addDepartment = (departmentData)=>{
return new Promise((resolve, reject)=>{
    for (var prop in departmentData) {
        if (departmentData[prop] === ''){
            departmentData[prop] = null;
        }
    }
        sequelize.sync().then(function() {
            Department.create({
                departmentId: departmentData.departmentId,
                departmentName: departmentData.departmentName
            }).then(resolve()).catch(reject('unable to create department'));
        });
    });
};

module.exports.updateDepartment = (departmentData)=>{
    return new Promise((resolve, reject)=>{
        for (var prop in departmentData) {
        if (departmentData[prop] === ''){
            departmentData[prop] = null;
        }
    }
        sequelize.sync().then(function() {
            Department.update({
                departmentId: departmentData.departmentId,
                departmentName: departmentData.departmentName
            }, {
                where: {departmentId: departmentData.departmentId}
            }).then(resolve()).catch(reject('unable to update department'));
        });
    });
};

module.exports.getDepartmentById = (id) =>{
    return new Promise((resolve, reject)=>{
        sequelize.sync().then(function() {
            Department.findAll({
                where: {
                    departmentId: id
                }
            }).then(resolve(data[0])).catch(reject('no results returned'));
        });
    });
};