'use strict';

chayns.ready.then(function () {
    var userName = "No user found. Log in to display your name here.";
    if (chayns.env.user.isAuthenticated) {
        userName = chayns.env.user.name;
        var userNameArray = userName.split(" ");
        var userFirstName = userNameArray[0];
        document.getElementById("titleQuestion").innerHTML = userFirstName + ', triff Tom Cruise!';
    }

    if(localStorage.getItem('hasEntered') === 'true') {
        document.getElementById('contestField').innerHTML == 'wir freuen uns auf dich...';
    }
});

function getTicketDialog() {
    chayns.dialog.input({
        title: 'Jetzt Ticket sichern',
        message: 'Gebe ein Kommentar ab, um gewinnen zu können:',
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
            commentHandler(JSON.stringify(data));
       });
}

function showRoute() {
    var destination = 'offsite+Oldenkottplatz+Ahaus';
    //Default location
    var origin = '0,0';
    
    chayns.getGeoLocation()
    .then(function(result) {
        var locationData = JSONStringToArray(JSON.stringify(result));
        origin = locationData[0] + ',' + locationData[1];
        console.log(origin);
    })
    .then(function(origin) {
        var mapURL = 'https://www.google.com/maps/embed/v1/directions?origin=' + origin + '&destination=' + destination + '&avoid=tolls|highways';
        document.getElementById('cinemyMap').src = mapURL;
    })
    .catch((error) => {
        console.log(error)
    });
}

function commentHandler(dialogDataString) {
    var dialogData = JSONStringToArray(dialogDataString);
    if (dialogData[0] === '1') {
        var comment = dialogData[1];
        sessionStorage.setItem('userComment', comment);
        if (chayns.env.user.isAuthenticated) {
            var JSONMessage = { userID : chayns.env.user.id, comment : sessionStorage.getItem('userComment')};
            console.log(JSONMessage);
            chayns.intercom.sendMessageToPage(JSONMessage)
            .then(function(data){            
                if(data.status == 200)
                    var hasEntered = 'true';
                    localStorage.setItem('hasEntered', hasEntered);
                    chayns.dialog.alert(userFirstName, ', danke für dein Kommentar');
            });
        }
    }
    
}

function JSONStringToArray(dataString) {
    //Removes braces
    var dataString = dataString.replace('{','');
    var dataString = dataString.replace('}','');
    //Atomizes String into array
    var data = dataString.split(',');
    //Keeps data; discards identifiers
    for (let i = 0; i < data.length; i++) {
        data[i] = data[i].split(':')[1];      
    }
    return data;
}