const express = require('express');
const router = express.Router();

const Proj = require('../models/project.js');

var projectRoute = router.route('/');

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
    
    await Proj.find(Investor.find(query_where, {passwordHash:0}), async function (err, result) {
    if (err){
        res.status(500).json({message:"Couldn't find Investors due to error" + err.message});
    }
    else{
        res.status(200).json({message:"OK", "data":result});
                }
        });
    })

    
    

module.exports = router;
