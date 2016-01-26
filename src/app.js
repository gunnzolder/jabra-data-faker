(function(){
    'use strict';
    var chance = new Chance();

    chance.mixin({
        "Event" : function(events) {

            var i = Math.floor(Math.random()*events.length),
                EventName = events[i].EventName,
                Payload;

            if(typeof events[i].Payloads != 'object') {
                var options = events[i].Options || null;
                Payload = chance[events[i].Payloads](options);
            } else {
                Payload = chance.pick(events[i].Payloads);
            }

            return {
                "UTCTimestamp" : chance.date(),
                "LocalTimestamp" : chance.date(),
                "EventName" : EventName,
                "Payload" : Payload
            };
        }
    });


    //var availableHeaders = {
    //    "locale" : ["af-ZA", "am-ET", "ar-AE", "ar-BH", "ar-DZ", "ar-EG", "ar-IQ", "ar-JO", "ar-KW", "ar-LB", "ar-LY", "ar-MA", "arn-CL", "ar-OM", "ar-QA", "ar-SA", "ar-SY", "ar-TN", "ar-YE", "as-IN", "az-Cyrl-AZ", "az-Latn-AZ", "ba-RU", "be-BY", "bg-BG", "bn-BD", "bn-IN", "bo-CN", "br-FR", "bs-Cyrl-BA", "bs-Latn-BA", "ca-ES", "co-FR", "cs-CZ", "cy-GB", "da-DK", "de-AT", "de-CH", "de-DE", "de-LI", "de-LU", "dsb-DE", "dv-MV", "el-GR", "en-029", "en-AU", "en-BZ", "en-CA", "en-GB", "en-IE", "en-IN", "en-JM", "en-MY", "en-NZ", "en-PH", "en-SG", "en-TT", "en-US", "en-ZA", "en-ZW", "es-AR", "es-BO", "es-CL", "es-CO", "es-CR", "es-DO", "es-EC", "es-ES", "es-GT", "es-HN", "es-MX", "es-NI", "es-PA", "es-PE", "es-PR", "es-PY", "es-SV", "es-US", "es-UY", "es-VE", "et-EE", "eu-ES", "fa-IR", "fi-FI", "fil-PH", "fo-FO", "fr-BE", "fr-CA", "fr-CH", "fr-FR", "fr-LU", "fr-MC", "fy-NL", "ga-IE", "gd-GB", "gl-ES", "gsw-FR", "gu-IN", "ha-Latn-NG", "he-IL", "hi-IN", "hr-BA", "hr-HR", "hsb-DE", "hu-HU", "hy-AM", "id-ID", "ig-NG", "ii-CN", "is-IS", "it-CH", "it-IT", "iu-Cans-CA", "iu-Latn-CA", "ja-JP", "ka-GE", "kk-KZ", "kl-GL", "km-KH", "kn-IN", "kok-IN", "ko-KR", "ky-KG", "lb-LU", "lo-LA", "lt-LT", "lv-LV", "mi-NZ", "mk-MK", "ml-IN", "mn-MN", "mn-Mong-CN", "moh-CA", "mr-IN", "ms-BN", "ms-MY", "mt-MT", "nb-NO", "ne-NP", "nl-BE", "nl-NL", "nn-NO", "nso-ZA", "oc-FR", "or-IN", "pa-IN", "pl-PL", "prs-AF", "ps-AF", "pt-BR", "pt-PT", "qut-GT", "quz-BO", "quz-EC", "quz-PE", "rm-CH", "ro-RO", "ru-RU", "rw-RW", "sah-RU", "sa-IN", "se-FI", "se-NO", "se-SE", "si-LK", "sk-SK", "sl-SI", "sma-NO", "sma-SE", "smj-NO", "smj-SE", "smn-FI", "sms-FI", "sq-AL", "sr-Cyrl-BA", "sr-Cyrl-CS", "sr-Cyrl-ME", "sr-Cyrl-RS", "sr-Latn-BA", "sr-Latn-CS", "sr-Latn-ME", "sr-Latn-RS", "sv-FI", "sv-SE", "sw-KE", "syr-SY", "ta-IN", "te-IN", "tg-Cyrl-TJ", "th-TH", "tk-TM", "tn-ZA", "tr-TR", "tt-RU", "tzm-Latn-DZ", "ug-CN", "uk-UA", "ur-PK", "uz-Cyrl-UZ", "uz-Latn-UZ", "vi-VN", "wo-SN", "xh-ZA", "yo-NG", "zh-CN", "zh-HK", "zh-MO", "zh-SG", "zh-TW", "zu-ZA"],
    //    "os" : {
    //        "Xbox" : ["(not set)"],
    //        "Windows Phone" : ["8.1"],
    //        "Windows" : ["7", "10", "8.1", "XP", "Vista", "8", "(not set)", "Server 2003", "2000"],
    //        "Macintosh" : ["Intel 10.11", "Intel 10.10", "Intel 10.9", "Intel 10.6", "Intel 10.7", "Intel 10.8", "Intel 10.5", "PPC 10.5", "Intel 10.4", "PPC10.4"],
    //        "Linux" : ["x86_64", "i686", "(not set)", "zvav"],
    //        "iOS" : ["9.2", "8.4.1", "9.2.1", "8.3", "9.1", "7.1.1", "8.4", "8.1.2", "8.1.3", "8.0.2"],
    //        "Chrome OS" : ["x86_64"],
    //        "BlackBerry" : ["(not set)"],
    //        "Android" : ["5.1.1", "4.4.2", "5.0", "5.0.1", "5.0.2", "4.3", "4.1.2", "(not set)", "4.2.2", "5.1"],
    //        "(not set)" : ["(not set)"]
    //    }
    //}



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

    displayEvent('.event-generator__textarea','pre.event','pre.headers', chance);

    var submit = document.querySelector('input[name=generate]');
    submit.onclick = function(){
        displayEvent('.event-generator__textarea','pre.event','pre.headers', chance);
    }


    function displayEvent(source, eventQuery, headerQuery, chance){

        var availableHeaders = JSON.parse(document.querySelector("#headers_json").value);

        var textarea = document.querySelector(source),
            events = JSON.parse(textarea.value),
            eventTarget = document.querySelector(eventQuery),
            headerTarget = document.querySelector(headerQuery),
            event = JSON.stringify(chance.Event(events), null, 4),
            headers = JSON.stringify(chance.Header(availableHeaders), null, 4);

        eventTarget.innerHTML = event;
        headerTarget.innerHTML = headers;
    }


})();
