
const bcrypt=require("bcrypt");
const users=require("../models/users");


exports.postlogin= async(req,res)=>{

    //  console.log(req.body.password);
    //  console.log(req.body.email);
     
    try{
     const passwords=req.body.password;
     const emails =req.body.email;
     const user= await users.findOne({email:emails})
     //console.log(user);
     if(user)
    {
      //const storedpass= user.password;
      //console.log(storedpass);
      const result = await bcrypt.compare(passwords,user.password);
      
      console.log(result);
    //console.log(storedpass);
    //const logpass=await bcrypt.compare(passwords,storedpass);
      if(result)
      {
        req.session.isLoggedIn=true;
        req.session.user=user;
        console.log("loggedin");
        res.redirect('/')
      }else{
        console.log("error");
      }
        // res.redirect('/')
     }
    }catch(err)
    {
        console.log(err);
    }
}
// exports.get("/signup",(req,res)=>{
//     res.render("sigup.ejs");
// })
exports.postsignup=async (req,res)=>{
    
      //console.log("hiii");
  try{
    //  req.isLoggedIn=true;
      let password=req.body.Password;
      const hashedPassword= await bcrypt.hash(password,12);
    
    const user= await users.create({
        email: req.body.email,

        username: req.body.Username,

        password: hashedPassword,

    })
     const user1= await users.find({});

       //console.log(user1);
     req.session.isLoggedIn=true;
      req.session.user=user;
      res.redirect('/');
   }catch(err)
   {
       console.log(err);
   }
  
}
exports.getsignup=(req,res)=>{
    res.render("sigup.ejs")
}
exports.getlogin=(req,res)=>{
    res.render("login.ejs");
}

exports.getlogout= async(req,res)=>{
     await req.session.destroy();
     res.redirect("/");
}

// exports.post("/blog",async(req,res)=>{

      
   
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
    

   
    
    
