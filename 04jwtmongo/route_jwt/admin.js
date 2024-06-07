const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin , key }=require("../db/index.js");

const  jwtwebtoken  = require("jsonwebtoken");

// Admin Routes
router.post('/signup',  async(req, res) => {
    const {username,password} = req.body;
    //Checking if the user provided info empty
    if(!username || !password)
        {
            return res.status(400).json({massage:"require all the information"});
        }
        //Checking if username exist with same useer name

        const UserWithSameUsername =  await Admin.findOne({username:username});
        if(UserWithSameUsername)
            {
                return res.status(400).json({massage:"User with the provided username exist already"});
            }
        //Giving the user the key 
        
    const  signed =  jwtwebtoken.sign({username:username},key);

    //Storing the value om the databse 

    try{
        const new_admin = new Admin({
            username:username,
            password:password
        });
        await new_admin.save();
        return res.status(200).json({massage:"Sucesfully Signed up the Admin",Token:signed});

    }
    catch(err){
        return res.status(400).json({massage:"Something went wrong while storing the data on the database"})
    }
    
    // Implement admin signup logic
});

router.post('/signin', (req, res) => {
    // Implement admin signup logic
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
});

module.exports = router;