const express = require('express');
const router = express.Router();

const Proj = require('../models/project.js');
const Dev = require('../models/developer.js');

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
       if((await Dev.findById(req.body.ownerId)).length==0){
        res.status(404).json({
          message: "No project found with this ID"
        });
        return
       }
        try{
                Proj.create({ 
                  name: req.body.name,
                  industry: req.body.industry,
                  description: req.body.description,
                  ownerId: req.body.ownerId,
                  amount: 'amount' in req.body ? req.body.amount : null,
                  photoLink: req.body.photoLink?req.body.photoLink :"https://storage.googleapis.com/buymecoffee-storage/1.png"
                },
                 async function (err, result) {
                  if (err){
                    res.status(500).json({
                      message: "Couldn't save Project to database due to error " + err.message
                    });
                              }
                else{
                    console.log(result);
                    projectIdList = (await Dev.findById(req.body.ownerId)).projectId
                    if (!projectIdList.includes(result['_id'])){
                    projectIdList.push(result['_id'])
                    }
                    IndustryList = (await Dev.findById(req.body.ownerId)).industry
                    if (!IndustryList.includes(req.body.industry)){
                      IndustryList.push(req.body.industry)
                    }
                    await Dev.findByIdAndUpdate(req.body.ownerId,{projectId:projectIdList, industry:IndustryList}, {new:true})
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

    projectRouteId.put(async function(req, res) {
            if((await Proj.find({_id:req.params.id})).length ==0){
              return res.status(404).json({message:"Could not find Project with this Id", data:{}});
            }
            // console.log(await Dev.findById(req.body.ownerId))
            if(req.body.ownerId != undefined && (await Dev.findById(req.body.ownerId)).length ==0 ){
              return res.status(404).json({message:"Could not find owner with this Id", data:{}});
            }
            prev_results = await Proj.findById(req.params.id)
            await Proj.findByIdAndUpdate(req.params.id, 
             {name:req.body.name?req.body.name:prev_results.name, description:req.body.description?req.body.description:prev_results.description, industry:req.body.industry?req.body.industry:prev_results.industry,ownerId:req.body.ownerId, amount: req.body.amount?req.body.amount:prev_results.amount, photoLink: req.body.photoLink?req.body.photoLink :prev_results.photoLink
            }, {new:true}, async function(err, result){
                if(err){
                  res.status(500).json({message:"Couldn't get project to database due to error"+err.message});
                }
                else{
                  //remove from old owner
                  projectIdOld = (await Dev.findById(prev_results.ownerId)).projectId
                  console.log(projectIdOld)
                  if(projectIdOld.includes(result['_id'])){
                  // console.log("REACH HERE")
                  projectIdOld = projectIdOld.remove(result['_id'])
                }
                console.log(projectIdOld)
                  await Dev.findByIdAndUpdate(prev_results.ownerId, {projectId:projectIdOld})
                  // add to new owner
                  projectIdList = (await Dev.findById(req.body.ownerId)).projectId
                  if (!projectIdList.includes(result['_id'])){
                  projectIdList.push(result['_id'])
                  }
                  await Dev.findByIdAndUpdate(req.body.ownerId,{projectId:projectIdList}, {new:true})
                  res.status(200).json({
                    message: "OK",
                    data: result
                  });
                }
             }
            )
            })

     
    projectRouteId.delete(async function (req, res) {
    if((await Proj.find({_id:req.params.id})).length ==0){
        res.status(404).json({message:"Could not find Project Id", data:{}});
      }
      else{

    await Proj.deleteOne({ _id: req.params.id}, async function (err, result) {
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
