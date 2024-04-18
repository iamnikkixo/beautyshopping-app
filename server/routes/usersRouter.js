const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const authenticate = require('../authenticate');

// login POST
router.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    if (!user) {
      return res
        .status(401)
        .json({ message: info.message, errorType: info.errorType });
    }
    const token = authenticate.getToken({ _id: user._id });
    res
      .status(201)
      .json({ token: token, message: 'Login Successful', user: user });
  })(req, res, next);
});

// register POST
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;

  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }
    const user = User.register({ firstName, lastName, email, phone }, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
