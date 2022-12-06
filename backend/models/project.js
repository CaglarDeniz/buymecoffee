// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var ProjectSchema = new mongoose.Schema({
	name: {type:String,required:true},
	industry:{type:String,required:true},
	description:{type:String,required:true},
	ownerId:{type:String,required:true},
	amount:Number,
	photoLink:String
});

// Export the Mongoose model
module.exports = mongoose.model('Project', ProjectSchema);


