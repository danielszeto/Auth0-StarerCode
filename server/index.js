var express = require('express');
var app = express();
var jwt = require('express-jwt');
var cors = require('cors');
var OAuth = require('../secrets');

app.use(cors());

var authCheck = jwt({
	secret: new Buffer(OAuth.auth.secret, 'base64'),
	audience: OAuth.auth.audience
});

app.get('/api/public', function(req, res) {
	res.json({message: "Hello from a public endpoint. you dont need to be authenticated"});
});

app.get('/api/private', authCheck, function(req, res) {
	res.json({message: "Hello from a private endpoint. you DO need to be authenticated"});
});

app.listen(3000);
console.log('Listening on localhost:3000');