const express = require('express');
const router = express.Router();

const Dev = require('../models/developer.js');

// User auth dependencies
const bcrypt = require('bcrypt'); // JS hashing library for password auth
const saltRounds = 10;

var devRoute = router.route('/');

devRoute.get(async function(req, res) {

  const qparams = req.query;
  const filter = 'where' in qparams ? JSON.parse(qparams.where) : {};
  const projection = {
    passwordHash: 0
  }; // don't return passwordHash

  try {
    const data = await Dev.find(filter, projection);
    res.json({
      message: "OK",
      data: data
    });
  } catch (error) {
    res.status(500).json({
      message: "Couldn't fetch developers due to error " + error.message
    });
  }

});

devRoute.post(async function(req, res) {

  const query = {
    $or: [{
        username: 'username' in req.body ? req.body.username : ""
      },
      {
        email: 'email' in req.body ? req.body.email : ""
      }
    ]
  };

  try {

    const data = await Dev.findOne(query);

    // console.log(data);

    if (data !== null) { // if a dev with the same username exists
      res.status(500).json({
        message: "A developer with that username or email already exists",
        data: []
      });
      return;
    } else {

      const nameRe = /^[a-zA-Z ]+$/
			const usernameRe = /^[\w._-]+$/

      if (nameRe.test(req.body.name)) {
        res.status(500).json({
          message: "Invalid Name",
          data: null
        });
				return;
      }
			
      if (usernameRe.test(req.body.username)) {
        res.status(500).json({
          message: "Invalid User Name",
          data: null
        });
				return;
      }

      // hash given plaintext user password
      bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {
        const newDev = new Dev({
          name: req.body.name,
          email: req.body.email,
          username: req.body.username,
          passwordHash: hash,
          industry: 'industry' in req.body ? req.body.industry : [],
          bio: 'bio' in req.body ? req.body.bio : "",
          projectId: 'projectId' in req.body ? req.body.projectId : [],
          photoLink: 'photoLink' in req.body ? req.body.photoLink : "",
        })

        // console.log(newDev);

        try {
          await newDev.save();
          newDev.passwordHash = undefined; // don't return passwordHash
          console.log(newDev);
          res.status(201).json({
            message: "Added user to database",
            data: newDev,
          })
        } catch (err) {
          res.status(500).json({
            message: "Couldn't save developer to database due to error " + err.message
          });
        }
      });

    }
  } catch (err) {
    res.status(500).json({
      message: "Couldn't create user due to error " + err.message
    });
    return;
  }
})

var devIdRoute = router.route('/:username');

devIdRoute.get(async function(req, res) {

  const query = {
    username: req.params.username
  };

  try {

    const projection = {
      passwordHash: 0
    }; // don't return passwordHash

    const dev = await Dev.findOne(query, projection);

    if (dev.length !== 0 || Object.keys(dev).length !== 0) { // if not empty object
      res.status(200).json({
        message: "OK",
        data: dev
      });
    } else {
      res.status(404).json({
        message: "No developer found with that username"
      });
    }
  } catch (error) {
    res.json({
      message: "Couldn't fetch developer due to error: " + error.message
    });
  }
})

devIdRoute.put(async function(req, res) {

  const query = {
    $or: [{
        username: 'username' in req.body ? req.body.username : ""
      },
      {
        email: 'email' in req.body ? req.body.email : ""
      }
    ]
  };
  try {
		
      const nameRe = /^[a-zA-Z ]+$/
			const usernameRe = /^[\w._-]+$/

      if (!nameRe.test(req.body.name)) {
        res.status(500).json({
          message: "Invalid Name",
          data: null
        });
				return;
      }
			
      if (!usernameRe.test(req.body.username)) {
        res.status(500).json({
          message: "Invalid User Name",
          data: null
        });
				return;
      }

    if ('password' in req.body) {
      const pwHash = bcrypt.hashSync(req.body.password, saltRounds);
      delete req.body.password;
      req.body.passwordHash = pwHash;
    }
    await Dev.updateOne(query, req.body, async function(err, dev) {
      if (!err) {

        let updatedDev;

        try {
          const projection = {
            passwordHash: 0
          }; // don't return passwordHash
          updatedDev = await Dev.findOne(query, projection);
        } catch (err) {
          res.status(500).json({
            message: "Couldn't fetch developer after update",
            data: {}
          })
          return;
        }
        res.status(200).json({
          message: "Successfully updated developer",
          data: updatedDev,
          stats: dev
        });
        return;
      } else {
        res.status(500).json({
          message: "Couldn't update developer due to error " + err,
          data: {}
        });
      };
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      data: {}
    });
  }
})

devIdRoute.delete(function(req, res) {
  res.status(405).json({
    message: 'This method has not been implemented for this endpoint, thank you for your request!'
  });
})

module.exports = router;
