const express = require('express')
const User = require("../schemas/Users")
const bcryptjs = require('bcryptjs')
const route = express.Router()
const nodemailer = require('nodemailer')
route.post('/create',async(req,res)=>{
    const {username,email,password} = req.body
    try {
        const oldUser = await User.findOne({email})
        if(oldUser){
            return res.json({error:"User already exists :("})
        }
        const hashedPassword = await bcryptjs.hash(password,10)
        const user = new User({
            username,
            email,
            password:hashedPassword
        })
        //generating verfication token
        user.verifyToken = Math.floor(100000 + Math.random() * 900000)
        await user.save()
        //sending verification email
        sendEmailVerification(user.email,user.verifyToken)
        res.json({message:"We have sent you an email go ahead and verify your account!"})
    } catch (error) {
        res.json("Something went wrong")
    }
})
const sendEmailVerification = async (email,verifyToken)=>{
    //creatinng a nodemailer transponder
    const transponder = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"mikiyasgetnet2@gmail.com",
            pass:"rhof igqr ctml pvtz"
        }
    })
    //compose the email message
    const mailOptions = {
        from:"mikiyasgetnet2@gmail.com",
        to:email,
        subject:"Email Verification",
        text:`Please click this link to verify your account: https://guzoserver.onrender.com/verify/${verifyToken}`
    }
    //sending the email
    try {
        await transponder.sendMail(mailOptions)
    } catch (error) {
        console.log("Error while sending the email",error)
    }
}
module.exports = route