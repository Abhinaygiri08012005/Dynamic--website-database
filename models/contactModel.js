const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide your name"]
    },
    email:{
        type:String,
        required:[true,"Please provide your email"]
    },
    phone:{
        type:String,
        required:[true,"Please provide your phone no."]
    },
  },
  {
    timestamps: true //this will create createdAt and updatedAt field automatically
  }
);

module.exports = mongoose.model("contact", contactSchema);