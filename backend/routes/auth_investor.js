const express = require('express');
const router = express.Router();

// Investor Model
const Investor = require('../models/investor.js');

// User auth dependencies
const bcrypt = require('bcrypt'); // JS hashing library for password auth
const saltRounds = 10;

var devRoute = router.route('/');

devRoute.post(async function(req, res) {

  if (!('username' in req.body) || !('password' in req.body)) {
    res.status(500).json({
      message: "Can't authenticate user without the username or password fields",
      data: {}
    })
    return;
  } else {

    const query = {
      username: req.body.username
    };

    try {
      const inv = await Investor.findOne(query);

			// console.log(inv);

      const userHash = inv.passwordHash;

      const result = await bcrypt.compare(req.body.password, userHash);
      if (result === true) {
        res.status(200).json({
          message: "investor credentials valid",
          data: true,
        })
      } else {
        res.status(404).json({
          message: "investor credentials invalid",
          data: false
        })
      }

    } catch (err) {
      res.status(400).json({
				message: "Couldn't search database for username due to error: " + err.message,
        data: {}
      })
      return;
    }
  }
});

module.exports = router;
