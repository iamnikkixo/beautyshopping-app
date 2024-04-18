require('dotenv').config();
const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const User = require('./models/user');

// importing secret key
const secretKey = process.env.SECRET_KEY;

passport.use(
  new LocalStrategy(
    { usernameField: 'email' }, // Or 'username' if your model uses 'username' for login
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, {
            message: 'Email does not exist',
            errorType: 'email',
          });
        }

        // Use the authenticate method provided by passport-local-mongoose
        const result = await user.authenticate(password);
        if (result.user) {
          return done(null, user);
        } else {
          return done(null, false, {
            message: 'Password incorrect',
            errorType: 'password',
          });
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);

exports.getToken = function (user) {
  return jwt.sign(user, secretKey, { expiresIn: 3600 }); // Expires in 1 hour
};

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey,
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findOne({ _id: jwt_payload._id });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

// Verify if a user is an admin
exports.verifyAdmin = (req, res, next) => {
  console.log('req user', req.user);
  console.log(req.user.admin);
  if (req.user && req.user.admin) {
    return next();
  } else {
    const err = new Error('You are not authorized to perform this operation!');
    err.status = 403;
    return next(err);
  }
};

exports.jwtPassport = passport.initialize();
exports.verifyUser = passport.authenticate('jwt', { session: false });
