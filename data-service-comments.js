const mongoose = require('mongoose');
let Schema = mongoose.Schema;
var commentSchema = new Schema ({
    "authorName": String,
    "authorEmail": String,
    "subject": String,
    "commentText": String,
    "postedDate": Date,
    "replies": [{
        "comment_id": String,
        "authorName": String,
        "authorEmail": String,
        "commentText": String,
        "repliedDate": Date
    }]
});

let Comment;

module.exports.initialize = ()=>{
    return new Promise((resolve, reject)=>{
        let db = mongoose.createConnection("mongodb://komo:bolaji83@ds161162.mlab.com:61162/web322_a6");
        db.on('error', (err)=>{
            reject(err);
        });
        db.open('open', ()=>{
            Comment = db.model("comments", commentSchema);
            resolve();
        });
    });
};

module.exports.addComment = (data)=>{
    return new Promise((resolve, reject)=>{
        data.postedDate = Date.now();
        let newComment = new Comment(data);
        newComment.save((err)=>{
            if(err){
                reject("There was an error saving the comment " + err);
            }
            else{
                resolve(newComment._id);
            }
        });
    });
};

module.exports.getAllComments = ()=>{
    return new Promise((resolve, reject)=>{
        Comment.find().sort({postedDate: 1}).exec()
        .then((result)=>{
            resolve(result);
        }).catch((err)=>{
            reject(err);
        })
    });
};

module.exports.addReply = (data)=>{
    return new Promise((resolve, reject)=>{
        data.repliedDate = Date.now();
        Comment.update({_id: data.comment_id},
        {$addToSet:{replies: data}}).exec()
        .then(()=>{
            resolve();
        }).catch((err)=>{
            reject(err);
        })
    });
};

