require('dotenv').config();
const mongoose = require("mongoose");
//connection creation and creating a new db
mongoose.connect(process.env.DATABASE_URI,        //databasename means whatever name u want for ur database 
).then(() => {
    console.log("Connection successful");
}).catch((err) => {
    console.error("Connection error:", err);
})