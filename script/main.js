'use strict'; 

const endOfContest = new Date(Date.parse('13 Aug 2018 0:00:00 +2'));
const googleMapsApiKey = 'AIzaSyBDKCXijuIfpBkErHPMU8guePWKp1rxj98';

chayns.ready.then(function () {
    if (chayns.env.user.isAuthenticated) {
        var userName = chayns.env.user.name;
        var userFirstName = userName.split(" ")[0];
        document.querySelector('#titleQuestion').innerHTML = userFirstName + ', triff Tom Cruise!';
    }

    document.querySelector('#getTicketButton').addEventListener('click', function() {
        enterContest();
    });

    document.querySelector('#showRouteButton').addEventListener('click', function() {
        showRoute();
    });

    if (localStorage.getItem('hasEntered') === 'true') {
        document.querySelector('#contestField').innerHTML = 'wir freuen uns auf dich...';
    }
    else {
        var display = document.querySelector('#countdown');
        initCountdown(endOfContest, display);
    }
});

function enterContest() {
    if (!chayns.env.user.isAuthenticated) {
        chayns.setAccessTokenChange(false, function() {
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
        console.log(jsonMessage);

        chayns.intercom.sendMessageToPage(jsonMessage)
        .then(function(result){
            console.log(result);           
            if(result.ok)
                localStorage.setItem('hasEntered', 'true');
                chayns.dialog.alert(userFirstName, ', danke für deinen Kommentar');
        });
    }
    
}

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

function showRoute() {
    var destination = 'offsite+Oldenkottplatz+Ahaus';
    //Default location
    var origin = '0,0';
    chayns.showWaitCursor();
    chayns.getGeoLocation()
    .then(function(locationData) {
        origin = locationData.latitude + ',' + locationData.longitude;
        console.log(origin);
        var mapURL = 'https://www.google.com/maps/embed/v1/directions?key=' + googleMapsApiKey + '&origin=' + origin + '&destination=' + destination + '&avoid=tolls|highways';
        console.log(mapURL);
        document.querySelector('#cinemyMap').src = mapURL;
        chayns.hideWaitCursor()
    })
    .catch((error) => {
        console.log(error)
    });
}