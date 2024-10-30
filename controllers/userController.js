const userRegistration=require('../models/userRegistration');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const dotEnv=require('dotenv');

dotEnv.config();

const secretKey=process.env.whatISyOurName

const registerUser=async(req,res)=>{
    const {username,email,password}=req.body;
    try{
        const userEmail=await userRegistration.findOne({email});
        if(userEmail){
            return res.status(400).json("Email already Exists");
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const newUser=new userRegistration({
            username,
            email,
            password:hashedPassword
        });
        await newUser.save();

        res.status(201).json({message:"User Registered Successfully"});
        //console.log("registered");
    }catch(error){
        console.log(error);
        res.status(500).json({error:"Internal Server Error"})
    }
}

const userLogin=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await userRegistration.findOne({email});
        if(!user || !(await bcrypt.compare(password,user.password))){
            return res.status(401).json({error:"Invalid username or password"})
        }
        const token=jwt.sign({userId:user._id},secretKey,{expiresIn:'2h'})

        res.status(200).json({success:"Login Successful",token})
        console.log(email,"this is token",token);
    }catch(error){
        console.log(error)
        res.status(500).json({error:"Internal Server Error"})
    }
}

module.exports={registerUser,userLogin}