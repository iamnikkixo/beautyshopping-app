const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  admin: {
    type: Boolean,
    default: false,
  },
});

UserSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
});

module.exports = mongoose.model('User', UserSchema);
