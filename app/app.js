(function(){
    'use strict';

    var availableHeaders = JSON.parse(document.querySelector('#headers_json').innerHTML),
        availableEvents = JSON.parse(document.querySelector('#events_json').innerHTML),
        start = document.querySelector('input[name=start]'),
        stop = document.querySelector('input[name=stop]'),
        interval;

    start.onclick = function(){
        var i = 0;
        var url = "http://jabra-place.dev/jabra-faker-test.php";

        interval = setInterval(function(){
            sendPieceData(url, chance.DataPiece(availableEvents), chance.Header(availableHeaders), i);
            i++;
        }, 5);

    }

    stop.onclick = function(){
        clearInterval(interval);
    }

    function sendPieceData(url, data, headers, i){

        var http = new XMLHttpRequest();
        http.open("POST", url, true);
        http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        for (var header in headers) {
            http.setRequestHeader(header, headers[header])
        }

        http.send("data="+JSON.stringify(data));
        http.onload = function() {
            if(http.readyState == 4 && http.status == 200) {
                console.log(i);
            }
        }
    }

})();