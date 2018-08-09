(function (countdown, chayns, window, undefined) {
 
    'use strict';
 
    countdown.init = function init(endDate, displayTarget) {
        _initCountdown(endDate, displayTarget);
    };
 
    function _initCountdown(endDate, displayTarget) {
        var timeinterval = setInterval(function(){
            var timeLeft = _getSecondsUntilDate(endDate);
            if (timeLeft <= 0) {
                display.innerHTML = 'Der Contest ist zuende'
            }
            else {
                var timeLeft = _secondsToDate(timeLeft);
                displayTarget.innerHTML = timeLeft.days + ' Tage | ' + timeLeft.hours + ' Std. | ' + timeLeft.minutes + ' Min. | ' + timeLeft.seconds + ' Sek.';
            }
        },1000);
    }
    
    function _getSecondsUntilDate(endDate) {
        var currentTime = new Date();
        var timeLeft = endDate.getTime() - currentTime.getTime();
        return Math.floor(timeLeft / 1000);
    }
    
    function _secondsToDate(totalSeconds) {
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
 
})((window.countdown = {}), chayns, window);