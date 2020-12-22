const Authentication = require('./controllers/authentication');
const passport = require('passport');
const csRouter = require('./routes/csRouter');
const emftRouter = require('./routes/emftRouter');
const commRouter = require('./routes/commRouter');
const dcRouter = require('./routes/dcRouter');
const acRouter = require('./routes/acRouter');
const edRouter = require('./routes/edRouter');
const networkRouter = require('./routes/networkRouter');
const mathsRouter = require('./routes/mathsRouter');
const signalRouter = require('./routes/signalRouter');
require('./services/passport');

const requireAuth = passport.authenticate('jwt', { session : false });
const requireSignin = passport.authenticate('local', { session : false });

module.exports = function(app){
    app.use('/api/cs',requireAuth,csRouter);
    app.use('/api/emft',requireAuth,emftRouter);
    app.use('/api/comm',requireAuth,commRouter);
    app.use('/api/dc',requireAuth,dcRouter);
    app.use('/api/ac',requireAuth,acRouter);
    app.use('/api/ed',requireAuth,edRouter);
    app.use('/api/network',requireAuth,networkRouter);
    app.use('/api/maths',requireAuth,mathsRouter);
    app.use('/api/signal',requireAuth,signalRouter);
    app.post('/api/login',requireSignin,Authentication.login);
    app.post('/api/signup',Authentication.signup);
}