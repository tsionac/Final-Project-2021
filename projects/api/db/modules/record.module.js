const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    userID : {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    },
    componentID : {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    },
    editStart: {
        type: Date, 
        default: Date.now
    },
    editEnd: {
        type: Date, 
        default: Date.now
    },
});

const Record = mongoose.model('Record', recordSchema);

module.exports = { Record };