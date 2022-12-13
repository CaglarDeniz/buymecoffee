// Get the packages we need
var express = require('express'),
  mongoose = require('mongoose'),
  secrets = require('./config/secrets'),
  bodyParser = require('body-parser');

// static image serving
const multer = require('multer');
const maxSize = 2 * 1024 * 1024;
const {
  Storage
} = require('@google-cloud/storage');
const util = require('util');
const {
  v4: uuidv4
} = require('uuid');

// const cookieParser = require('cookie-parser');
const cookiesMiddleware = require('universal-cookie-express');

let storageMiddleware = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: maxSize
  },
}).single("photo");

let processFile = util.promisify(storageMiddleware);
// Instantiate a storage client with credentials
const storage = new Storage({
  keyFilename: "config/gcp.json"
});
const bucket = storage.bucket("buymecoffee-storage");

// Create our Express application
var app = express();

// Use environment defined port or 4000
var port = 8080;

// Connect to a MongoDB --> Uncomment this once you have a connection string!!
mongoose.connect(secrets.mongo_connection, {
  useNewUrlParser: true
});
const database = mongoose.connection;
database.on('error', (error) => {
  console.log(error);
})
database.once('connected', () => {
  console.log('Database Connected');
})

// Allow CORS so that backend and frontend could be put on different servers
var allowCrossDomain = function(req, res, next) {
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
app.use('/images', express.static(__dirname + '/images'));

// Use the body-parser package in our application, only on api paths
app.use('/api/', bodyParser.urlencoded({
  extended: true
}));
app.use('/api/', bodyParser.json());

const upload = multer({
  storage: storage
});
const baseImageUrl = ""

app.post('/upload',async (req, res) => {
  try {
    await processFile(req, res);

    if (!req.file) {
      return res.status(500).json({
        message: "Please upload a file under the field photo"
      });
    }

    // Create a new blob in the bucket
    const newFilename = uuidv4() + '.png';
    const blob = bucket.file(newFilename);
    const blobStream = blob.createWriteStream({
			contentType: 'image/png'
    });

    blobStream.on('error', (err) => {
      res.status(500).json({
        message: err.message
      });
    })

		let publicURL ;
    blobStream.on("finish", async (data) => {
      // Create URL for direct file access
      publicURL = util.format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      );
			res.status(200).json({
				message: "Uploaded the file succesfully " + newFilename ,
				url: publicURL
			});
    }).end(req.file.buffer);
  } catch(err){
		if(err.code == "LIMIT_FILE_SIZE"){
			return res.status(500).json({
				message: "File size cannot be larger than 2MB",
				data: null
			})
		}
		res.status(500).json({
			message: "Could not upload the file : " + err.message,
			data: null
		})
	}

});


// Use routes as a module (see index.js)
require('./routes')(app);

// Start the server
app.listen(port);
console.log('Server running on port ' + port);
