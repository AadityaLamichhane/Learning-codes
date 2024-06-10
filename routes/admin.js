const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin ,key, Course }=require("../db/index.js");

const  jwtwebtoken  = require("jsonwebtoken");

// Admin Routes
router.post('/signup',  async (req, res) => {
    const {username,password} = req.body;
    //Checking if the user provided info empty
    if(!username || !password)
        {
            return res.status(400).json({massage:"require all the information"});
        }
        //Checking if username exist with same useer name

        const UserWithSameUsername = await  Admin.findOne({username:username});
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

router.post('/signin',async  (req, res) => {
    const {username,password} =req.body;
    if(!username||!password)
        {
            return res.status(400).json({massage:"Something went wrong with the work"});
        }
        const exist_user = await Admin.findOne({username:username , password:password});

        

        if(!exist_user)
            {
                return res.status(400).json({massage:"Wrong username or password "});
            }
        
        //giving the jwt token and thee password
        try{
            const token = jwtwebtoken.sign({username:username},key);

            return res.status(200).json({massage:"successfully logged in ",token:token});

        }
        catch(error)
        {
            return res.status(400).json({masssage:"Error while doing the token"});
        }
        
        




});

router.post('/courses', adminMiddleware, async (req, res) => {
    /*thing to do while making the course
    1.Getting the information oof the course->validate
    2.Getting the information of the prev course with same info 
    3.Storing the course on the database 
    4.sending the information or responce to the user */
    const {authorization}=req.headers;
    let user_data={};
    try{
    const username_object = jwtwebtoken.verify(authorization,key);
     user_data = await  Admin.findOne({username:username_object.username});
}
catch(error)
    {
        return res.status(400).json({masage:"Error while verify the usrnames"});
    }

    
    


    const { title ,description , price, imageLink } = req.body;
    if(!title||!description||!price||!imageLink)
        {
            return res.status(400).json({massage:"Not full information of the data"});
        }
        const Course_information = {
            title:title,
            description:description ,
              owner:user_data.username,
             price:price,
              imageLink:imageLink
        }
    const CourseExist = await Course.findOne({title:title , owner :user_data.username});
    
    if(CourseExist)
        {
            return res.status(400).json({massage:"Course already exist "});
        }
        try{
            const new_course = new Course(Course_information);
            await new_course.save();
            return res.status(200).json({massage:"Successfullt saved the course",id :new_course._id})

        }
        catch{
            return res.status(400).json({masssage:"Eror on getting the course stored "});
        }
        

});

router.get('/courses', adminMiddleware,async (req, res) => {
    const AllCourse = await Course.find({});
    if(!AllCourse)
        {
            return res.status(400).json({massage:"No course to show at this moment"})
        }
       
    
        return res.json({Courses:AllCourse});
        // Implement fetching all courses logic
});

module.exports = router;