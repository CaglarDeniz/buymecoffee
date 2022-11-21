const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Task = require('../models/task.js');


var apiRoute = router.route('/');

apiRoute.get(function (req, res) {
	
res.json({ message: 'My connection string is api'});
	
});

var apiUsersRoute = router.route("/users");

apiUsersRoute.get(async function (req,res) {

	const qparams = req.query;

	const filter = 'where' in qparams ? JSON.parse(qparams.where) : {};

	// parse query parameters
	let options = {};
	// sort aggregator if sort in qparams
	if('sort' in qparams)
		options.sort = JSON.parse(qparams.sort);
	// skip aggregator if skip in qparams
	if('skip' in qparams)
		options.skip = parseInt(qparams.skip);
	// limit aggregateor if limit is in qparams, default limit none
	if('limit' in qparams)
		options.limit = parseInt(qparams.limit);
	
	// return count instead of the data if count in qparams
	
	if('select' in qparams)
		options.projection = JSON.parse(qparams.select);

	console.log(options);
	// console.log(filter);
	
	try {
		const data = await User.find(filter,null,options);
		res.json({message:"OK",data: ('count' in qparams  &&  qparams.count === "true" ? data.length : data)});
	}
	catch(error){
		res.status(500).json({message:error.message});
	}
})

apiUsersRoute.post(async function (req,res) {
	
	const query = {email: req.body.email};

	try {
		const ret = await User.find(query);
		console.log(ret);
		if(ret.length !== 0 || Object.keys(ret).length !== 0 ) { // if object is empty
			res.status(500).json({message:"Can't create user with same email"})
			return;
		}
		else {
			const user = new User({
				name: req.body.name,
				email: req.body.email,		
				pendingTasks: [],
				dateCreated: Date()
			});
			
			try{
				const userToSave = await user.save();
				res.status(201).json({message:"OK",data:userToSave});
			}
			catch(error){
				res.status(400).json({message:error.message});
			}
		}
	}
	catch(error){
		res.status(500).json({message: error.message});
	}

})

var apiUsersIdRoute = router.route("/users/:id");

apiUsersIdRoute.get(async function (req,res) {

	const query = {_id:req.params.id};
	try{
	const ret = await User.find(query);
		if(ret.length !== 0 || Object.keys(ret).length !== 0){ // if not empty object
			res.status(200).json({message:"OK",data:ret});
		}
		else{
			res.status(400).json({message:"No user found with that id"});
		}
	}
	catch(error){
		res.json({message:error.message});
	}
})

apiUsersIdRoute.put(async function (req,res) {

	const query = {_id:req.params.id};
	try{

		await User.updateOne(query,req.body, function (err,users){
			if(err){
				res.status(500).json({message:"Couldn't update user due to error" + err.message});
			}
			else{
				res.status(200).json({message:"OK",data:req.body,userlist:users});
			}
		})
	}
	catch(err){
		res.status(500).json({message:err.message});
;}

})
apiUsersIdRoute.delete(async function (req,res) {

	const query = {_id: req.params.id};

	try {
		await User.deleteOne(query, function(err,deleted){

			if(err){
				res.status(500).json({message:"Couldn't delete user due to error " + err.message})
			}
			else{
				res.status(200).json({message:"OK",data:deleted});				
			}
		})
	}
	catch(err){
		res.status(500).json({message:"Couldn't delete user due to error " + err.message})
	}

})

var apiTasksRoute = router.route("/tasks");

apiTasksRoute.get(async function (req,res) {

	const qparams = req.query;

	const filter = 'where' in qparams ? JSON.parse(qparams.where) : {};

	// parse query parameters
	let options = {};
	// sort aggregator if sort in qparams
	if('sort' in qparams)
		options.sort = JSON.parse(qparams.sort);
	// skip aggregator if skip in qparams
	if('skip' in qparams)
		options.skip = parseInt(qparams.skip);
	// limit aggregateor if limit is in qparams, default limit none
	if('limit' in qparams)
		options.limit = parseInt(qparams.limit);
	
	// return count instead of the data if count in qparams
	
	if('select' in qparams)
		options.projection = JSON.parse(qparams.select);

	// console.log(options);
	// console.log(filter);
	
	try {
		const data = await Task.find(filter,null,options);
		res.json({message:"OK",data: ('count' in qparams  &&  qparams.count === "true" ? data.length : data)});
	}
	catch(error){
		res.status(500).json({message:error.message});
	}

})

apiTasksRoute.post(async function (req,res) {
	const task = new Task({
		name: req.body.name,
		description: req.body.description,
		deadline: req.body.deadline,
		completed: req.body.completed,
		assignedUser: req.body.assignedUser,
		assignedUserName: req.body.assignedUserName,
		dateCreated: Date()
	});
	
	try{
		const taskToSave = await task.save();
		res.status(201).json({message:"OK",data:taskToSave});
	}
	catch(error){
		res.status(400).json({message:error.message});
	}

})

var apiTasksIdRoute = router.route("/tasks/:id");

apiTasksIdRoute.get(async function (req,res) {

	const query = {_id:req.params.id};
	try{
	const ret = await Task.find(query);
		if(ret.length !== 0 || Object.keys(ret).length !== 0){ // if not empty object
			res.status(200).json({message:"OK",data:ret});
		}
		else{
			res.status(400).json({message:"No user found with that id"});
		}
	}
	catch(error){
		res.json({message:error.message});
	}
})

apiTasksIdRoute.put(async function (req,res) {

	const query = {_id:req.params.id};
	try{
		await Task.updateOne(query,req.body, function (err,users){
			if(err){
				res.status(500).json({message:"Couldn't update task due to error" + err.message});
			}
			else{
				res.status(200).json({message:"OK",data:req.body,tasklist:users});
			}
		})
	}
	catch(err){
		res.status(500).json({message:err.message});
	}
})
apiTasksIdRoute.delete( async function (req,res) {

	const query = {_id: req.params.id};

	try {
		await Task.deleteOne(query, function(err,deleted){
			if(err){
				res.status(500).json({message:"Couldn't delete task due to error " + err.message})
			}
			else{
				res.status(200).json({message:"OK",data:deleted});				
			}
		})
	}
	catch(err){
		res.status(500).json({message:"Couldn't delete task due to error " + err.message})
	}

})

module.exports = router;
