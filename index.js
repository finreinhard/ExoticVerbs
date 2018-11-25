var alexa = require('alexa-app');
var express = require('express');
var verbs = require('./verbs');

var express_app = express();
var app = new alexa.app('exotic-verbs');

app.intent('random', {}, function (request, response) {
    response
        .say('Ganz exotisch finde ich ' + verbs[Math.floor(Math.random() * verbs.length)])
        .shouldEndSession(true);
});

app.express({expressApp: express_app});

express_app.listen(8080);

module.exports = app;
