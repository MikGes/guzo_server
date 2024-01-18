const express = require("express");
const router = express.Router();
const Users = require("../schemas/Users")
router.post('/',async (req,res)=>{
    const {userId,newName} = req.body;
    try {
        await Users.findByIdAndUpdate(userId,{username:newName});
        res.json({message:"User has been updated successfully"});
    } catch (error) {
        res.json({error:"user cannot be updated"});
        
    }
})
module.exports = router