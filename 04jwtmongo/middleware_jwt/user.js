
const {User} =require("../db/index.js");
const {key} = require("../db/index.js");
const jwtwebtoken = require('jsonwebtoken');

async function userMiddleware(req, res, next) {
    const Authorize = req.headers.Authorization;
    if(!Authorize)
        {
            return res.status(400).json({massage:"No Credential was given to the server"});
        }
        //Checking the verification of the  user
        try{
            const verify_user = jsonwebtoken.verify(Authorize,key);

        }
        catch{
            return res.status(400).json({massage:"Something went wrong Couldnot Veriify You"});
        }

        //Checking if the  user exist previously or not 
        const user_exist = User.findOne({username:verify_user.username});
        if(!user_exist)
            {
                return res.status(400).json({massage:"User donnt exst "});
            }
    next();
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
}

module.exports = userMiddleware;