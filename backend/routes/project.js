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
                    console.log(result);
                res.status(201).json({
                  message: "Added Project to database",
                  data: result,
                    })
                  };
                })
          }
          catch (err) {
            res.status(500).json({
              message: "Couldn't create Project due to error " + err.message
            });
            return;
          }
    });

    var projectRouteId = router.route('/:id');

    projectRouteId.get(async function (req, res) {
        // default no where parameters
        if ((await Proj.find({_id:req.params.id})).length === 0){
          res.status(404).json({
            message: "No Project found with this id"
          });
          return;
        }
        
        await Proj.find(Proj.find({_id:req.params.id}), async function (err, result) {
        if (err){
            res.status(500).json({message:"Couldn't find Projects due to error" + err.message});
        }
        else{
            res.status(200).json({message:"OK", data:result});
                    }
            });
        })
    

module.exports = router;
