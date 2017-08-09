const bcrypt = require('bcryptjs');
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

            bcrypt.genSalt(10, function(err, salt) { // Generate a "salt" using 10 rounds
    bcrypt.hash(userData.password, salt, function(err, hash) { 
        
        if(err){
            reject("There was an error encrypting the password");
        }
        else{
            userData.password = hash;
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
}); 
        }
    });
};

module.exports.checkUser = (userData)=>{
    return new Promise((resolve, reject)=>{
        User.find({user: userData.user}).exec()
        .then((users)=>{
            bcrypt.compare(userData.password, users[0].password).then((res) => {
                if(res === true){
                    resolve();
                }
                if(res === false){
                    reject("Incorrect Password for user: " + userData.user);
                }
            });
        }).catch((err)=>{
            reject("Incorrect Password for user: " + userData.user);
        })
    });
};


module.exports.updatePassword = (userData)=>{
    return new Promise((resolve, reject)=>{
        if (userData.password != userData.password2){
            reject("Passwords do not match");
        }
        else{

            bcrypt.genSalt(10, function(err, salt) { // Generate a "salt" using 10 rounds
    bcrypt.hash(userData.password, salt, function(err, hash) { 
        
        if(err){
            reject("There was an error encrypting the password");
        }
        if(!err){
            userData.password = hash;
            User.update({ user: userData.user },
            { $set: { password: hash } },
            { multi: false })
            .exec() .then(resolve()) .catch(reject("There was an error updating the password for " + userData.user));
        }
    });
}); 
        }
    });
};