const { Router, response } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User ,key,Course} = require("../db"); 
const jwtwebtoken = require("jsonwebtoken");
// User Routes
router.post('/signup', async (req, res) => {
    const {username , password } = req.body;

    if(!username || !password)
        {
            return res.status(410).json({massage:"NO username or password "});
        }
            try{

                const userExist = await User.findOne({username:username});
                  
                if(userExist)
                    {
                        return res.status(400).json({massage:"User with the credential already exist"});
                    }                 
                    const  signed =  jwtwebtoken.sign({username:username},key);

                const newuser = new User({
                    username:username,
                    password:password
                }); 
                await newuser.save();
                return res.status(200).json({massage:"Successfult signed up ",token:signed});

            }
            catch(error)
            {
                console.error(error);
                return res.status(500).json({ message: "Something went wrong while saving the data" });
            }
            
            
    // Implement user signup logic
});

router.post('/signin',async (req, res) => {
    const { username , password } = req.body;
    if(!username || !password)
        {
            return res.status(410).json({massage:"NO username or password "});
        }

    const userExist = await User.findOne({username:username});

    

    if(!userExist)
            {
                return res.status(400).json({massage:"User with the credential Dont exist"});
            }

            if(userExist.password !== password)
                {
                    return res.status(400).json({masssage:"Incorrect password"})
                }

    try {
            const token = jwtwebtoken.sign({username:username},key);
            return res.status(200).json({token:token});
        }
        catch{
            return res.status(400).json({masasage:"signing fail with jwt"});
        }
        
    // Implement admin signup logic
});

router.get('/courses', async (req, res) => {
    const courses_to_show =await Course.find();
    
    if(!courses_to_show)
        {
            return res.status(404).json({massgae:"no courses to show"});

        }

        courses_to_show.map((element)=>{
            return element.title;
        });
        res.status(200).json({All_courses : courses_to_show});

});

router.post('/courses/:courseId', userMiddleware,async (req, res) => {
    const id = req.params.courseId;
    const {Authorization} = req.headers;
    let user = '';


    //Geting the data of the user 
    
    try{
        const  verify_user = jwtwebtoken.verify(Authorization,key);
        user = verify_user.username;

    }
    catch{
        return res.status(400).json({massage:"Somwhing went wrong while checking credential"})
    }

    //Checking the user course history with the same course
    
    const courseofuser = user.myCourse;
    
    const user_have_course = courseofuser.filter((element)=>
    {
        if(element==id)
            {
                return true;
            }
    });

    if(Object.values(user_have_course).length!==0)
        {
            return res.status(300).json({massage:"already brough that course"}); 
        }
    

    
    //if my user have that 

    const CourseWithId =await  Course.findOne({_id:id});
    if(!CourseWithId)
        {
            return res.status(400).json({massage:"No course with that id was found"});
        }
        try{
            user.myCourse.push(id);
            await user.save();

        }
        catch(error){
            return res.json({massage:"something went wrong in the course purchasing",error:error});
        }
        
       
    // Implement course purchase logic
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
});

module.exports = router