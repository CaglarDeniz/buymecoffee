const express = require('express');
const router = express.Router();

var userRoute = router.route('/');

userRoute.get(function (req, res) {
res.json({ message: 'My connection string is user'  });
});

module.exports = router;
