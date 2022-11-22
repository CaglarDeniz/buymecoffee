const express = require('express');
const router = express.Router();

var devRoute = router.route('/');

devRoute.get(function (req, res) {
	res.json({ message: 'My connection string is dev'  });
});

devRoute.post(function (res,req){
	res.json({message: 'Post request to dev'});	
})

var devIdRoute = router.route('/:id');

devIdRoute.get(function(res,req){
	res.json({message: 'Get request to dev id'});	
})

devIdRoute.post(function(res,req){
	res.json({message: 'Post request to dev id'});
})

devIdRoute.delete(function(res,req){
	res.json({message: 'Delete request to dev id'});
})

module.exports = router;
