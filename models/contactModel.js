const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    user_id: {          // since we need to protect our contacts routes-> so only the logged in user should should be abe to create update or read or delete the contact which they have created for theselves  
      type: mongoose.Schema.Types.ObjectId,   // whenever a new contact is created we need to associate with that contact with user id who is creating it
      required: true,
      ref: "User",
    },
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