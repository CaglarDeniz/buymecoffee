const express = require('express');
const router = express.Router();

var investorRoute = router.route('/');

investorRoute.get(function (req, res) {
res.json({ message: 'My connection string is investor'  });
});

module.exports = router;
