const express= require('express')
const {route } = require('express/lib/application')
const Detail=require("../models/Details")
const Slider = require('../models/Slider')
const Service=require('../models/Service')
const Contact=require('../models/Contact')
const Coursedetails=require('../models/CourseShedule')



const { json } = require('body-parser')
// const flash=require('connect-flash')
// const session=require('express-session')
const { islogout, islogin } = require('../models/adminAuth')




const routes=express.Router()

routes.get("/", islogout,  async (req,res,next) =>{
  //  const detail= await Detail.findOne({"_id":"65e486abbafdaee5ded74f37"})
  //   //    console.log(detail);
  //  const slides= await Slider.find()
  //   // console.log(slider); 
  //   const courseShedul= await Coursedetails.find()
  //   // console.log(courseShedules);
  //   const services=await Service.find()
  //   //console.log(services);
  
    //  res.render("index",{ 
    //     detail:detail,
    //     slides:slides,
    //     courseShedul:courseShedul,
    //     services:services
   
    //  });
    
 
});


// //login 

routes.get("/login", async (req,res) =>{
    // its give all data 

    // res.set(user="admin");
    const detail= await Detail.findOne({"_id":"65e486abbafdaee5ded74f37"})
    //    req.session.Name = req.body.Name;
    // req.session.user=user;
    // its redirect render file
       res.render("partials/login",{
        // its sets the data on currents file
        detail:detail
       
       });
});



// //   admin logout
routes.get("/logout",islogout, async(req,res) =>{
        //  req.session.destroy();
    // const detail= await Detail.findOne({"_id":"65e486abbafdaee5ded74f37"})
       

    //      res.render("partials/login", {
    //         detail:detail,
            
    //         message:'Logout successfully..'
           
    //     });
})



routes.post("/Home/contact-us", async(req,res) =>{
      // console.log(req.body);
    //save the data to db
    try {
        const data= await Contact.create(req.body)
        const detail= await Detail.findOne({"_id":"65e486abbafdaee5ded74f37"})
          //    console.log(detail);
        const slides= await Slider.find()
            // console.log(slider);
        const courseShedul= await Coursedetails.find()
            // console.log(courseShedules);
         const services=await Service.find()
        //console.log(services);
           res.render("index",{ 
             detail:detail,
             slides:slides,
             courseShedul:courseShedul,
             services:services,
              msg:'Save successfully Refress the Home page.. !'
          });
 
    } catch (error) {
         console.log("error home");
    }
})



routes.post("/admincontroll",  async (req,res) =>{
       try {
        
        let user;
        const Name ='admin';
        const Email= 'admin123@gmail.com';
        //res.set(user="admin");
         if(req.body.Name==Name && req.body.Email==Email && req.body.Name!='' && req.body.Email!='' ){
          res.set(user="admin")
          // req.session.user=user;
            const detail= await Detail.findOne({"_id":"65e486abbafdaee5ded74f37"})
              //    console.log(detail);
                    const slides= await Slider.find()
                    // console.log(slider); 
                    const courseShedul= await Coursedetails.find()
                    // console.log(courseShedules);
                    const services=await Service.find()
                 // req.session.Name = req.body.Name;
                        // its redirect render file         
               res.render("partials/Adminpanel",{        
                detail:detail,
                slides:slides, 
                courseShedul:courseShedul,
                services:services,
                  user
               });
                
         }else{
            const detail= await Detail.findOne({"_id":"65e486abbafdaee5ded74f37"})
               res.render("partials/login", {
                detail:detail,
                message:'Envalid User/Email'
               
            });
         } 
       } catch (error) {
          console.log("error admin");
       }
     })
 



// //  href link getByID course /Home/admin/services-update
routes.get("/courses/course-update" ,islogin, async (req,res) =>{
    const detail= await Detail.findOne({"_id":"65e486abbafdaee5ded74f37"})
    res.set(user="admin")
    
    try {
         const id= req.query.id;
         const userdata=await Coursedetails.findById({ _id:id});
 
         if(userdata){
             res.render("partials/editcourses",{
                 detail:detail,
                 userdata:userdata
             })
          }
        
         }
     catch (error) {
                console.log("error");
    }

     //  res.render("partials/editcourses",{
     //     // detail:detail
     //  })
               
 });
 
 
//  //  href link getByID services /Home/admin/services-update
 routes.get("/Home/admin/services-update",islogin ,async (req,res) =>{
     const detail= await Detail.findOne({"_id":"65e486abbafdaee5ded74f37"})
     res.set(user="admin")
     try {
          const id= req.query.id;
          const userdata=await Service.findById({ _id:id});
  
          if(userdata){
              res.render("partials/editservice",{
                  detail:detail,
                  userdata:userdata
              })
           }
         
          }
      catch (error) {
            console.log("error");
     }
      
                
  });

