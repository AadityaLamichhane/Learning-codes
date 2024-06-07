//connecting the admin.js user model in the file  
 const { User }= require("../db");



function userMiddleware(req, res, next) {
    const username = req.headers.username;
    const password = req.headers.password;
    if(!username || !password)
        {
            return res.status(400).json({massage:"Invalid username or password"});

        }
    const data =User.findOne({username:username , password: password});
    if(!data)
        {
            return res.status(400).json({massage:"No user found with that info"});
        }
        req.user = User;
     next();   
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
}

module.exports = userMiddleware;