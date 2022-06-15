const Post = require("../models/posts")
exports.getProfile = async (req, res) => {
    let post = await Post.find({author: req.session.user.username})
    console.log(post)
    res.send("Hii")
}