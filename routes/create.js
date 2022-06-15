const express = require('express')
const path=require("path");
const router = express.Router();

 const {getpostblogs,createpost} = require("../controlller/createpost");
 const isauth= require("../middleware/isauth");


router.post("/create", isauth, getpostblogs);
router.get("/create", isauth, createpost);

module.exports= router;