const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
mongoose.connect("mongodb+srv://kotebe:kotebe@cluster0.dvobyzl.mongodb.net/").then(()=>{
    console.log("Connected to the database")
})
app.use(cors())
app.use(express.json())
app.use('/login',require('./routes/login'))
app.use('/signup',require('./routes/signup'))
app.use("/verify",require("./routes/verify"))
app.use("/update",require("./routes/update"))
app.use("/delete",require("./routes/deleteAcc"))

app.listen(4000,()=>{
    console.log("Server is listening on port 4000")
})