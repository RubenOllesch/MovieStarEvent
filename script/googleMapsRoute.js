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