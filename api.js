const express = require('express');
const app = express();
const path = require("path");
// const csurf = require('csurf');
const bodyparser = require('body-parser')
const bcrypt = require('bcrypt');
 const session = require('express-session');
 const MongoDBStore = require("connect-mongodb-session")(session);
const mongoose=require("mongoose");
const { title } = require('process');
const posts = require('./models/posts');
const users= require('./models/users');
const { collection } = require('./models/posts');
const req = require("express/lib/request");
// const csrf = require("csurf");
// app.use(express.json());
 app.set("view engine", "ejs");
 app.use(express.static(path.join(__dirname, "public")));
app.use(bodyparser.urlencoded({extended:false}))


//riquire routes
// const req = require("express/lib/request");
const auth=require("./routes/auth");
const post=require("./routes/post");
const create=require("./routes/create")
const search=require("./routes/search");
const profile=require("./routes/profile");

const store= new MongoDBStore({
    uri:"mongodb://localhost:27017",
    collection:'session'
})

// let csrfProtection = csrf()
app.use(session({secret: "my secret", resave: false, saveUninitialized: false, store: store}));
// app.use(csrfProtection);




  
mongoose.connect("mongodb://localhost:27017",()=>{
    console.log("mongodb connected");
});


 app.use((req, res, next) => {
      res.locals.isLoggedIn = req.session.isLoggedIn;
    //   res.locals.csrfToken = csrfProtection();
      next();

 })


//use router
app.use(auth);
app.use(post);
app.use(create);
app.use(search);
app.use(profile);




app.get("/",(req,res)=>{
    res.render("home.ejs");
})
// app.get("/create",(req,res)=>{
//     res.render('form.ejs');

// app.get("/login",(req,res)=>{

//     res.render("login.ejs");

// })


// app.post("/login", async(req,res)=>{

//     //  console.log(req.body.password);
//     //  console.log(req.body.email);
     
//     try{
//      const passwords=req.body.password;
//      const emails =req.body.email;
//      const user= await users.findOne({email:emails})
//      //console.log(user);
//      if(user)
//    {
//       //const storedpass= user.password;
//       //console.log(storedpass);
//       const result = await bcrypt.compare(passwords,user.password);
      
//       console.log(result);
//     //console.log(storedpass);
//     //const logpass=await bcrypt.compare(passwords,storedpass);
//       if(result)
//       {
//         req.session.isLoggedIn=true;
//         req.session.user=user;
//         console.log("loggedin");
//       }else{
//         console.log("error");
//       }
//     res.redirect('/')
// }
//     }catch(err)
//     {
//         console.log(err);
//     }
// })
// app.get("/signup",(req,res)=>{
//     res.render("sigup.ejs");
// })
// app.post("/signup",async (req,res)=>{
    
//     try{
//      req.isLoggedIn=true;
//      let password=req.body.Password;
//      const hashedPassword= await bcrypt.hash(password,12)
    
//     const user= await users.create({
//         email:req.body.email,

//         username: req.body.Username,

//         password: hashedPassword,

//     })
//     // const user1= await users.find({});

//     //   console.log(user1);
//     req.session.isLoggedIn=true;
//      req.session.user=user;
//       res.redirect('/');
//    }catch(err)
//    {
//        console.log(err);
//    }
  
// })

// app.post("/blog",async(req,res)=>{

      
   
//    try{
//        const post= await posts.create({

//            title: req.body.title,
//            content: req.body.content,

//        })
      
//        const post1= await posts.find({})
//        console.log(post1);
//        res.redirect("/");
//        res.render("blog.ejs",{posts:post1})
//     }
//      catch(err){
//         console.log(err);
//      }
    

   
    
    
// })

// app.get("/notice",(req,res)=>{
//     res.send("<h1>notice</h1>");
// })











app.listen(3000, () => {
    console.log("listening on port 3000")
});