const express = require("express");
const router = express.Router();

const {getContacts,createContact,getContact,updateContact,deleteContact} = require("../controllers/contactController"); 


// router.route("/").get(getContacts);
// router.route("/").post(createContact);
// router.route("/:id").get(getContact);
// router.route("/:id").put(updateContact);
// router.route("/:id").delete(deleteContact); 
//or 
const validatetoken = require("../middleware/validateTokenHandler")
router.use(validatetoken);       //and if u have all the routes as a protected route or if u want to validate tokens for all of the routes then add here 
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact); 

module.exports = router;