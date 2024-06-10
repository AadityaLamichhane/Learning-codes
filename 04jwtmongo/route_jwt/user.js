
const {User} =require("../db/index.js");
const {key} = require("../db/index.js");
const jwtwebtoken = require('jsonwebtoken');

async function userMiddleware(req, res, next) {
    const {authorization} = req.headers;
    if(!authorization)
        {
            return res.status(400).json({massage:"No Credential was given to the server"});
        }
        //Checking the verification of the  user
        try{
            const verify_user =   jwtwebtoken.verify(authorization,key);
            console.log(`This is verified user that are verified using the jwt key ${verify_user}`);
            
            const user_exist =  await User.findOne({username:verify_user.username});
            if(!user_exist)
                {
                    return res.status(400).json({massage:"User donnt exst "});
                }
        next();
            
        }
        catch{
            return res.status(400).json({massage:"Something went wrong Couldnot Veriify You"});
        }

        //Checking if the  user exist previously or not 
      
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
}

module.exports = userMiddleware;