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

app.intent('AMAZON.HelpIntent', {}, function (request, response) {
    response
        .say('Du kannst mich nach einem Verb fragen oder die App wieder beenden.')
        .reprompt('Was möchtest Du gerne tun?')
        .shouldEndSession(false);
});

app.intent('AMAZON.StopIntent', {}, function (request, response) {
    response.say('Halt Stopp!');
});

app.intent('AMAZON.CancelIntent', {}, function (request, response) {
    response.say('Kein Problem. Deine Anfrage wurde gestoppt.');
});

app.post = function (request, response, type, exception) {
    if (exception) {
        return response.clear().say('Huch, da ist was schief gelaufen').send();
    }
};

app.express({expressApp: express_app});

express_app.listen(8080);

module.exports = app;
