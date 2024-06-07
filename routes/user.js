const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post('/signup', async(req, res) => {
    const {username ,password} = req.body;
    
    if(!username||!password)
        {
           return  res.status(403).json("NO full information was obtained in the file");
        }
        const user_exist =await User.findOne({username:username});
        if(user_exist)
            {
                return res.status(500).json({massage:"user already exist"})
            }
            try
            {
                const newuser = new User({
                    username,
                    password,
                    
                });

                await newuser.save();
                res.status(200).json({massage:"New user created "});
            }
            catch(error){

                res.status(500).json({massage:"something went wrong"});
            }
      
    
    // Implement user signup logic
});

router.get('/courses', (req, res) => {
    const courses =Course.find();
    if(!courses)
        {
            return res.status(404).json({massgae:"no courses to show"});

        }
        res.status(200).json({All_courses : courses.title});

    
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    //getting the username and the password from the user 
    const {username, password }= require.headers;
    if(!username || !password)
        {
            return res.status(403).json({massage:"All information is required"});

        }
        //getting the bvalue of the id of the course
        const id = req.params.courseId;
        //implementing to create the new course then update on the req and then finally on the mongo db 
        try{
            const findCourse = await Course.findOne({username: username , password : password});
            req.user.courses.push(id);
            //saving onn the mongo db 
             await req.user.save();
        }
        catch(eror)
        {
            //Getting the exeption or catching that exception
            return res.status(400).json({massage:"error getting the course "});
        }
        
        
     
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
/* todo 
1.find the username user  using te username and the password
2.gettingthe user id then populating with the courses 
3.Extracting the required information ofthe course after the course are populated
4.Printing the data 
*/

const user =await User.findOne(req.user._id).populate("courses");
if(!user)
    {
        return res.status(403).json({massge:"Couldnot fiind anything"})
    }
    res,json({courses:user.courses});

    
    // Implement fetching purchased courses logic
});

module.exports = router