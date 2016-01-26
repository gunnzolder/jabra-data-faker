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
        var url = "http://jabra-place.dev/jabra-faker-test.php",
            source = '.event-generator__textarea';

        displayEvent(source,'pre.data','pre.headers', chance);
        //sendRequest(url, source, chance);
    }

    var post = document.querySelector('input[name=post]');

    post.onclick = function(){
        var url = document.querySelector('#post_url').value || "http://jabra-place.dev/jabra-faker-test.php",
            data = JSON.parse(document.querySelector('pre.data').innerHTML),
            headers = JSON.parse(document.querySelector('pre.headers').innerHTML);

        sendRequest(url, data, headers, chance);
    }


    function displayEvent(source, eventQuery, headerQuery, chance){

        var availableHeaders = JSON.parse(document.querySelector("#headers_json").value),
            textarea = document.querySelector(source),
            availableEvents = JSON.parse(textarea.value),
            eventTarget = document.querySelector(eventQuery),
            headerTarget = document.querySelector(headerQuery),
            headers = chance.Header(availableHeaders),
            requestData = makeEventsArray(availableEvents, chance);

        eventTarget.innerHTML = JSON.stringify(requestData, null, 4);
        headerTarget.innerHTML = JSON.stringify(headers, null, 4);
    }

    function makeEventsArray(availableEvents, chance){
        var data = [];
        for (var i = chance.d10();i >= 0; --i) {
            data.push(chance.Event(availableEvents))
        }
        return data
    }

    function sendRequest(url, data, headers, chance){

        var http = new XMLHttpRequest();
        http.open("POST", url, true);
        http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");


        for (var header in headers) {
            http.setRequestHeader(header, headers[header])
        }

        http.send("data="+JSON.stringify(data));

        var postResult = document.querySelector('.post_result');

        http.onreadystatechange = function() {
            if(http.readyState == 4 && http.status == 200) {
                var response = JSON.parse(http.responseText);
                //console.log(JSON.parse(response));
                console.log(response);
                postResult.innerHTML = JSON.stringify(response, null, 4);
                //postResult.innerHTML = http.responseText;
                postResult.classList.add('alert-success');

            }
        }
    }

})();