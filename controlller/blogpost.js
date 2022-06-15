const Post=require("../models/posts");


exports.getblogs= async(req,res)=>{
     
    try{
    const blogs= await Post.find({});

      res.render("blog.ejs",{blogs});
    }catch(err)
    {
        console.log(err);
    }


}

exports.getupvotedblog= async(req,res)=>{
    try {
        const blogId = req.params.id;
        const isUpvote = req.params.isUpvote;
        const userId = req.session.user._id._id.toString();

        const blog = await Post.findById({_id: blogId});
        if (isUpvote === "1") { 
            console.log(userId);
            blog.upvoteLists.push(userId);
            let updatedUpvotedLists = []

            blog.upvoteLists.map(id => {
                if (userId !== id) {
                    updatedUpvotedLists.push(id)
                }
                // if (userId._id.toString() !== id._id.toString()) {
                //     updatedUpvotedLists.push(id)
                // }
            })

            console.log(updatedUpvotedLists);
            const updatedBlog = blog;

            let data = await JSON.stringify({upvote: updatedBlog.upvoteLists.length})
            res.send(data)
        }
        // else
        //     blog.upvote -= 1;


    } catch (err) {
        console.log(err)
    }
}



// exports.getpostblogs=async(req,res)=>{
//     const  t=req.body.title;

//     try{
        
//         const posts=  await post.create({
//             title:   req.body.title,
//             content: req.body.content,
//         })
         
//         const posts1= await post.find({});

//         console.log(posts1);





//     }catch(err)
//     {
//         console.log(err);
//     }


//     //console.log(req.body.title);
 
// }
exports.getpost=(req,res)=>{
   
    res.render("form.ejs");
}
// exports.blogcreate=(req,res)=>{
//    res.render("form.ejs");
// }


exports.getnotice=(req,res)=>{
    res.render("notice.ejs");
}

exports.singleblog= async(req,res)=>{
       
    try {
        const id = req.params.id;
        const blog = await Post.findById({_id: id})
        res.render("singleBlog.ejs", {blog: blog})
    } catch (err) {
        console.log(err)
    }
        // console.log(blog);
}
