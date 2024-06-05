/* Make sure to instal all the npm before using this code 
npm install express(Libray used to import and use the port link in the prgram)
npm intall mongoose(Library used to connect and store data in the mongose)
*/

const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

//conneting the database to the applicationz

mongoose.connect("url")    //idk if i should be conserned about these but i hve decided not to include the info about the database path connectionlink
const User = mongoose.model( 'users',{name : String ,email : String ,password : String }); //saysthat ki my model is for the Users (table) and model include name with string ans so on..


//hiting the port 
app.post("/signup", async function(req,res)
{
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;

    //checking if the user already exist or not
    const existingUsers = await User.findOne({email:username});
    if (existingUsers)
        {
            return res.status(400).send("username already exist ");

        }
        else{
            const user = new User({
                name:name,
                email:username,
                password:password
    
                
            });
            user.save();
            return res.status(200).json({msg:"Done"});

        }
        //saving things ont he backend mongodb
       
        

});
app.listen(3000,()=>
{
    console.log("App listened to the port 3000");

})

//check what does the each line of the code do independentlty or what is the feature of the each app 

/* using the port that user hit when user probvide the information the data was stored in the mongos successfully
 */
