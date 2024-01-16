// const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");           //used for hashing 
//@desc Register a user
//@routes POST /api/users/register 
//@access Public
// const registerUser = async (req, res, next) => {           //asyncHandler -> means we don't need to write that try and catch error by using express-async-handler u don't actually need that
//     try {
//         const { username, email, password } = req.body;
//         if (!username || !email || !password) {
//             res.status(400).json({ message: "please provide complete info" })

//         }
//         const userAvailable = await User.findOne({ email });         //checks whether email already exist or not 
//         if (userAvailable) {
//             res.status(400).json({ message: "already registered" })

//         }
//         //hashed password
//         const hashedPassword = await bcrypt.hash(password, 10); //10-> is number of solved rounds that we want for the hashing 
//         console.log("hashed password:", hashedPassword);
//         const user = await User.create({
//             username,
//             email,
//             password: hashedPassword                             //store the hashed password in db instead of plain text
//         });
//         if (user) {
//             res.status(201).json({ _id: user.id, email: user.email });
//         } else {
//             res.status(400).json({ message: "user data is not valid" });
//         }
//         console.log(`User created ${user}`);
//         res.json({ message: "Register the user" });
//     } catch (err) {
//         console.log(err)
//         next(err)
//     }

// };
//Imagine you're at a registration desk for an event. You give your email to check if you're already registered, and at the same time, you're also filling out a form to register
//The error you encountered, "Cannot set headers after they are sent to the client," happens when your server tries to respond to a request more than once. In your code, it looks like you were sending responses in different situations, and that caused a problem.
const registerUser = async (req, res, next) => {           
    try {
        const { username, email, password } = req.body;
        
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please provide complete information" });
        }

        const userAvailable = await User.findOne({ email });

        if (userAvailable) {
            return res.status(400).json({ message: "Email is already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        if (user) {
            return res.status(201).json({ _id: user.id, email: user.email });
        } else {
            return res.status(400).json({ message: "User data is not valid" });
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};


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


const loginUser = async (req, res, next) => {   
  try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).json({message:"All fields are mandatory"});
        }
        const user = await User.findOne({ email });
        //compare password with hashedpassword
        if (user && (await bcrypt.compare(password, user.password))) {      //here "user.password" is hashed password already stored and password is just given by the user for login which needs to be checked 
            const accessToken = jwt.sign({
                user:{
                    username: user.username,
                    email: user.email,
                    id: user.id,
                }
            }, process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "1m"}          //time for expire of token is given here
            );
            res.status(200).json({ accessToken });
        } else {
            return res.status(401).json({message: "email or password is not valid"});      // res.status(401);  throw new Error("rmail or pass is not valid");
        }
        
    } catch (err) {
        next(err);
    }
};

//@desc Current user 
//@routes POST /api/users/logixn 
//@access Private


const currentUser = async  (req,res,next)=>{
    try{
        res.json(req.user);     //this will provide u the username email and id
    }catch(err){
        next(err);
    }
};

module.exports = { registerUser, loginUser, currentUser};
