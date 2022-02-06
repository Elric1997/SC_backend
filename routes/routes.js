module.exports = function (app) {
    app.use('/register', require('./register/register'));
};