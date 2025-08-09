const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    quizRecords : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : "quiz",
        }
    ],  // to recommend later and recently used themes 
    goalSavings : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : "savings",
        }
    ],  
    picture: String,
    contact: Number,
})

module.exports = mongoose.model("user", userSchema);