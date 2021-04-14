const mongoose  = require('mongoose');

const hospitalSchema = new mongoose.Schema({
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
    type: {
        type: String,
        required: true,
        min: 3
    },
    contact: {
        type: String,
        required: true,
        min: 6
    },
    main_doc_name: {
        type: String,
        required: true,
        min: 6
    },
    latitude: {
        type: String,
        required: true,
        min: 6
    },
    // longi: {
    //     type: String,
    //     required: true,
    //     min: 6
    // },
    xyz: {
        type: String,
        required: true,
        min: 6
    },
    beds: {
        type: Number,
        required: true
    }
});


module.exports = mongoose.model('Hospital', hospitalSchema);
