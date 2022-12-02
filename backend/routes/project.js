const express = require('express');
const router = express.Router();

const Proj = require('../models/project.js');

var projectRoute = router.route('/');

const bcrypt = require('bcrypt'); // JS hashing library for password auth
const saltRounds = 10;

// GET / // Return all projects// ?where = Project Schema JSON
// POST /// Put Project JSON in body to create// Returns created Project JSON
// GET /:id // Get Project by ID // Returns single Project in data
// PUT /:id // Put new Project JSON in body to update, only updates fields found in body // Returns updated Project JSON
// DELETE /:id

projectRoute.get(async function (req, res) {
    // default no where parameters
    var query_where = {}
    // if specified
    if (req.query.hasOwnProperty('where')){
        query_where = JSON.parse(req.query['where'])
      }
    
    await Proj.find(Proj.find(query_where, {passwordHash:0}), async function (err, result) {
    if (err){
        res.status(500).json({message:"Couldn't find Investors due to error" + err.message});
    }
    else{
        res.status(200).json({message:"OK", "data":result});
                }
        });
    })

projectRoute.post(async function (req, res) {
        // find by username
        try{
        const curProject = await Proj.find({ username: req.body.username})
    
        if (curProject.length != 0) { // if a dev with the same username exists
            res.status(500).json({
              message: "An investor with that username already exists",
              data: []
            });
            return;
          }
          else{
            bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {
                Proj.create({ 
                  name: req.body.name,
                  industry: 'industry' in req.body ? req.body.industry : "",
                  description: req.body.description,
                  ownerId: 'ownerId' in req.body ? req.body.ownerId : "",
                  amount: 'amount' in req.body ? req.body.amount : 0},
                 async function (err, result) {
                  if (err){
                    res.status(500).json({
                      message: "Couldn't save Project to database due to error " + err.message
                    });
                              }
                else{
                  result.passwordHash = undefined; // don't return passwordHash
                    console.log(result);
                res.status(201).json({
                  message: "Added Project to database",
                  data: result,
                    })
                  };
                })
                })
              }
          }
          catch (err) {
            res.status(500).json({
              message: "Couldn't create Project due to error " + err.message
            });
            return;
          }
    });
    

module.exports = router;
