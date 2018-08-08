'use strict';
chayns.ready.then(function () {
    var userName = "No user found. Log in to display your name here.";
    if (chayns.env.user.isAuthenticated) {
        userName = chayns.env.user.name;
        var userNameArray = userName.split(" ");
        var userFirstName = userNameArray[0];
        document.getElementById("titleQuestion").innerHTML = userFirstName + ', triff Tom Cruise!';
    }
});

function showRoute() {
    var destination = 'offsite+Oldenkottplatz+Ahaus';
    //Default location
    var origin = '0,0';
    
    chayns.getGeoLocation()
    .then(function(result) {
        origin = getOrigin(JSON.stringify(result));
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

function getOrigin(locationDataString) {
    //Removes braces
    var locationDataString = locationDataString.replace('{','');
    var locationDataString = locationDataString.replace('}','');
    //Splits in lat, long, speed
    var locationData = locationDataString.split(',');
    //Removes indentifiers; keeps data (numbers)
    for (let i = 0; i < locationData.length; i++) {
        locationData[i] = locationData[i].split(':')[1];      
    }
    //Build new String
    var origin = locationData[0] + ',' + locationData[1];
    return origin;
}