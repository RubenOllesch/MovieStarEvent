'use strict';

chayns.ready.then(function () {
    if (chayns.env.user.isAuthenticated) {
        var userName = chayns.env.user.name;
        var userFirstName = userName.split(" ")[0];
        document.getElementById("titleQuestion").innerHTML = userFirstName + ', triff Tom Cruise!';
    }

    if(localStorage.getItem('hasEntered') === 'true') {
        document.getElementById('contestField').innerHTML = 'wir freuen uns auf dich...';
    }
});

function getTicketDialog() {
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
        var comment = dialogData.text;
        sessionStorage.setItem('userComment', comment);
        if (chayns.env.user.isAuthenticated) {
            var JSONMessage = { 
                userID : chayns.env.user.id, 
                comment : sessionStorage.getItem('userComment')
            };
            console.log(JSONMessage);
            chayns.intercom.sendMessageToPage(JSONMessage)
            .then(function(result){
                console.log(result);           
                if(result.oks)
                    localStorage.setItem('hasEntered', true);
                    chayns.dialog.alert(userFirstName, ', danke für deinen Kommentar');
            });
        }
    }
    
}

function showRoute() {
    var destination = 'offsite+Oldenkottplatz+Ahaus';
    //Default location
    var origin = '0,0';
    
    chayns.getGeoLocation()
    .then(function(locationData) {
        origin = locationData.latitude + ',' + locationData.longitude;
        console.log(origin);
        var mapURL = 'https://www.google.com/maps/embed/v1/directions?origin=' + origin + '&destination=' + destination + '&avoid=tolls|highways';
        document.getElementById('cinemyMap').src = mapURL;
    })
    .catch((error) => {
        console.log(error)
    });
}