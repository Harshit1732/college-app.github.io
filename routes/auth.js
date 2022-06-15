const express=require('express')
//const {route} = require("express/lib/application");

const {
  postlogin,
  postsignup,
  getsignup,
  getlogin,
  getlogout,
}           =require("../controlller/authentication");

const router = express.Router();

router.get("/login", getlogin);
router.get("/signup",getsignup);

router.post("/login",postlogin);
router.post("/signup",postsignup);
router.get("/logout", getlogout);


module.exports = router;