const express = require('express')

const router = express.Router();

const {
    getblogs,
    getupvotedblog,
    getpost,
    getnotice,
    singleblog,
    
}=require("../controlller/blogpost");
const isAuth = require("../middleware/isauth")

// const getpostblogs = require("../controlller/createpost");

router.get("/blog",getblogs);
// router.post("/blog",getpostblogs)

router.get("/blog/vote/:id/:isUpvote", isAuth, getupvotedblog)
router.get("/notice",getnotice)

router.get("/singleblog/:id", singleblog);


module.exports=router;