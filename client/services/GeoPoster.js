GeoPoster = {
    addPostWithCoordinates: (localeType, postType, title, content) => {
        var tryCounter = 0;
        var coordinateResolution = setInterval(function () {
            if (Geolocation.latLng()) {
                Meteor.call('addPostWithCoordinates', Geolocation.latLng(), localeType, postType, title, content);
                clearInterval(coordinateResolution);
            }

            if (tryCounter >= 10) {
                Meteor.call('addPostWithoutCoordinates', Session.get('locationName'), localeType, postType, title, content);
                clearInterval(coordinateResolution);
            }
            tryCounter++;

        }, 1000);

    }
};