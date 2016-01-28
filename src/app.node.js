var request = require('request'),
    Chance = require('chance'),
    chance = new Chance(),

    eventsLib = require('./data/events.json'),
    headersLib = require('./data/headers.json'),
    //url = 'http://jabra-place.dev/jabra-faker-test.php';
    url = 'http://gnlogging.azurewebsites.net/api/logging';

chance.mixin({
    "Event": function (availableEvents) {

        var i = Math.floor(Math.random() * availableEvents.length),
            EventName = availableEvents[i].EventName,
            Payload;

        if (typeof availableEvents[i].Payloads != 'object') {
            var options = availableEvents[i].Options || null;
            Payload = chance[availableEvents[i].Payloads](options);
        } else {
            Payload = chance.pick(availableEvents[i].Payloads);
        }

        return {
            "UTCTimestamp": chance.date(),
            "LocalTimestamp": chance.date(),
            "EventName": EventName,
            "Payload": Payload
        };
    }
});

chance.mixin({
    "DataPiece": function (availableEvents) {
        var data = [];
        for (var i = chance.d10(); i >= 0; --i) {
            data.push(chance.Event(availableEvents))
        }
        return data
    }
});

chance.mixin({
    'SKU': function () {
        var XXXX = chance.pad(chance.natural({max: 9999}), 4);
        var XXX1 = chance.pad(chance.natural({max: 999}), 3);
        var XXX2 = chance.pad(chance.natural({max: 999}), 3);
        return XXXX + '-' + XXX1 + '-' + XXX2;
    }
});

chance.mixin({
    'Header': function (availableHeaders) {

        var os = chance.pick(Object.keys(availableHeaders.os));

        var OsVersion = chance.pick(availableHeaders.os[os]);

        return {
            "x-locale": chance.pick(availableHeaders.locale),
            "x-apikey": chance.guid(),
            "x-os": os,
            "x-OsVersion": OsVersion,
            "x-UniqueProductIdentifier": chance.SKU()
        }

    }
});

var events = chance.DataPiece(eventsLib);
var headers = chance.Header(headersLib);

sendPieceData(url, events, headers);

function sendPieceData(url, events, headers) {

    if(url == 'http://gnlogging.azurewebsites.net/api/logging') {
        headers["Content-Type"] = "application/json";
        events = {"Events":events};
    } else {
        headers["Content-Type"] = "application/x-www-form-urlencoded";
        events = "data="+JSON.stringify({"Events":events});
    }

    var options = {
        uri: 'http://gnlogging.azurewebsites.net/api/logging',
        method: 'POST',
        json: events
    };

    request(options, function (error, response, body) {
        console.log(response.statusCode);
        console.log(response.statusMessage);
    });
}

//console.log(event);
//console.log(headers);
//console.log(options);