const express = require('express');
const router = express.Router();

var devRoute = router.route('/');

devRoute.get(function (req, res) {
res.json({ message: 'My connection string is dev'  });
});

module.exports = router;
