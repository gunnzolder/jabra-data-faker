(function(){
    window.Event = function(){
        var chance = new Chance();

        console.log(chance);

        this.UTCTimestamp = chance.date();
        this.LocalTimestamp = chance.date();
    }
})();