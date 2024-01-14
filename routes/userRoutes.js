const express = require("express");

const router = express.Router();

const { registerUser, loginUser } = require("../controllers/userController");


router.post("/register", registerUser);

router.post("/login", loginUser);

//  router.get("/current",currentUser);

module.exports = router;

//  router.post("/register", (req,res)=>{
//         res.json({message: "register the user"});
//  });

//  router.post("/login", (req,res)=>{
//     res.json({message: "login user"});
// });

// router.get("/current", (req,res)=>{
//     res.json({message: "current user information"});
// });
