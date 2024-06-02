const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const jwtpassword = "12345";
app.use(express.json());
const ALL_users =[
    {
        username :"Aadityalamichhane@gmail.com",
        password :"hi",
        name:"Aditya lamichhane",
    },{
        username :"Arjunlami@gmail.com",
        password :"hello",
        name:"Arjun lamichhane",

    },{ 
        username :"sara@gmail.com",
    password :"welcome",
    name:"Sara Ali Khan",
},{
    username :"cristianoronaldo@gmail.com",
    password :"hala madrid",
    name:"Cristiano ronaldo",
},
];


function userExists(username,password){
    for (let a = 0 ; a<ALL_users.length; a++)
        {
            if (username == ALL_users[a].username && password == ALL_users[a].password)
                {
                    return true ;
                }
               
        }
        return false;
}
app.post("/signin",(req,res)=>
{
    const body_obtained = req.body;

    const username1 = body_obtained.username;
    const password1 = body_obtained.password;
    if(!userExists(username1,password1))
        {
            res.status(403).json({msg:"user dont exist "});

        }
        const token = jwt.sign({username : username1 },jwtpassword);
        return res.json({
            token,
        });
});

app.get("/users",(req,res)=>{
    const token = req.headers.authorization;
    try {
        const decode = jwt.verify(token,jwtpassword);
        const username = decode.username;
        return res.json({
           users : ALL_users.filter((element) => {
                if (element.username === username )
                    {
                        return false ;
                    }
                    else
                    {
                        return true ;
                    }
                
              
            })
        });

    }
    catch(err)
    {
        return res.status(403).json({
            msg:"Invalid token",
        });

    }
});

app.listen(3000,()=>{
    console.log("Server running on 3000");
});