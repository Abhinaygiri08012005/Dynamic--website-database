const express = require("express");
const errorHandler = require("../middleware/errorhandler");
const dotenv = require("dotenv").config();      //so that we can use or fetch envirnment file 
const connectDb = require("./config/dbConnection");


const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);
app.listen(port, () =>{
    console.log(`Server started on ${port}`);
});




//normal way to send
// app.get('/api/contacts', (req,res)=>{
//     res.send("Get all contacts");
// });

//json format 
// app.get('/api/contacts', (req,res)=>{
//     res.json({message: "Get all contacts"});
// });

// //status 
// app.get("/api/contacts",(req,res) =>{
//     res.status(200).json({message:"get all my contacts"});
// });