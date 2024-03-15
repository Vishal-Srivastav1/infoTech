const express = require("express");
const hbs= require("hbs")
require("dotenv").config();
const bodyParser=require('body-parser')
const routes=require('./routes/main')
const app= express()
const mongoose= require("mongoose")
const Detail=require('./models/Details')
const Slider=require('./models/Slider')
const Service=require('./models/Service')
const CourseShedule=require('./models/CourseShedule')

const auth = require("./models/adminAuth")


const session=require('express-session')
const flash=require('connect-flash')
const cookie=require('cookie-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}))

// /static/css/style.css
app.use('/static',express.static("public"))
app.use(flash());
app.use('',routes)

app.use(session({
    secret:mongoose.models.sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie:{ maxAge: 60000}
}));

app.use(session());
app.use(cookie());



//(template engine)
app.set('view engine','hbs')
app.set("views","views")
hbs.registerPartials("views/partials")

//db connection
mongoose.connect(process.env.mongose_url)

let dbConnectionTimeout;
mongoose.connection.on('connecting', () => {
  dbConnectionTimeout = setTimeout(() => {
    console.error('Failed to connect to the database. Timed out.');
    process.exit(1);
  }, 10000);
});

mongoose.connection.on('connected', () => {
  clearTimeout(dbConnectionTimeout);
  console.log('Database connection stablished');
});
// const con=mongoose.connection

// con.on('open', ()=>{
//     console.log("database connection stablished");
// })



// course shedule
//  CourseShedule.create([
//     {
//          CourseName:'Full Stack JAVA',
//         FacultyName:'Mr. Kishan',
//         Date:'18th March',
//         time:'7:30 AM',
//         linktext:'Register Now',
//          linkurl:'#'
//     },  
//     {
//         CourseName:'Full Stack PYTHON',
//        FacultyName:'Mr. Mahesh',
//        Date:'19th March',
//        time:'7:15 AM',
//        linktext:'Register Now',
//        linkurl:'#'
//    }, 
//     {
//    CourseName:'Full Stack DATA SCIENCE & AI',
//    FacultyName:'Mr. Rambabu',
//    Date:'20th March',
//    time:'5:00 PM',
//     linktext:'Register Now',
//     linkurl:'#'
//    }, 
//    {
//     CourseName:'SELENIUM',
//     FacultyName:'Mr. Suresh',
//     Date:'14th March',
//     time:'5:30 PM',
//      linktext:'Register Now',
//      linkurl:'#'
//     },  
    // {
    //     CourseName:'HTML | CSS | JavaScript',
    //     FacultyName:'Mr. Shiva kumar',
    //     Date:'15th March',
    //     time:'7:30 PM',
    //      linktext:'Register Now',
    //      linkurl:'#'
    //     }, 
    //     {
    //         CourseName:'Node Js ',
    //         FacultyName:'Mr. Sanjay',
    //         Date:'16th March',
    //         time:'6:30 PM',
    //          linktext:'Register Now',
    //          linkurl:'#'
    //         }, 
    //         {
    //             CourseName:'DevOps ',
    //             FacultyName:'Mr. Rahman',
    //             Date:'15th March',
    //             time:'7:30 AM',
    //              linktext:'Register Now',
    //              linkurl:'#'
    //             }, 
    //         {
    //             CourseName:'Full Stack Data Science &amp; AI',
    //             FacultyName:'Mr. Parkash',
    //             Date:'18th March',
    //             time:'7:30 AM',
    //              linktext:'Register Now',
    //              linkurl:'#'
    //             }, 
        
 
    // ])


    // services
// Service.create([
//     {
//     icon:"fab fa-accusoft",
//     title:'Provide Best Courses',
//     description:'we provides our course that helps our students in learning',
//     linkText:'http://www.google.com',
//     link:'Check'
// },
// {
//     icon:"fa-brands fa-slack",
//     title:' Best Courses',
//     description:'we provides our course that helps our students in learning',
//     linkText:'http://www.google.com',
//     link:'learn'
// },
// {
//     icon:"fa-brands fa-slack",
//     title:' Best Courses',
//     description:'we provides our course that helps our students in learning',
//     linkText:'http://www.google.com',
//     link:'learn'
// },
// ])

//slider
// Slider.create([{
//     title:"learn java in very easy manner",
//     subTitle:'java is one of the most popular programming language',
//     imageUrl:"/static/images/coursel1.jpg"
// },
// {
//     title:"what is collection in java",
//     subTitle:'collection is framework of java programming language',
//     imageUrl:"/static/images/coursel2.jpg"
// },
// {
//     title:"What is object in java",
//     subTitle:'Object is real world things in java programming language',
//     imageUrl:"/static/images/coursel3.jpg"
// }
// ])

//navbar
// Detail.create({
//     brandName:"infoTech",
//     brandIconUrl:"vsfasf",
//     links:[{
//         label:"Home",
//         url:"/"
//     },
//     {
//      label:"Services",
//      url:"/services"   
//     },
//     {
//         label:"Course",
//         url:"/course"   
//        },
       
//        {
//         label:"Contact Us",
//         url:"/contact-us"   
//        },
//          {
//             label:"Login",
//             url:"/login"   
//            },
// ]
// })



app.listen(process.env.PORT | 5555, () =>{
    console.log("server started");
})
console.log("project started");








