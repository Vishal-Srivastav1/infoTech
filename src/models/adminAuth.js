const Detail=require("../models/Details")
const Slider = require('../models/Slider')
const Service=require('../models/Service')
const CourseShedule=require('../models/CourseShedule')
//const user='admin';

const islogin= async (req,res,next) =>{
    const detail= await Detail.findOne({"_id":"65e486abbafdaee5ded74f37"})
    const slides= await Slider.find()
    // console.log(slider); 
    const courseShedul= await CourseShedule.find()

    const services=await Service.find()
    //console.log(services);
     
    try {
        if(req.body.user="admin"){
            // req.session.user=user;
            // res.render("index",{ 
            //     detail:detail,                              
            //  });
        }else{
            res.render("index",{ 
                detail:detail,
                slides:slides, 
                courseShedul:courseShedul,
                services:services                           
             })
        }
        next();
    } catch (error) {
         console.log(error);
    }

}

const islogout = async (req,res,next) =>{
    const detail= await Detail.findOne({"_id":"65e486abbafdaee5ded74f37"})
    //    console.log(detail);
   const slides= await Slider.find()
    // console.log(slider); 
    const courseShedul= await CourseShedule.find()

    const services=await Service.find()
    //console.log(services);
       try {
            
        if(req.body.user!="admin"){
            
            res.render("index",{ 
                detail:detail,
                slides:slides, 
                courseShedul:courseShedul,
                services:services                           
             })
            //  req.session.destroy();
        }

        next();
        
       } catch (error) {
        console.log(error);
       }
}

module.exports={
    islogin,
    islogout
}