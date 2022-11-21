/*
 * Connect all of your endpoints together here.
 */
module.exports = function (app) {
    app.use('/api', require('./api.js'));
    // app.use('/user', require('./user.js'));
};
