var alexa = require('alexa-app');
var express = require('express');
var verbs = require('./verbs');

var express_app = express();
var app = new alexa.app('exotic-verbs');

function sayRandomVerb(response) {
    var verb = verbs[Math.floor(Math.random() * verbs.length)];
    response
        .say('Ganz exotisch finde ich ' + verb + '.')
        .card(verb, 'Das ist ein sehr exotisches Verb.')
        .shouldEndSession(true);
}

app.launch(function (request, response) {
    response
        .say('Jetzt wird\'s exotisch! Frag mich nach einem Verb.')
        .card('Skill gestartet', 'Jetzt wirds exotisch. Frage mich nach einem Verb.')
        .shouldEndSession(false);
});

app.intent('random', {}, function (request, response) {
    sayRandomVerb(response);
});

app.intent('AMAZON.HelpIntent', {}, function (request, response) {
    response
        .say('Du kannst mich nach einem Verb fragen oder den Skill wieder beenden.')
        .reprompt('Was möchtest Du gerne tun?')
        .card('Hilfe', 'Frag mich nach einem Verb.')
        .shouldEndSession(false);
});

app.intent('AMAZON.StopIntent', {}, function (request, response) {
    response
        .say('Halt Stopp!')
        .card('Auf Wiedersehen', 'Ich mach jetzt auch Feierabend.')
        .shouldEndSession(true);
});

app.intent('AMAZON.CancelIntent', {}, function (request, response) {
    response
        .say('Kein Problem. Deine Anfrage wurde gestoppt.')
        .reprompt('Falls ich sonst noch was für Dich tun kann, sag Bescheid')
        .card('Anfrage gestoppt', 'Falls ich sonst noch was für Dich tun kann, sag Bescheid')
        .shouldEndSession(true);
});

app.intent('AMAZON.FallbackIntent', {}, function (request, response) {
    response
        .say('Das habe ich leider nicht verstanden.')
        .card('Häh?', 'Ich verstehe nicht was du meinst.')
        .shouldEndSession(false);
});

app.post = function (request, response, type, exception) {
    if (exception) {
        return response
            .clear()
            .say('Huch, da ist was schief gelaufen!')
            .card('Huch', 'Das hätte nicht passieren dürfen! Fehlermeldung: ' + exception)
            .shouldEndSession(true)
            .send();
    }
};

app.express({expressApp: express_app});

express_app.listen(8080);

console.log('app started');

module.exports = app;
