var countdown = (function (chayns, window, undefined) {
 
    'use strict';
 
    var countdown;
 
    countdown.init = function init(data) {
        // start
    };
 
    function initCountdown(endDate, display) {
        var timeinterval = setInterval(function(){
            var timeLeft = getSecondsUntilDate(endDate);
            if (timeLeft <= 0) {
                display.innerHTML = 'Der Contest ist zuende'
            }
            else {
                var timeLeft = secondsToDate(timeLeft);
                display.innerHTML = timeLeft.days + ' Tage | ' + timeLeft.hours + ' Std. | ' + timeLeft.minutes + ' Min. | ' + timeLeft.seconds + ' Sek.';
            }
        },1000);
    }
    
    function getSecondsUntilDate(endDate) {
        var currentTime = new Date();
        var timeLeft = endDate.getTime() - currentTime.getTime();
        return Math.floor(timeLeft / 1000);
    }
    
    function secondsToDate(totalSeconds) {
        var days = Math.floor(totalSeconds / 86400); 
        var hours = Math.floor(((totalSeconds % 31536000) % 86400) / 3600);
        var minutes = Math.floor((((totalSeconds % 31536000) % 86400) % 3600) / 60);
        var seconds = Math.floor((((totalSeconds % 31536000) % 86400) % 3600) % 60);
        return {
            days: days,
            hours: hours,
            minutes: minutes,
            seconds: seconds
        }
    }
 
    return countdown;
 
})(chayns, window);


