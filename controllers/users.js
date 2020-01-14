const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../properties');
const User = require('../models/user');

let users = [
  {
    username: 'aditya',
    name: 'Vijaya Aditya',
    description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt voluptatum molestiae beatae quia suscipit laborum nulla et, sapiente id possimus.'
  },
  {
    username: 'bhanu',
    name: 'Bhanu Chandar',
    description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt voluptatum molestiae beatae quia suscipit laborum nulla et, sapiente id possimus.'
  },
  {
    username: 'vamsi',
    name: 'Vamsi Krishna',
    description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt voluptatum molestiae beatae quia suscipit laborum nulla et, sapiente id possimus.'
  }
]

// List
router.get('/list', (req, res, next) => {
  res.json(users);
})

// Register
router.post('/register', (req, res, next) => {
  let found = true;

  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.getUserByUsername(newUser.name, (err, user) => {
    if (err) throw err;
    if (user) {
      res.json({success: false, msg: 'User already exists'});
    }
  });

  if (found === false) {
    User.addUser(newUser, (err, user) => {
      if (err) {
        res.json({success: false, msg: 'Failed to register user'});
      } else {
        res.json({success: true, msg: 'User registered'});
      }
    });
  }
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign({data: user}, config.secret, {
          expiresIn: 604800  // 1 week
        });
        res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

// Profile
router.get(
    '/profile', passport.authenticate('jwt', {session: false}),
    (req, res, next) => {
      res.json({user: req.user});
    });

module.exports = router;
