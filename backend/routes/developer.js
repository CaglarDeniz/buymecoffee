const express = require('express');
const router = express.Router();

const Dev = require('../models/developer.js');

var devRoute = router.route('/');

devRoute.get(async function(req, res) {

  const qparams = req.query;
  const filter = 'where' in qparams ? JSON.parse(qparams.where) : {};

  try {
    const data = await Dev.find(filter);
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
    email: req.body.email
  };

  try {

    const data = await Dev.find(query);

    console.log(data);

    if (data.length !== 0 || Object.keys(data).length !== 0) { // if a dev with the same username exists
      res.status(500).json({
        message: "A developer with that email already exists",
        data: []
      });
      return;
    } else {

      const newDev = new Dev({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        industry: 'industry' in req.body ? req.body.industry : [],
        bio: 'bio' in req.body ? req.body.bio : "",
        projectId: 'projectId' in req.body ? req.body.projectId : [],
        photoLink: 'photoLink' in req.body ? req.body.photoLink : "",
      })

      try {

        await newDev.save();
        res.status(201).json({
          message: "Added user to database",
          data: newDev,
        })
      } catch (err) {
        res.status(500).json({
          message: "Couldn't save developer to database due to error " + err.message
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      message: "Couldn't create user due to error " + err.message
    });
    return;
  }
})

var devIdRoute = router.route('/:id');

devIdRoute.get(async function(req, res) {

  const query = {
    _id: req.params.id
  };

  try {

    const dev = await Dev.findOne(query);

    if (dev.length !== 0 || Object.keys(dev).length !== 0) { // if not empty object
      res.status(200).json({
        message: "OK",
        data: dev
      });
    } else {
      res.status(404).json({
        message: "No developer found with that id"
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
    _id: req.params.id
  };
  try {
    await Dev.updateOne(query, req.body, async function(err, dev) {
      if (!err) {

				let updatedDev ;

				try{
					updatedDev = await Dev.findOne(query);
				}
				catch(err){
					res.status(500).json({message:"Couldn't fetch developer after update",data:{}})
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
  res.json({
    message: 'This method has not been implemented for this endpoint, thank you for your request!'
  });
})

module.exports = router;
