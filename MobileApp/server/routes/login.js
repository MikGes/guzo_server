const express = require('express')
const route = express.Router()
const User = require('../schemas/Users')
const bcryptjs = require('bcryptjs')
route.post('/',async(req,res)=>{
   try {
    const {email,password} = req.body
    const user = await User.findOne({email,isVerified:true})
    if(!user){
        return res.json({error:"Email not found!"})
    }
    else if(user){
        const isMatch = await bcryptjs.compare(password,user.password)
        if(!isMatch){
            return res.json({error:"Wrong Password!"})
        }
    }
    res.json({message:"Login Success",user:user})
   } catch (error) {
    res.json({error:"Something went wrong"})
    console.log(error)
   }
})
module.exports = route