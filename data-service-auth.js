const mongoose = require('mongoose');
let Schema = mongoose.Schema;
var userSchema = new Schema({
    "user": {
        type: String,
        unique: true
    },
    "password": String
});

let User;

module.exports.initialize = ()=>{
    return new Promise((resolve, reject)=>{
        let db = mongoose.createConnection("mongodb://komo:bolaji83@ds127993.mlab.com:27993/web322_assignment_7");
        db.on('error', (err)=>{
            reject(err);
        });
        db.open('open', ()=>{
            User = db.model("users", userSchema);
            resolve();
        });
    });
};

module.exports.registerUser = (userData)=>{
    return new Promise((resolve, reject)=>{
        if (userData.password != userData.password2){
            reject("Passwords do not match");
        }
        else{
            let newUser = new User(userData);
            newUser.save((err)=>{
            if(err){
                if (err.code === 11000){
                      reject("User Name already taken");
                }
                else{
                      reject("There was an error creating the user: " + err);
                }
              
            }
            else{
                resolve();
            }
        });
        }
    });
};

module.exports.checkUser = (userData)=>{
    return new Promise((resolve, reject)=>{
        User.find({user: userData.user}).exec()
        .then((users)=>{
            if (users.length == 0){
                reject("Unable to find user: " + userData.user);
            }
            if (users[0].password != userData.password){
                reject("Incorrect Password for user: " + userData.user);
            }
            if (users[0].password == userData.password){
                resolve();
            }
        }).catch((err)=>{
            reject("Unable to find user: " + userData.user);
        })
    });
};