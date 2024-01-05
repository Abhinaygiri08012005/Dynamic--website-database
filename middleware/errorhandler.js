const {constants} = require("../constants");    //or const constants = require("../constants");            ///we imported constant file here to we can give a name to each status code in the code to make readable u can also write it directly for example 500 instead of constant.SERVER_EROR
const errorHandler = (err,req,res,next) => {
    const statusCode = res.statusCode ? res.statusCode: 500;
    switch(statusCode){
        case constants.VALIDATION_ERROR:
            res,json({ title :"validation failed", message: err.message, stackTrace: err.stack});
            break;
        case constants.NOT_FOUND:
            res,json({ title :"not found", message: err.message, stackTrace: err.stack});
            break;
        case constants.UNAUTHORIZED:
            res,json({ title :"UNAUTHORIZED", message: err.message, stackTrace: err.stack});
            break;
        case constants.FORBIDDEN:
            res,json({ title :"FORBIDDEN", message: err.message, stackTrace: err.stack});
            break;
        case constants.SERVER_ERROR:
            res,json({ title :"SERVER_ERROR", message: err.message, stackTrace: err.stack});
            break;
        default:
            console.log('no error');
            break;
    } 

};
module.exports = errorHandler; 

