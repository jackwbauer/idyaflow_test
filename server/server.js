const express = require("express");
const bodyParser = require("body-parser");
const Twit = require('twit');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const passport = require('passport');
const cors = require('cors')
const request = require('request');
require('dotenv').config();
const PORT = 3001;

const twitter = new Twit({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_SECRET_KEY,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL: true,     // optional - requires SSL certificates to be valid.
})

const app = express();
const router = express.Router();

var corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

app.post('/search', function (req, res) {
    console.log(`post: ${JSON.stringify(req.body)}`);
})

app.get('/tweets', function (req, res) {
    const search = req.body;
    var results;
    console.log(`get: ${JSON.stringify(search)}`);
    // perform search here
    twitter.get('search/tweets', { q: 'banana since:2011-07-11', count: 100 }, function (err, data, response) {
        results = data;
        // console.log(data);
    })
        .then(res.send({results}));
    // console.log(results);
})

twitter.get('account/verify_credentials', { skip_status: true })
    .catch(function (err) {
        console.log('caught error', err.stack)
    })
    .then(function (result) {
        // `result` is an Object with keys "data" and "resp".
        // `data` and `resp` are the same objects as the ones passed
        // to the callback.
        // See https://github.com/ttezel/twit#tgetpath-params-callback
        // for details.

        // console.log('data', result.data);
    })

// Following code is from the react-twitter-auth npm package's github example

var createToken = function (auth) {
    return jwt.sign({
        id: auth.id
    }, 'my-secret',
        {
            expiresIn: 60 * 120
        });
};

var generateToken = function (req, res, next) {
    req.token = createToken(req.auth);
    return next();
};

var sendToken = function (req, res) {
    res.setHeader('x-auth-token', req.token);
    return res.status(200).send(JSON.stringify(req.user));
};

router.route('/auth/twitter/reverse')
    .post(function (req, res) {
        request.post({
            url: 'https://api.twitter.com/oauth/request_token',
            oauth: {
                oauth_callback: "http%3A%2F%2Flocalhost%3A3000%2Ftwitter-callback",
                consumer_key: twitterConfig.consumerKey,
                consumer_secret: twitterConfig.consumerSecret
            }
        }, function (err, r, body) {
            if (err) {
                return res.send(500, { message: err.message });
            }


            var jsonStr = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
            res.send(JSON.parse(jsonStr));
        });
    });

router.route('/auth/twitter')
    .post((req, res, next) => {
        request.post({
            url: `https://api.twitter.com/oauth/access_token?oauth_verifier`,
            oauth: {
                consumer_key: twitterConfig.consumerKey,
                consumer_secret: twitterConfig.consumerSecret,
                token: req.query.oauth_token
            },
            form: { oauth_verifier: req.query.oauth_verifier }
        }, function (err, r, body) {
            if (err) {
                return res.send(500, { message: err.message });
            }

            const bodyString = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
            const parsedBody = JSON.parse(bodyString);

            req.body['oauth_token'] = parsedBody.oauth_token;
            req.body['oauth_token_secret'] = parsedBody.oauth_token_secret;
            req.body['user_id'] = parsedBody.user_id;

            next();
        });
    }, passport.authenticate('twitter-token', { session: false }), function (req, res, next) {
        if (!req.user) {
            return res.send(401, 'User Not Authenticated');
        }

        // prepare token for API
        req.auth = {
            id: req.user.id
        };

        return next();
    }, generateToken, sendToken);

//token handling middleware
var authenticate = expressJwt({
    secret: 'my-secret',
    requestProperty: 'auth',
    getToken: function (req) {
        if (req.headers['x-auth-token']) {
            return req.headers['x-auth-token'];
        }
        return null;
    }
});

var getCurrentUser = function (req, res, next) {
    User.findById(req.auth.id, function (err, user) {
        if (err) {
            next(err);
        } else {
            req.user = user;
            next();
        }
    });
};

var getOne = function (req, res) {
    var user = req.user.toObject();

    delete user['twitterProvider'];
    delete user['__v'];

    res.json(user);
};

router.route('/auth/me')
    .get(authenticate, getCurrentUser, getOne);

app.use('/api/v1', router);