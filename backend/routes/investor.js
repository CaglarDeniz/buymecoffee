const express = require('express');
const router = express.Router();

const Investor = require('../models/investor.js');

const bcrypt = require('bcrypt'); // JS hashing library for password auth
const saltRounds = 10;


var investorRoute = router.route('/');


// GET / Return all investors  ?where = Investor Schema JSON
// POST / Put Investor JSON in body to create Return created Investor JSON
// GET /:id Get Investor by ID
// PUT /:id Put new Investor JSON in body to update, only updates fields found in body Return updated Investor JSON
// DELETE /:id -> potential endpoint

investorRoute.get(async function (req, res) {
// default no where parameters
var query_where = {}
// if specified
if (req.query.hasOwnProperty('where')){
    query_where = JSON.parse(req.query['where'])
  }

await Investor.find(Investor.find(query_where, {passwordHash:0}), async function (err, result) {
if (err){
    res.status(500).json({message:"Couldn't find Investors due to error" + err.message});
}
else{
    res.status(200).json({message:"OK", "data":result});
            }
    });
})


investorRoute.post(async function (req, res) {
    // find by username
    try{
    curInvestor = await Investor.find({ username: req.body.username})

    if (curInvestor.length != 0) { // if a dev with the same username exists
        res.status(500).json({
          message: "An investor with that username already exists",
          data: []
        });
        return;
      }
      else{
        bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {
            const newInvestor = new Investor({
              name: req.body.name,
              email: req.body.email,
              username: req.body.username,
              passwordHash: hash,
              industry: 'industry' in req.body ? req.body.industry : [],
              bio: 'bio' in req.body ? req.body.bio : "",
              oldStartups: 'oldStartups' in req.body ? req.body.oldStartups : [],
              amount: 'amount' in req.body ? req.body.amount : 0,
            })
    
                    console.log(newInvestor);
    
            try {
              await newInvestor.save();
              newInvestor.passwordHash = undefined; // don't return passwordHash
                        console.log(newInvestor);
              res.status(201).json({
                message: "Added Investor to database",
                data: newInvestor,
              })
            } catch (err) {
              res.status(500).json({
                message: "Couldn't save Investor to database due to error " + err.message
              });
            }
          });
        }

      }
      catch (err) {
        res.status(500).json({
          message: "Couldn't create Investor due to error " + err.message
        });
        return;
      }
});


module.exports = router;


