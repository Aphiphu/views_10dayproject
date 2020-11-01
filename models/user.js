const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Properties for each account
const userSchema = new Schema({
    username:{
        type:String,
        unique:true
    },
    password:String,
    nationalID:String,
    voted:{
        type:Boolean,
        default:false
    }
})

const UserModel = mongoose.model('User',userSchema)
module.exports = UserModel