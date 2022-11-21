// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var DevSchema = new mongoose.Schema({
	name:{type:String,required:true},
	email:{type:String,required:true},
	password:{type:String,required:true},
	industry:[String],
	bio:String,
	projectId:[String],
	photoLink:String,
	cookieString:String,
	cookieExpDate:Date
});

// Export the Mongoose model
module.exports = mongoose.model('Dev', DevSchema);
