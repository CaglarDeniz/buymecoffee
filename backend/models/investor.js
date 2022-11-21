// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var InvestorSchema = new mongoose.Schema({
	name:{type:String,required:true},
	email:{type:String,required:true},
	password:{type:String,required:true},
	industry:[String],
	bio:String,
	oldStartups:[String],
	amount:Number,
	photoLink:String,
	cookieString:String,
	cookieExpDate:Date
});

// Export the Mongoose model
module.exports = mongoose.model('Investor', InvestorSchema);

