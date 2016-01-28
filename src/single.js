(function(){
    'use strict';

    displayEvent('.event-generator__textarea','pre.data','pre.headers');

    var submit = document.querySelector('input[name=generate]'),
        post = document.querySelector('input[name=post]'),
        url = "http://jabra-place.dev/jabra-faker-test.php",
        source = '.event-generator__textarea';

    submit.onclick = function(){
        console.log('click');

        displayEvent(source,'pre.data','pre.headers');
    }

    post.onclick = function(){
        var url = document.querySelector('#post_url').value || "http://jabra-place.dev/jabra-faker-test.php",
            data = JSON.parse(document.querySelector('pre.data').innerHTML),
            headers = JSON.parse(document.querySelector('pre.headers').innerHTML);

        sendRequest(url, data, headers);
    }

    function displayEvent(source, eventQuery, headerQuery){

        var availableHeaders = JSON.parse(document.querySelector("#headers_json").value),
            textarea = document.querySelector(source),
            availableEvents = JSON.parse(textarea.value),

            headers = chance.Header(availableHeaders),
            requestData = chance.DataPiece(availableEvents);

        document.querySelector(eventQuery).innerHTML = JSON.stringify(requestData, null, 4);
        document.querySelector(headerQuery).innerHTML = JSON.stringify(headers, null, 4);
    }

    function sendRequest(url, data, headers){

        var http = new XMLHttpRequest();
        http.open("POST", url, true);

        for (var header in headers) {
            http.setRequestHeader(header, headers[header])
        }

        if(url == 'http://gnlogging.azurewebsites.net/api/logging') {
            http.setRequestHeader("Content-Type", "application/json");
            http.send(JSON.stringify({"Events":data}));
        } else {
            http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            http.send("data="+JSON.stringify({"Events":data}));
        }

        var postResult = document.querySelector('.post_result');

        http.onload = function() {
            if(http.readyState == 4 && http.status == 201 || http.status == 200) {


                var response = (http.responseText)? JSON.stringify(JSON.parse(http.responseText), null, 4) : http.status+':'+http.statusText ;
                postResult.innerHTML = response;
                postResult.classList.add('alert-success');

            }
        }
    }



})();