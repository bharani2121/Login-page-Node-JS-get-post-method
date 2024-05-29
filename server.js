const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const port = 3019

const app=express();
app.use(express.static(__dirname))
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb://127.0.0.1:27017/students')
    const db =mongoose.connection
    db.once('open',()=>{
        console.log("Mongodb connection successful")
    })

 const userSchema =new mongoose.Schema({
    username:String,
    roll:Number,
    email:String,
    password:Number
})

const Users = mongoose.model("data",userSchema)


app.get('/',(req,res)=>{
        res.sendFile(path.join(__dirname,'form.html'))
})

app.post('/post', async (req, res) => {
    const { username, roll, email, password } = req.body;
    const existingUser = await Users.findOne({
        $or: [
            { username: username },
            { roll: roll },
            { email: email },
            { password: password }
        ]
    });

    if (existingUser) {
       res.status(400).send("User already exists");
    } else {
        const newUser = new Users({
            username,
            roll,
            email,
            password
        });
        await newUser.save();
        console.log(newUser);
        res.send("LOGIN SUCCESSFUL");
    }
});




app.listen(port,()=>{
    console.log("SERVER STARTED")
})