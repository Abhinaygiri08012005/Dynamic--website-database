const express = require("express");

const router = express.Router();

const { registerUser, loginUser, currentUser } = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current",validateToken ,currentUser);

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
