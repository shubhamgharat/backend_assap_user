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
       
    },
    relative1_no: {
        type: String,
       
    },
    relative2: {
        type: String,
        
    },
    relative2_no: {
        type: String,
        
    },
    preferred_hosp: {
        type: String,
        
    },
});


module.exports = mongoose.model('User', userSchema);
