const { Router } = require("express");
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://AadityaLamichhane:RjVbumetcWMjvcbf@cluster0.3jtyyty.mongodb.net/userApp");

const {Admin , Course}  = require("../db");

const user = require("..");

const adminMiddleware = require("../middleware/admin");
const { User } = require("../db");
const router = Router();


app.use(expres.json());
// Admin Routes
router.post('/signup',  async (req, res) => {
    const username =  req.headers.username;
    const password = req.headers.password;
    if(!username|| !password)
        {
            res.status(403).json({massage:"All fields are required!"})
        }
        
        try {
            const newcourse = await Admin.Create
            ({
                    username:username,
                    password:password,
    
                });
                res.status(200).json({massage:"Admin created successfully"})
            
        }
        catch(error){
             return res.status(500).json({
                massage:"Couldnot save the data in the database",
                error:error
            })
        }
    

     
    
    // Implement admin signup logic
});

router.post('/courses', adminMiddleware, async (req, res) => {
    //Implement the course creation logic here 
    const admin = await Admin.findOne(req.admin._id);
    
    const {title , description , price ,imageLink ,published} = req.headers;
    if (!title || !description || !price ||!imageLink)
        {
           return  res.status(403).json({massage:"All fields are required!"});

        }
        try {
           const course =  await Course.Create({
                title :title,
                description:description,
                published :published ,
                price:price,
                imageLink:imageLink,
                owner:admin.username
            });
            admin.courses.push(course._id);
            await course.save();
            //Sending the positive massage to the admin that the thijng oa
            res.status(200).json({massage:"Course have been published",courseId:course._id});

        }
        catch(error)
        {
            return res.status(500).json({
                massage:"Couldnot save the data in the database",
                error:error
        });
        }



       

    
});

router.get('/courses', adminMiddleware, async (req, res) => {
    try{
        const admin = Admin.findOne(req.admin._id).populate("courses");  
       return  res.status(200).json({courses:admin.courses});
       
    }
    catch(err)
    {
        return res.status(500).json({massage:"something went wrong"})
    }
    
    // Implement fetching all courses logic
});

module.exports = router;