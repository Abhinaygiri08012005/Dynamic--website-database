const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiQWJoaW5heSIsImVtYWlsIjoiYWJoaW5heS5oaWhpYnJvQGdtYWlsLmNvbSIsImlkIjoiNjVhM2U1NjU1NWNkZGI5NWViMzY1NDk3In0sImlhdCI6MTcwNTMxNTc2OCwiZXhwIjoxNzA1MzE1ODI4fQ.149qtXkxMJE66z85EDd_mUpsmth7d7XARp1WIoKiXM0
const validateToken = asyncHandler(async(req,res,next) => {
    let token;    
    let authHeader = req.headers.Authorization || req.headers.authorization;              //whenever user is sending a request the token is actually passed in the header section with the auth field sp u can either pass in header itself or in baarer token if u have an option
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];     //0th index will contain Bearer 1th index for token -> here the token is take from auth 
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,decoded) => {     //token , key
        if (err) {
           return res.status(403).send({msg: 'Unauthorized'});
        }
        req.user = decoded.user;
        next();
      });
      if (!token) {
        return res.status(401).send({msg: 'User is not authorized or token is missing'});
    
    }
    }
});



module.exports = validateToken;