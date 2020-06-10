const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.Promise = Promise;

var bcrypt = require('bcryptjs');


// Define our user schema
const UserSchema = new Schema({
  name: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
        validator: function(v) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email"
    },
  },
  password: {
    type: String,
    // required: true,
    minlength: 8,
    validate: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
  },
  token: { type: String },
});
UserSchema.pre('save', async function preSave(cb) {
  try {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    cb();
  } catch (error) {
    cb(error);
  }
});

UserSchema.methods.encryptPassword = function encryptPassword(password) {
  return bcrypt.hashSync(password, 10);
};

UserSchema.methods.verifyPassword = function verifyPassword(password) {
  return bcrypt.compare(password, this.password);
};
module.exports = User = mongoose.model('users',UserSchema);
