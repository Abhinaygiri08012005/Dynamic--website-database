const mongoose = require("mongoose");
//connection creation and creating a new db
mongoose.connect("mongodb://127.0.0.1:27017/mycontacts-backend",        //databasename means whatever name u want for ur database 
).then(() => {
    console.log("Connection successful");
}).catch((err) => { 
    console.error("Connection error:", err);
})