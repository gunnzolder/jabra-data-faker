(function(){
    'use strict';

    angular.module('blaster',[]);
    angular.module('blaster')
        .factory('sendPieceData', sendPieceData)
        .factory('Library', Library)
        //.run('AppRun', AppRun)
        .controller('BlasterCtrl', BlasterCtrl)
        .controller('TimeLimitCtrl', TimeLimitCtrl);


    sendPieceData.$inject = ['$http', '$q'];

    function sendPieceData($http, $q){
        return {
            //send : send
            send : sendXHR
        }
        function send (url, data, headers, i){

            var deferred = $q.defer();

            if(url == 'http://gnlogging.azurewebsites.net/api/logging') {
                headers["Content-Type"] = "application/json";
                data = JSON.stringify({"Events":data});
            } else {
                headers["Content-Type"] = "application/x-www-form-urlencoded";
                data = "data="+JSON.stringify({"Events":data});
            }


            $http({
                method: 'POST',
                url: url,
                headers: headers,
                data: data
            }).then(function(data){
                deferred.resolve();
            });
            return deferred.promise;
        }

        function sendXHR(url, data, headers){

            var deferred = $q.defer();
            var http = new XMLHttpRequest(), sendData;
            http.open("POST", url, true);

            for (var header in headers) {
                http.setRequestHeader(header, headers[header])
            }

            if(url == 'http://gnlogging.azurewebsites.net/api/logging') {
                http.setRequestHeader("Content-Type", "application/json");
                sendData = JSON.stringify({"Events":data});
            } else {
                http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                sendData = "data="+JSON.stringify({"Events":data});
            }

            http.send(sendData);
            http.onload = function() {
                    deferred.resolve(http.status);
            }
            return deferred.promise;
        }


    }

    function Library(){
        return {
            Headers : JSON.parse(document.querySelector('#json-headers').innerHTML),
            Events : JSON.parse(document.querySelector('#json-events').innerHTML)
        }

    }

    //AppRun.$inject = ['$rootScope'];
    //
    //function AppRun($rootScope) {
    //}

    BlasterCtrl.$inject = ['sendPieceData', 'Library'];

    function BlasterCtrl(sendPieceData,Library){


        var vm = this;

        vm.url = "http://jabra-place.dev/jabra-faker-test.php";
        vm.Events = Library.Events;
        vm.Headers = Library.Headers;

        vm.test = function(){
            sendPieceData.send(vm.url, chance.DataPiece(vm.Events), chance.Header(vm.Headers)).then(function(data){
                console.log("asdgasdg");
                console.log(data);
            });
        }
    }

    TimeLimitCtrl.$inject = ['$rootScope','sendPieceData', 'Library', '$timeout', '$interval'];

    function TimeLimitCtrl($rootScope,sendPieceData,Library,$timeout,$interval){
        $rootScope.url = "http://gnlogging.azurewebsites.net/api/logging";



        var vm = this;

        //vm.url = "http://jabra-place.dev/jabra-faker-test.php";
        vm.url = "http://gnlogging.azurewebsites.net/api/logging";
        vm.seconds = 1;



        vm.run = function(){
            vm.requestsSent = 0;

            var loop = $interval(function(){
                vm.requestsSent++;
                sendPieceData.send($rootScope.url, chance.DataPiece(Library.Events), chance.Header(Library.Headers));
            }, 0);

            $timeout(function(){
                console.log(vm.requestsSent);
                $interval.cancel(loop);
            },vm.seconds*1000)
        };
    }




})();