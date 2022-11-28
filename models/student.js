const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "student name must be provided"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "student email must be provided"],
        unique: true,
        trim: true
    },
    mobile: {
        type: Number,
        required: [true, "student mobile number must be provided"]
    },
    gender: {
        type: String,
        required: true,
        enum: {
            values: ["M", "F"],
            message: "{VALUE} is not a Gender"
        }
    },
    dateOfBirth: {
        type: Date,
    },
    city: {
        type: String,
        trim: true
    },
    branch: {
        type: String,
        required: [true, "student branch must be provided"],
        enum: {
            values: ["CSE", "IT", "ME", "CE", "EE", "ECE"],
            message: "{VALUE} is not a Branch"
        }
    }
}, { timestamps: true });


module.exports = mongoose.model("Student", studentSchema);