const express = require('express');
const router = express.Router();

// Dev Model
const Dev = require('../models/developer.js');

// User auth dependencies
const bcrypt = require('bcrypt'); // JS hashing library for password auth
const saltRounds = 10;

var devRoute = router.route('/');

devRoute.post(async function(req, res) {

  if (!('username' in req.body) || !('password' in req.body)) {
    res.status(422).json({
      message: "Can't authenticate user without the username or password fields",
      data: {}
    })
    return;
  } else {

    const query = {
      username: req.body.username
    };

    try {
      const dev = await Dev.findOne(query);
			// console.log(dev);
      const userHash = dev.passwordHash;

      const result = await bcrypt.compare(req.body.password, userHash);
      if (result === true) {
        res.status(200).json({
          message: "Developer credentials valid",
          data: true,
        })
      } else {
        res.status(401).json({
          message: "Developer credentials invalid",
          data: false
        })
      }

    } catch (err) {
      res.status(500).json({
				message: "Couldn't search database for username due to error: " + err.message,
        data: {}
      })
      return;
    }
  }
});

module.exports = router;
