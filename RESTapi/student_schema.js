const mongoose = require("mongoose");
const validator = require("validator");
const { MinLengthValidator } = require("validators");

const studentSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        minlength:[3,"minimum length required"],     
    },
    email:{
        type:String,
        unique:[true,"Email is already registered"],
        validate(val){
            if (!validator.isEmail(val)) {
                throw new Error("Invalid Email")
            }
        }
    },
    phone_no : {
        type : Number,
        unique: [true, "Phone number already exists"],
        minlength: 10 
    }
});

const student = new mongoose.model("student", studentSchema);

module.exports = student;