import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type :String,
        required : [true,"Please Provide username"],
        unique :true
    },
    email :{
        type :String,
        required : [true,"Please Provide a email"],
        unique :true
    },
    password :{
        type :String,
        required : [true,"Please Provide a passwprd"],

    },
    isVerified :{
        type :Boolean,
        default :false
    },
    isAdmin : {
        type :Boolean,
        default :false
    },
    forgotPasswordToken :String,
    forgotPasswordTokenExpierd : Date,
    verifyToken :String,
    verifyTokenExpire :Date
})

const Userauth = mongoose.models.usersauth || mongoose.model('usersauth',userSchema)
export default Userauth 


