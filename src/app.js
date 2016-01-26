(function(){
    'use strict';



    displayEvent('pre.result');

    var submit = document.querySelector('input[name=generate]');
    submit.onclick = function(){
        displayEvent('pre.result');
    }

    function displayEvent(target){
        var textarea = document.querySelector('.event-generator__textarea'),
            events = JSON.parse(textarea.innerHTML);
        var pre = document.querySelector(target),
            event = generateEvent(events);

        pre.innerHTML = JSON.stringify(event, null, 4);
    }

    function generateEvent(events) {
        var chance = new Chance();

        var Event = function(){
            this.UTCTimestamp = chance.date();
            this.LocalTimestamp = chance.date();
        }

        var event = new Event();

        var i = Math.floor(Math.random()*events.length);
        event.EventName = events[i].EventName;

        if(typeof events[i].Payloads != 'object') {
            var options = events[i].Options || null;

            event.Payload = chance[events[i].Payloads](options);
        } else {
            event.Payload = events[i].Payloads[Math.floor(Math.random()*events[i].Payloads.length)]
        }
        console.log(event);

        return event
    }


})();
