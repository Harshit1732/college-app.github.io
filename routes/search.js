const express=require('express')

const router= express.Router();


router.post("/search",async(req,res)=>{

   const search=  req.body.searchbar;
   
   

    res.render("search.ejs");
})


module.exports = router;