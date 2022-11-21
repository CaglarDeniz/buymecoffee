const express = require('express');
const router = express.Router();

var projectRoute = router.route('/');

projectRoute.get(function (req, res) {
res.json({ message: 'My connection string is project'  });
});

module.exports = router;
