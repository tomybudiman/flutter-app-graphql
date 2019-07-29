const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const moment = require("moment");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: Schema.Types.ObjectId,
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    default: moment().format()
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: null
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  lastLogin: {
    type: Date,
    default: null
  },
  token: {
    type: String,
    default: null
  }
}).plugin(mongoosePaginate);

const User = mongoose.model('Users', UserSchema);

module.exports = {UserSchema, User};
