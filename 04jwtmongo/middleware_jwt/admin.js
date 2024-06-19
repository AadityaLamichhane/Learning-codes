const {Admin, User} = require("../db");
const {key} = require("../db/index.js");
const jwtwebtoken = require('jsonwebtoken');

// Middleware for handling auth
async function adminMiddleware(req, res, next) {

    const {authorization} = req.headers;

    ///checking the field
    
    if(!authorization)
        {
            return res.status(404).json({massage:"Empty credential to account"});
        }

        //geting the verification for the user 

    try {
        const verifiied_profile =  jwtwebtoken.verify(authorization,key);
        
        const user_data =await  Admin.findOne({username:verifiied_profile.username});
        
        if(!user_data)
            {
                return res.status(400).json({massage:"NO user was found with that credetial "});
            }
    }
    catch(error)
    {
        return res.status(500).json({massage:"Something went wrong on verification of the profile"});
    }
    
   
        //All sorted
        next();

}

module.exports = adminMiddleware;