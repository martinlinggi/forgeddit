/**
 * Created by martinlinggi on 24.10.14.
 */

forgedditApp.factory('TimeCalculationService', function() {

    function getDuration(time) {
        var millis = new Date().getTime() - time;
        var oneSec = 1000;
        var oneMin = oneSec*60;
        var oneHour = oneMin*60;
        var oneDay = oneHour*24;
        var oneWeek = oneDay*7;
        var oneMonth = oneDay*31;
        var oneYear = oneDay*365;
        if (millis < oneSec) {
            return 'just now';
        }
        else if (millis < 10 * oneSec) {  // 1 second steps
            return Math.round(millis / oneSec) + ' seconds ago';
        }
        else if (millis < oneMin) {  //  10 seconds steps
            return Math.round(millis / (oneSec * 10) ) * 10 + ' seconds ago';
        }
        else if (millis < oneMin * 10) {  // 1 minute steps
            return Math.round(millis / oneMin) + ' minutes ago';
        }
        else if (millis < oneHour) {  // 10 minute steps
            return Math.round(millis / (10 * oneMin)) * 10 + ' minutes ago';
        }
        else if (millis < oneDay) {  // 1 hour steps
            return Math.round(millis / oneHour) + ' hours ago';
        }
        else if (millis < oneWeek) {  //  1 day steps
            return Math.round(millis / oneDay) + ' days ago';
        }
        else if (millis < oneMonth) {  //  1 week steps
            return Math.round(millis / oneWeek) + ' weeks ago';
        }
        else if (millis < oneYear) {  //  1 month steps
            return Math.round(millis / oneMonth) + ' months ago';
        }
        else {  // 1 year steps
            return Math.round(millis / oneYear) + ' years ago';
        }
    }

    //public API
    return {
        getDuration: function(time) {
            return getDuration(time);
        }
    };

});