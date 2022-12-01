const express = require('express');
const router = express.Router();

const Proj = require('../models/project.js');

var projectRoute = router.route('/');

// GET / 
// Return all projects
// ?where = Project Schema JSON
// POST /
// Put Project JSON in body to create
// Returns created Project JSON
// GET /:id
// Get Project by ID
// Returns single Project in data
// PUT /:id
// Put new Project JSON in body to update, only updates fields found in body
// Returns updated Project JSON
// DELETE /:id


projectRoute.get(function (req, res) {
res.json({ message: 'My connection string is project'  });
});

module.exports = router;
