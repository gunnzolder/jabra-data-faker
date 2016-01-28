(function(){
    'use strict';

    var availableHeaders = JSON.parse(document.querySelector('#json-headers').innerHTML),
        availableEvents = JSON.parse(document.querySelector('#json-events').innerHTML),
        startInterval = document.querySelector('input[name=start-interval]'),
        stopInterval = document.querySelector('input[name=stop-interval]'),
        timeLimitForm = document.querySelector('form[name="time-limit"]'),
        requestsLimitForm = document.querySelector('form[name="requests-limit"]');
        //url = 'http://gnlogging.azurewebsites.net/api/logging';
        //url = "http://jabra-place.dev/jabra-faker-test.php";
        //url = document.querySelector('#post-url').value;

    var interval, requestsSent, threshold;

    requestsLimitForm.onsubmit = function(){
        var url = document.querySelector('#post-url').value;
        var requests = threshold = this.querySelector('input[type=number]').value;
        var messageBox = document.querySelector('.requests-limit-result');
        messageBox.innerHTML = 'Sending requests...';
        messageBox.classList.add('alert-warning');

        requestsSent = 0;

        for (;requests>=1;requests--) {
            (function(i){
                requestsSent++;
                sendPieceData(url, chance.DataPiece(availableEvents), chance.Header(availableHeaders), requestsSent);
            })(requests);
        }

        return false
    };

    timeLimitForm.onsubmit = function(){
        var url = document.querySelector('#post-url').value;

        var timeout = this.querySelector('input[type=number]').value*1000;
        var messageBox = document.querySelector('.time-limit-result');
        messageBox.innerHTML = 'Sending requests...';
        messageBox.classList.add('alert-warning');

        requestsSent = 0;
        threshold = false;

        var loop = setInterval(function(){
            requestsSent++;
            sendPieceData(url, chance.DataPiece(availableEvents), chance.Header(availableHeaders), requestsSent);
        }, 0);

        setTimeout(function(){


            clearInterval(loop);
            var message = 'Success. Requests sent: '+requestsSent,
                messageBox = document.querySelector('.alert-warning');
            messageBox.classList.remove('alert-warning');
            messageBox.classList.add('alert-success');
            messageBox.innerHTML = message;
        }, timeout);

        return false
    };




    startInterval.onclick = function(){
        var url = document.querySelector('#post-url').value;


        var intervalValue = document.querySelector('#interval-ms').value;

        requestsSent = 0;

        var messageBox = document.querySelector('.interval-result');

        messageBox.innerHTML = 'Sending requests...';
        messageBox.classList.add('alert-warning');


        interval = setInterval(function(){
            sendPieceData(url, chance.DataPiece(availableEvents), chance.Header(availableHeaders), requestsSent);
            requestsSent++;
        }, intervalValue);
    }


    stopInterval.onclick = function(){
        clearInterval(interval);

        var message = 'Success. Requests sent: '+requestsSent,
            messageBox = document.querySelector('.interval-result');
        messageBox.classList.remove('alert-warning');
        messageBox.classList.add('alert-success');
        messageBox.innerHTML = message;
    }


    function makeEvent(availableHeaders,availableEvents){
        return {
            headers : chance.Header(availableHeaders),
            requestData : chance.DataPiece(availableEvents)
        }
    }


    function sendPieceData(url, data, headers, i){

        var http = new XMLHttpRequest();
        http.open("POST", url, true);
        http.setRequestHeader("Content-Type", "application/json");

        for (var header in headers) {
            http.setRequestHeader(header, headers[header])
        }
        //console.log(data);

        http.send(JSON.stringify({"Events":data}));

        http.onload = function() {
            if(http.readyState == 4 && http.status == 201) {
                //console.log(i);
                //console.log(JSON.parse(http.responseText));
                if(i==threshold || threshold == true) {
                    console.log('DONE!');
                    console.log('Total requests sent: '+requestsSent);

                    var message = 'Success. Requests sent: '+requestsSent,
                        messageBox = document.querySelector('.alert-warning');
                    messageBox.classList.remove('alert-warning');
                    messageBox.classList.add('alert-success');
                    messageBox.innerHTML = message;
                }
            }
        }
    }


})();