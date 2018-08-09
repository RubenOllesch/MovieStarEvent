(function (tappProject, chayns, window, apiKey, destination, undefined) {
 
    'use strict';

    const googleMapsApiKey = 'AIzaSyBDKCXijuIfpBkErHPMU8guePWKp1rxj98';
 
    tappProject.init = function init(data) {
        // start
    };
 
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
 
})((window.tappProject = {}), chayns, window);