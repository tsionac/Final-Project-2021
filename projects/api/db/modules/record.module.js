const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    companyID : {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    },
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
    actionID : {
      type:Number,
      required: true,
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
