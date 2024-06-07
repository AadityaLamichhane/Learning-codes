const mongoose = require('mongoose');

// Connect to MongoDB this is async function
mongoose.connect('will implement using the ignore env');

// Define schemas
const AdminSchema = new mongoose.Schema({

    username : {type : String , unique:true , required:true },
    password :{type :String , required: true },
    courses :{type : mongoose.Schema.Types.ObjectId , ref:"Course" }
});

const UserSchema = new mongoose.Schema({
    username:{type :String ,unique :true ,required:true},
    password : {type :String, unique:true , required:true},
    my_courses:{type:mongoose.Schema.Types.ObjectId,ref:"Course" },
    // Schema definition here
});

const CourseSchema = new mongoose.Schema({
title: String,
description: String,
published:{type:Boolean , default:true },
price:Number,
image:String,
owner:String
   // Schema definition here
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}