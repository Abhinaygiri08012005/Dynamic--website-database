const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");           //used for hashing 
//@desc Register a user
//@routes POST /api/users/register 
//@access Public
const registerUser = asyncHandler(async (req,res) => {           //asyncHandler -> means we don't need to write that try and catch error by using express-async-handler u don't actually need that
    const { username, email, password }= req.body;
    if(!username || !email || !password){
        res.status(400).json({message: "please provide complete info"})

    }
   const userAvailable = await User.findOne(email);         //checks whether email already exist or not 
   if(userAvailable){
    res.status(400).json({message: "already registered"})

   }
    //hashed password
   const hashedPassword = await bcrypt.hash(password,10); //10-> is number of solved rounds that we want for the hashing 
   console.log("hashed password:", hashedPassword);
   const user = await User.create({
    username,
    email,
    password : hashedPassword                             //store the hashed password in db instead of plain text
   });
   if (user){
    res.status(201).json({_id: user.id, email: user.email});
   }else{
    res.status(400).json({message: "user data is not valid"});
   }
   console.log(`User created ${user}`);
   res.json({ message : "Register the user"});
}); 


// const registerUser = asyncHandler(async (req,res) => {           //asyncHandler -> means we don't need to write that try and catch error by using express-async-handler u don't actually need that
//     const { username, email, password }= req.body;
//     if(!username || !email || !password){
//         res.status(400).json({message: "please provide complete info"})

//     }
//    const userAvailable = await User.findOne(email);         //checks whether email already exist or not 
//    if(userAvailable){
//     res.status(400).json({message: "already registered"})

//    }
//     //hashed password
//    const hashedPassword = await bcrypt.hash(password,10); //10-> is number of solved rounds that we want for the hashing 
//    console.log("hashed password:", hashedPassword);
//     res.json({ message : "Register the user"});
// }); 

//@desc login user
//@routes POST /api/users/login 
//@access Public


const loginUser = asyncHandler(async (req,res) => {           //asyncHandler -> means we don't need to write that try and catch error by using express-async-handler u don't actually need that
    res.json({message: "login user"});
});

//@desc Current user 
//@routes POST /api/users/logixn 
//@access Private


const currentUser = asyncHandler(async  (req,res)=>{
    res.json({message: "current user information"});
});

module.exports = {registerUser,loginUser,currentUser};
