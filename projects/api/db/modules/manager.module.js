const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
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
  hashedPassword : {
      type: String,
      required: true,
      minlength: 1,
      trim: true,
  },
  salt : {
    type:Number,
    required: true,
  },
});

const Manager = mongoose.model('Manager', managerSchema);

module.exports = { Manager };