//  //  href link getByID Slider /admin/slider/update
 routes.get("/admin/slider/update", islogin,async (req,res) =>{
     const detail= await Detail.findOne({"_id":"65e486abbafdaee5ded74f37"})
     res.set(user="admin")
     try {
          const id= req.query.id;
          const userdata=await Slider.findById({ _id:id});
  
          if(userdata){
              res.render("partials/editslider",{
                  detail:detail,
                  userdata:userdata
              })
           }
         
          }
      catch (error) {
            console.log("error");
     }
      
                
  });
  
// // // update select courese Courses  "/admin/service-update"
routes.post("/course-update",islogin, async (req,res) =>{
  res.set(user="admin")
     const _id=req.body._id
     res.set(user="admin")
     const detail= await Detail.findOne({"_id":"65e486abbafdaee5ded74f37"})
       //    console.log(detail);
       const slides= await Slider.find()
             // console.log(slider); 
      const courseShedul= await Coursedetails.find()
             // console.log(courseShedules);
      const services=await Service.find()
   
    try{
        const updtcourse= await Coursedetails.findByIdAndUpdate(
            {_id},
           {            
              "CourseName":req.body.CourseName,
             "FacultyName":req.body.FacultyName,
              "Date":req.body.Date,
              "time":req.body.time,
              "linktext":req.body.linktext,
              "linkurl":req.body.linkurl
            }
        
   )
   res.render("partials/Adminpanel",{        
    detail:detail,
    slides:slides, 
    courseShedul:courseShedul,
    services:services,
   
      user
   })   
} catch(error){
    console.log("error");

   }
});


// / // update select service  
routes.post("/admin/service-update",islogin, async (req,res) =>{
  res.set(user="admin")
     const _id=req.body._id
     res.set(user="admin")
     const detail= await Detail.findOne({"_id":"65e486abbafdaee5ded74f37"})
       //    console.log(detail);
       const slides= await Slider.find()
             // console.log(slider); 
      const courseShedul= await Coursedetails.find()
             // console.log(courseShedules);
      const services=await Service.find()
   
    try{
        const updtservice= await Service.findByIdAndUpdate(
            {_id},
           {            
              "icon":req.body.icon,
             "title":req.body.title,
              "description":req.body.description,
              "linkText":req.body.linkText,
              "link":req.body.link
            }   
   )
   res.render("partials/Adminpanel",{        
    detail:detail,
    slides:slides, 
    courseShedul:courseShedul,
    services:services,
     
      user
   })   
} catch(error){
    console.log("error");

   }
})
// / // update select Slider img 
routes.post("/Home/admin/slider/update",islogin, async (req,res) =>{
  res.set(user="admin")
  
     const _id=req.body._id
     var imageUrl;
     if (req.file) {
      res.set(user="admin")
      const detail= await Detail.findOne({"_id":"65e486abbafdaee5ded74f37"})
        //    console.log(detail);
        const slides= await Slider.find()
              // console.log(slider); 
       const courseShedul= await Coursedetails.find()
              // console.log(courseShedules);
       const services=await Service.find()
    
     try{
         const updtslider= await Slider.findByIdAndUpdate(
             {_id},
            {            
               
              "title":req.body.title,
               "subTitle":req.body.subTitle,
               "imageUrl":req.file.imageUrl
               
             }   
    )
    res.render("partials/Adminpanel",{        
     detail:detail,
     slides:slides, 
     courseShedul:courseShedul,
     services:services,
      
       user
    })   
 } catch(error){
     console.log("error img");
 
    }
     } else {
      res.set(user="admin")
      const detail= await Detail.findOne({"_id":"65e486abbafdaee5ded74f37"})
        //    console.log(detail);
        const slides= await Slider.find()
              // console.log(slider); 
       const courseShedul= await Coursedetails.find()
              // console.log(courseShedules);
       const services=await Service.find()
    
     try{
         const updtslider= await Slider.findByIdAndUpdate(
             {_id},
            {            
               
              "title":req.body.title,
               "subTitle":req.body.subTitle,
            
             }   
    )
    res.render("partials/Adminpanel",{        
     detail:detail,
     slides:slides, 
     courseShedul:courseShedul,
     services:services,
     user
    })   
 } catch(error){
     console.log("error notimg");
 
    }
     }
    
})








// //   / /for any requeat
routes.get("/*", islogout,  async (req,res) =>{
    const detail= await Detail.findOne({"_id":"65e486abbafdaee5ded74f37"})
     //    console.log(detail);
    const slides= await Slider.find()
     // console.log(slider); 
    const courseShedul= await Coursedetails.find()
     // console.log(courseShedules);
     const services=await Service.find()
     //console.log(services);
    res.render("index",{ 
         detail:detail,
         slides:slides,
         courseShedul:courseShedul,
         services:services
         
         
      });
  
 });




module.exports=routes;
