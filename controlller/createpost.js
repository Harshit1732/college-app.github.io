const post=require("../models/posts")
const users=require("../models/users")

exports.getpostblogs= async(req,res)=>{
    let hashTags = req.body.content.split(" ").filter(st => st.startsWith("#"));

    try{
        
        const posts=  await post.create({
            title:   req.body.title,
            content: req.body.content,
            type: "Blog",
            author: req.session.user.username,
            date: new Date(),
            upvote: 0,
            hashTags: hashTags,
            upvoteLists : []
            
        })
         
        const posts1= await post.find({});

        console.log(posts1);


        res.redirect("/");





    }catch(err)
    {
        console.log(err);
    }


    //console.log(req.body.title);
 
}

exports.createpost=(req,res)=>{
    res.render("form.ejs");

}