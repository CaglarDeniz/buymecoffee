// Get the packages we need
var express = require('express'),
    mongoose = require('mongoose'),
    secrets = require('./config/secrets'),
    bodyParser = require('body-parser');

// static image serving
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

// const cookieParser = require('cookie-parser');
const cookiesMiddleware = require('universal-cookie-express');

const storage = multer.diskStorage({
	destination: function(req,file,cb){
		cb(null,__dirname + '/images')
	},

	filename: function(req,file,cb){
		cb(null,uuidv4() + '.png')
	}
});


// Create our Express application
var app = express();

// Use environment defined port or 4000
var port = 8080; 

// Connect to a MongoDB --> Uncomment this once you have a connection string!!
 mongoose.connect(secrets.mongo_connection,  { useNewUrlParser: true });
 const database = mongoose.connection;
 database.on('error', (error) => {
 	console.log(error);
 })
 database.once('connected',() => {
 	console.log('Database Connected');
 })

// Allow CORS so that backend and frontend could be put on different servers
var allowCrossDomain = function (req, res, next) {
	const corsWhitelist = [
        'http://localhost:3000',
        'https://caglardeniz.gitlab.io'
    ];
	if (corsWhitelist.indexOf(req.headers.origin) !== -1) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
	res.header("Access-Control-Allow-Credentials", "true");
	}
    next();
};
app.use(allowCrossDomain);


// app.use(cookiesMiddleware());

// serve images from the images directory
app.use('/images',express.static(__dirname + '/images'));

// Use the body-parser package in our application, only on api paths
app.use('/api/',bodyParser.urlencoded({
    extended: true
}));
app.use('/api/',bodyParser.json());

const upload = multer({storage: storage});
const baseImageUrl = "https://caglardeniz.gitlab.io/images/"

app.post('/upload',upload.single('photo'), (req,res) => {
	console.log(req.file);
	res.status(200).json({
		message:"Success",
		data: baseImageUrl + req.file.filename
	})
})

// Use routes as a module (see index.js)
require('./routes')(app);

// Start the server
app.listen(port);
console.log('Server running on port ' + port);
