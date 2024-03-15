const mongoose=require('mongoose')

const CourseShedule= mongoose.Schema({
    CourseName:String,
    FacultyName:String,
    Date:String,
    time:String,   
    linktext:String,
    linkurl:String
    
})

module.exports=mongoose.model('Coursedetails',CourseShedule)