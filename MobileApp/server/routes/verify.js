const express = require("express");
const router = express.Router();
const User = require("../schemas/Users")
router.get('/:token',async(req,res)=>{
const token = req.params.token
const user = await User.findOne({verifyToken:token})
if(!user){
    return res.status(500).json({message:"Token not found!"})
}
else{
    user.isVerified = true
    user.verifyToken = ""
    await user.save()
    return res.status(200).json({message:"Account verified go back to our app login!"})
}
})
module.exports = router