const express = require('express');
const bodyParser = require('body-parser');
const socketio = require('socket.io');
const path = require('path');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const User = require('./schema/user');

// User.remove({}, () => console.log('kill em all'));

const app = express();
const router = express.Router();

require('./db');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use((req, res, next) => {  // https://enable-cors.org/server_expressjs.html
  res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

// JSON Web Token
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: 'secret'
};

const strategy = new JwtStrategy(jwtOptions, (jwtPayload, done) => {
  User.findOne({ username: jwtPayload }, (err, user) => {
    if (err) return done(err);
    if (!user) return done(null, false);
    return done(null, user);
  });
});

passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());

// Restricted area
app.get('/auth', (req, res, next) => {
  passport.authenticate('jwt', (err, user) => {
    if (err) { return res.status(500).json({ result: 'error', error: err }); }
    if (!user) { return res.status(401).json({ auth: false, result: 'Unathorized' }); }
    return res.status(200).json({ auth: true, result: 'Authorized' });
  })(req, res, next);
});

// API routes
router.route('/user')
  .get((req, res) => {  // get all users
    User.find((err, users) => {
      if (err) return res.status(500).json({ result: 'error', error: err });
      return res.send(users);
    });
  })
  .post((req, res) => { // create user
    // Check if username is already taken
    User.findOne({ username: req.body.username }, (err, user) => {
      if (err) return res.status(500).json({ result: 'error', error: err });
      if (user) return res.status(409).json({ result: 'error', error: 'usernameExists' });

      // Create user
      const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        img: '',
      });

      return newUser.save((saveErr) => {
        if (saveErr) return res.status(500).json({ result: 'error', error: saveErr });
        return res.status(200).json({ result: 'success' });
      });
    });
  });

router.route('/user/avatar')
  .post((req, res) => {
    const username = jwt.verify(jwtOptions.jwtFromRequest(req), jwtOptions.secretOrKey);

    User.findOneAndUpdate({ username }, { $set: { img: req.body.img } }, { upsert: true },
      () => {
        res.status(200).json({ result: 'success' });
      }
    );
  });

router.route('/user/avatar/:username')
  .get((req, res) => {
    User.findOne({ username: req.params.username }, (err, user) => {
      if (err) return console.error(err);   // eslint-disable-line
      res.header('Content-Type', 'image/png');
      res.header('Content-Length', user.img.length);
      return res.send(user.img);
    });
  });

router.route('/user/:username')
  .get((req, res) => {
    User.findOne({ username: req.params.username }, (err, user) => {
      if (err) return console.error(err);   // eslint-disable-line
      return res.send(user);
    });
  })
  .put()
  .delete();

router.route('/user/login')
  .post((req, res) => {
    console.log(req.body.username, req.body.password);  // eslint-disable-line
    User.findOne({
      username: req.body.username,
      password: req.body.password
    }, (err, user) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (!user) {
        return res.status(401).send();
      }
      const payload = user.username;  // username is the only payload that goes into token
      const token = jwt.sign(payload, jwtOptions.secretOrKey);
      return res.status(200).json({ token });
    });
  });

app.use('/api', router);

app.use(express.static(path.join(__dirname, '../dist')));

app.get('*', (req, res) => { // SPA default route
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const server = app.listen(3000, () => {
  console.log('listening on *:3000');  // eslint-disable-line
});

const io = socketio.listen(server);   // http://stackoverflow.com/a/17697134

io.on('connection', (socket) => {
  console.log('user connected');  // eslint-disable-line
  socket.on('disconnect', () => {
    console.log('user disconnected'); // eslint-disable-line
  });
  socket.on('message', (msg) => {
    console.log(`message: ${msg}`);  // eslint-disable-line
    io.emit('message', msg);
  });
});
