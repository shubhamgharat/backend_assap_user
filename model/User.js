const mongoose  = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now
    },
    gender: {
        type: String,
        required: true,
        min:1
    },
    phoneNo: {
        type: String,
        required: true,
        min: 6
    },
    dob: {
        type: String,
        required: true,
        min: 6
    },
    history: {
        type: String,
        required: true,
        min: 6
    },
    relative1: {
        type: String,
        default: "NA",
       
    },
    relative1_no: {
        type: String,
        default: "NA",
       
    },
    relative2: {
        type: String,
        default: "NA",
        
    },
    relative2_no: {
        type: String,
        default: "NA",
        
    },
    preferred_hosp: {
        type: String,
        default: "NA",
        
    },
});


module.exports = mongoose.model('User', userSchema);
