(function(){
    'use strict';
    var chance = new Chance();

    chance.mixin({
        "Event" : function(availableEvents) {

            var i = Math.floor(Math.random()*availableEvents.length),
                EventName = availableEvents[i].EventName,
                Payload;

            if(typeof availableEvents[i].Payloads != 'object') {
                var options = availableEvents[i].Options || null;
                Payload = chance[availableEvents[i].Payloads](options);
            } else {
                Payload = chance.pick(availableEvents[i].Payloads);
            }

            return {
                "UTCTimestamp" : chance.date(),
                "LocalTimestamp" : chance.date(),
                "EventName" : EventName,
                "Payload" : Payload
            };
        }
    });

    chance.mixin({
        'SKU': function() {
            var XXXX = chance.pad(chance.natural({max: 9999}), 4);
            var XXX1 = chance.pad(chance.natural({max: 999}), 3);
            var XXX2 = chance.pad(chance.natural({max: 999}), 3);
            return XXXX+'-'+XXX1+'-'+XXX2 ;
        }
    });

    chance.mixin({
        'Header': function(availableHeaders) {

            var os = chance.pick(Object.keys(availableHeaders.os));

            var OsVersion = chance.pick(availableHeaders.os[os]);

            return {
                "x-locale" : chance.pick(availableHeaders.locale),
                "x-apikey" : chance.guid(),
                "x-os" : os,
                "x-OsVersion" : OsVersion,
                "x-UniqueProductIdentifier" : chance.SKU()
            }

        }
    });

    displayEvent('.event-generator__textarea','pre.data','pre.headers', chance);

    var submit = document.querySelector('input[name=generate]');
    submit.onclick = function(){
        displayEvent('.event-generator__textarea','pre.data','pre.headers', chance);
    }


    function displayEvent(source, eventQuery, headerQuery, chance){

        var availableHeaders = JSON.parse(document.querySelector("#headers_json").value);

        var textarea = document.querySelector(source),
            availableEvents = JSON.parse(textarea.value),
            eventTarget = document.querySelector(eventQuery),
            headerTarget = document.querySelector(headerQuery),
            headers = JSON.stringify(chance.Header(availableHeaders), null, 4);


        var requestData = JSON.stringify(pushData(availableEvents, chance), null, 4);

        eventTarget.innerHTML = requestData;
        headerTarget.innerHTML = headers;
    }

    function pushData(availableEvents, chance){
        var data = [];
        for (var i = chance.d10();i >= 0; --i) {
            data.push(chance.Event(availableEvents))
        }
        return data
    }


})();
