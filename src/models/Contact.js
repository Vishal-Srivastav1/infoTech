const mongoose=require('mongoose')

const Contact=mongoose.Schema({
    Name:String,
    Email:String,
    Message:String
})

module.exports=mongoose.model('UserDB',Contact)