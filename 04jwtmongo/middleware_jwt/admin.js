const {Admin, User} = require("../db");
const {key} = require("../db/index.js");
const jwtwebtoken = require('jsonwebtoken');

// Middleware for handling auth
async function adminMiddleware(req, res, next) {

    const authorize = req.headers.Authorization;

    ///checking the field
    if(!authorize)
        {
            return res.status(404).json({massage:"Empty credential to account"});
        }

        //geting the verification for the user 

    try {
        

        const verifiied_profile =  jwtwebtoken.verify(authorize,key);
    }
    catch(error)
    {
        return res.status(500).json({massage:"Something went wrong on verification of the profile"});
    }
    //Checking if the given user exist or not 

    const user_data =await  User.findOne({username:authorize.username});
    if(!user_data)
        {
            return res.status(400).json({massage:"NO user was found with that credetial "});
        }
        //All sorted
        next();

}

module.exports = adminMiddleware;