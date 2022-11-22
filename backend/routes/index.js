/*
 * Connect all of your endpoints together here.
 */
module.exports = function (app) {
    app.use('/api/project', require('./project.js'));
    app.use('/api/developer', require('./developer.js'));
    app.use('/api/investor', require('./investor.js'));
		app.use('/api/auth_developer',require('./auth_dev.js'));
		app.use('/api/auth_investor',require('./auth_investor.js'));
};
