//import {countdown} from 'countdown.js';
//import {showRoute} from 'googleMapsRoute.js';

'use strict'; 

//End of the Cinemy contest; needed for countdown
const endOfContest = new Date(Date.parse('13 Aug 2018 0:00:00 +2'));

//Needed for embedded Google Maps Route (from current location to cinemy)
const googleMapsApiKey = 'AIzaSyBDKCXijuIfpBkErHPMU8guePWKp1rxj98';
const cinemyLocation = 'offsite+Oldenkottplatz+Ahaus';

//Sets up the Tapp
chayns.ready.then(function () {
    personalizedHeadline();
    addEventListeners();
    setContestField();
});


function personalizedHeadline() {
    if (chayns.env.user.isAuthenticated) {
        var userName = chayns.env.user.name;
        var userFirstName = userName.split(" ")[0];
        document.querySelector('#titleQuestion').innerHTML = userFirstName + ', triff Tom Cruise!';
    }
}

function addEventListeners() {
    document.querySelector('#getTicketButton').addEventListener('click', function() {
        enterContest();
    });

    document.querySelector('#showRouteButton').addEventListener('click', function() {
        showRoute.init(cinemyLocation, googleMapsApiKey, '#cinemyMap');
    });
}

function setContestField() {
    if (localStorage.getItem('hasEntered') === 'true') {
        document.querySelector('#contestField').innerHTML = 'wir freuen uns auf dich...';
    }
    else {
        var display = document.querySelector('#countdown');
        countdown.init(endOfContest, display);
    }
}

function enterContest() {
    if (!chayns.env.user.isAuthenticated) {
        chayns.setAccessTokenChange(false, function() {
            //Will be called after the login
            showCommentDialog();
        });
        chayns.login();
    }
    else {
        showCommentDialog();
    }
}

function showCommentDialog() {
    chayns.dialog.input({
        title: 'Jetzt Ticket sichern',
        message: 'Gebe einen Kommentar ab, um gewinnen zu können:',
        placeholderText: 'Kommentar',
        buttons: [{
            text: 'Abschicken',
            buttonType: 1
        },{
            text: 'Abbrechen',
            buttonType: 0
        }]
        })
        .then(function (data) {
            commentHandler(data);
        });
}

function commentHandler(dialogData) {
    if (dialogData.buttonType === 1) {

        var jsonMessage = { 
            userID : chayns.env.user.id, 
            comment : dialogData.text
        };

        chayns.intercom.sendMessageToPage(jsonMessage)
        .then(function(result){
            console.log(result);           
            if(result.ok)
                localStorage.setItem('hasEntered', 'true');
                chayns.dialog.alert(userFirstName, ', danke für deinen Kommentar');
        });
    }
    
}

//TODO: place in external files
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



(function (showRoute, chayns, window, undefined) {
 
    'use strict';
 
    showRoute.init = function init(destination, apiKey, displayTarget) {
        _showRoute(destination, apiKey, displayTarget);
    };
 
    function _showRoute(destination, apiKey, displayTarget) {
        //Default location
        var origin = '0,0';
        chayns.showWaitCursor();
        chayns.getGeoLocation()
        .then(function(locationData) {
            origin = locationData.latitude + ',' + locationData.longitude;
            console.log(origin);
            var mapURL = 'https://www.google.com/maps/embed/v1/directions?key=' + apiKey + '&origin=' + origin + '&destination=' + destination + '&avoid=tolls|highways';
            console.log(mapURL);
            document.querySelector(displayTarget).src = mapURL;
            chayns.hideWaitCursor()
        })
        .catch((error) => {
            console.log(error)
        });
    }
 
})((window.showRoute = {}), chayns, window);