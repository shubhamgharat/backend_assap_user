const mongoose  = require('mongoose');

const requestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    
    phoneNo: {
        type: String,
        required: true,
        min: 6
    },
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
    for_whom: {
        type: String,
        required: true
    },
    for_whom_name: {
        type: String,
        required: true
    }

});


module.exports = mongoose.model('Request', requestSchema);
