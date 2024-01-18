const express = require("express");
const router = express.Router();
const Users = require("../schemas/Users")
router.post('/',async (req,res)=>{
    const {userId} = req.body;
    try {
        await Users.findByIdAndDelete(userId);
        res.json({message:"User has been deleted successfully"});
    } catch (error) {
        res.json({error:"User cannot be deleted"});
        
    }
})
module.exports = router