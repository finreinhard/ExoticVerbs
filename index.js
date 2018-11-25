var alexa = require('alexa-app');
var express = require('express');
var verbs = require('./verbs');

var express_app = express();
var app = new alexa.app('exotic-verbs');

app.launch(function (request, response) {
    response
        .say('Jetzt wirds exotisch!')
        .card('Skill gestartet', 'Jetzts wirds exotisch');
});

app.intent('random', {}, function (request, response) {
    var verb = verbs[Math.floor(Math.random() * verbs.length)];
    response
        .say('Ganz exotisch finde ich ' + verb + '.')
        .card(verb, 'Das ist ein sehr exotisches Verb.')
        .shouldEndSession(true);
});

app.intent('AMAZON.HelpIntent', {}, function (request, response) {
    response
        .say('Du kannst mich nach einem Verb fragen oder die App wieder beenden.')
        .reprompt('Was möchtest Du gerne tun?')
        .card('Hilfe', 'Frag mich nach einem Verb.')
        .shouldEndSession(false);
});

app.intent('AMAZON.StopIntent', {}, function (request, response) {
    response
        .say('Halt Stopp!')
        .card('Auf Wiedersehen', 'Ich mach jetzt auch Feierabend.');
});

app.intent('AMAZON.CancelIntent', {}, function (request, response) {
    response
        .say('Kein Problem. Deine Anfrage wurde gestoppt.')
        .reprompt('Falls ich sonst noch was für Dich tun kann, sag Bescheid')
        .card('Anfrage gestoppt', 'Falls ich sonst noch was für Dich tun kann, sag Bescheid');
});

app.post = function (request, response, type, exception) {
    if (exception) {
        return response
            .clear()
            .say('Huch, da ist was schief gelaufen!')
            .card('Huch', 'Das hätte nicht passieren dürfen! Fehlermeldung: ' + exception)
            .send();
    }
};

app.express({expressApp: express_app});

express_app.listen(8080);

module.exports = app;
