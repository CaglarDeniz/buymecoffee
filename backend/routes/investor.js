const express = require('express');
const router = express.Router();

const Investor = require('../models/investor.js');

const bcrypt = require('bcrypt'); // JS hashing library for password auth
const saltRounds = 10;


var investorRoute = router.route('/');


// GET / Return all investors  ?where = Investor Schema JSON
// POST / Put Investor JSON in body to create Return created Investor JSON
// GET /:id Get Investor by ID
// GET /:username Get Investor by Username
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
    const  curInvestor = await Investor.find({ username: req.body.username})
    const  investorEmail = await Investor.find({ email: req.body.email})

    if (curInvestor.length != 0 || investorEmail.length != 0 ) { // if a dev with the same username exists
        res.status(500).json({
          message: "An investor with that username or email already exists",
          data: []
        });
        return;
      }
         else{
        bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {
            Investor.create({ 
              name: req.body.name,
              email: req.body.email,
              username: req.body.username,
              passwordHash: hash,
              industry: 'industry' in req.body ? req.body.industry : ["Other"],
              bio: 'bio' in req.body ? req.body.bio : "",
              oldStartups: 'oldStartups' in req.body ? req.body.oldStartups : [],
              amount: 'amount' in req.body ? req.body.amount : null},
             async function (err, result) {
              if (err){
                res.status(500).json({
                  message: "Couldn't save Investor to database due to error " + err.message
                });
                          }
            else{
              result.passwordHash = undefined; // don't return passwordHash
                console.log(result);
            res.status(201).json({
              message: "Added Investor to database",
              data: result,
                })
              };
            })
            })
          }
      }
      catch (err) {
        res.status(500).json({
          message: "Couldn't create Investor due to error " + err.message
        });
        return;
      }
});

var investorRouteId = router.route('/:id');

investorRouteId.get(async function (req, res) {
  // default no where parameters
  if ((await Investor.find({_id:req.params.id})).length === 0){
    res.status(404).json({
      message: "No investor found with this id"
    });
    return;
  }

  
  await Investor.find(Investor.find({_id:req.params.id},{passwordHash:0}), async function (err, result) {
  if (err){
      res.status(500).json({message:"Couldn't find Investors due to error" + err.message});
  }
  else{
      res.status(200).json({message:"OK", data:result});
              }
      });
  })

  var investorRouteUsername = router.route('/single_investor/:username');

  investorRouteUsername.get(async function (req, res) {
    console.log(req.params.username)
    if ((await Investor.find({username:req.params.username})).length == 0){
      res.status(404).json({
        message: "No investor found with this username"
      });
      return;
    }
  
    
    await Investor.find(Investor.find({username:req.params.username},{passwordHash:0}), async function (err, result) {
    if (err){
        res.status(500).json({message:"Couldn't find Username due to error" + err.message});
    }
    else{
        res.status(200).json({message:"OK", data:result});
                }
        });
    })


  investorRouteId.put(async function(req, res) {
    if((await Investor.find({_id:req.params.id})).length ==0){
      return res.status(404).json({message:"Could not find Investor with this Id", data:{}});
    }
    prev_results = await Investor.findById(req.params.id)
    if (req.body.password== undefined){
      await Investor.findByIdAndUpdate(req.params.id, 
        {name:req.body.name?req.body.name:prev_results.name, email:req.body.email?req.body.email:prev_results.email, passwordHash:prev_results.passwordHash, username:req.body.username?req.body.username:prev_results.username, bio:req.body.bio?req.body.bio:prev_results.bio, industry:req.body.industry?req.body.industry:prev_results.industry, oldStartups: req.body.oldStartups?req.body.oldStartups: prev_results.oldStartups , amount: req.body.amount?req.body.amount:prev_results.amount}, {new:true}, async function(err, result){
          if(err){
            res.status(500).json({message:"Couldn't get investor to database due to error"+err.message});
          }
          else{
            result.passwordHash = undefined; 
            res.status(200).json({
              message: "OK",
              data: result
            });
          }
       }
      )
    }
    else{
    bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {
    await Investor.findByIdAndUpdate(req.params.id, 
      {name:req.body.name?req.body.name:prev_results.name, email:req.body.email?req.body.email:prev_results.email, passwordHash:hash, username:req.body.username?req.body.username:prev_results.username, bio:req.body.bio?req.body.bio:prev_results.bio, industry:req.body.industry?req.body.industry:prev_results.industry, oldStartups: req.body.oldStartups?req.body.oldStartups: prev_results.oldStartups , amount: req.body.amount?req.body.amount:prev_results.amount}, {new:true}, async function(err, result){
        if(err){
          res.status(500).json({message:"Couldn't get investor to database due to error"+err.message});
        }
        else{
          result.passwordHash = undefined; 
          res.status(200).json({
            message: "OK",
            data: result
          });
        }
     }
    )
    })
  }
    })

  
  investorRouteId.delete(async function (req, res) {
    if((await Investor.find({_id:req.params.id})).length ==0){
        res.status(404).json({message:"Could not find User Id", data:{}});
      }
      else{

    await Investor.deleteOne({ _id: req.params.id}, async function (err, result) {
        if (err){
            res.status(500).json({message:"Internal Server Error", "data":{}});
        }
        else{
            res.status(200).json({message:"OK", "data":{}});
                    }
    }
        );
}
});


module.exports = router;


