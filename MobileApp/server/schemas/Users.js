const mongoose = require("mongoose")
const User = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    verifyToken:{
        type:String,
        default:""
    }
})
module.exports = mongoose.model('Users',User)