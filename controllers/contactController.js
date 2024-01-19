const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//@desc Get all contacts
//@routes GET /api/contacts
//@access Public (before user id is added in the contactModel)
//@access private


const getContacts = asyncHandler(async (req,res) => {           //asyncHandler -> means we don't need to write that try and catch error by using express-async-handler u don't actually need that
    const contacts = await Contact.find({ user_id: req.user.id });      //finds out all the contacts from given user id from his account
    res.status(200).json(contacts);
});




//@desc create new contacts
//@routes POST /api/contacts
//@access Public (before user id is added in the contactModel)
//@access private


const createContact = asyncHandler(async(req,res) =>{
    console.log("the request body is: ", req.body);         //body take from postman body 
    const {name, email, phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error('all fields are madatory!');
    }
    const contact = await Contact.create({
         name,
         email,
         phone,
         user_id: req.user.id
    });
    res.status(201).json(contact);
    // res.status(201).json({message:"create contacts"});
});




//@desc get contacts
//@routes GET /api/contacts/:id
//@access Public (before user id is added in the contactModel)
//@access private

const getContact =asyncHandler(async(req,res) =>{
   const contact = await Contact.findById(req.params.id);           //param takes from the link 
   if(!contact){ 
    res.status(404);
    throw new Error("Contact not found");
   }
    res.status(200).json(contact);
});






//@desc update contacts
//@routes POST /api/contacts/:id 
//@access Public (before user id is added in the contactModel)
//@access private

const updateContact =asyncHandler(async(req,res) =>{
    const contact = await Contact.findById(req.params.id);
   if(!contact){
    res.status(404);
    throw new Error("Contact not found");
   }
   if (contact.user_id.toString() !== req.user.id ) {            //to check whether the actual user/ contact owner user is updating or deleting a particular contact of his own or not
    res.status(403);
    throw new Error("User don't have the permission to update other user contacts");
   }
   const updatedContact = await Contact.findByIdAndUpdate(              ///question here why in this format ?
    req.params.id,          //finds the object by given id
    req.body,               //updates the data 
    {new:true},             //to show the updated value or data in teminal
   )
    res.status(200).json(updatedContact);
});





//@desc delete  contacts
//@routes DELETE /api/contacts/:id
//@access Public (before user id is added in the contactModel)
//@access private

const deleteContact = asyncHandler(async(req,res) =>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
     res.status(404);
     throw new Error("Contact not found");
    }
    if (contact.user_id.toString() !== req.user.id ) {      //to check whether the actual user/ contact owner user is updating or deleting a particular contact of his own or not
        res.status(403);
        throw new Error("User don't have the permission to delete other user contacts");
       }
    await contact.deleteOne({ _id: req.params.id });        //await Contact.remove(); -> will dlt all your contacts 
    res.status(200).json({message:`delete contacts for${req.params.id}`});
});


module.exports={
    getContacts, 
    createContact,
    getContact,
    updateContact,
    deleteContact
};