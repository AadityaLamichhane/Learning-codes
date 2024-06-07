// Middleware for handling auth
const {Admin} =require("../db");





async function adminMiddleware(req, res, next) {
    const username =req.headers.username;
    const password =req.headers.password;
    if(!username || !password)
        {
            return res.status(400).json({msg:"Provide full information"});

        }
        const admin_info = await Admin.findOne({username:username, password:password});
        if (!admin_info)
            {
               return res.status(400).json({msg:"NO user found with that information"});

            }
       
        req.admin = Admin;
        next ();
       
      
       
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
}

module.exports = adminMiddleware;