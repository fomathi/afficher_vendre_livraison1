/// <reference path="_references.js" />


var mapPopupEventBinder =
{
    attachAllEvent: function () {
        $("#geolocalisation").on("click", "div.map-icone-details", function () {
            var idAnnonce = +$(this).attr("id");
            localStorage.setItem("CurrentAnnonceId", idAnnonce);
            window.open("#details", "_self");
        });
    }
}

var localisation =
{
    initialize: function (centerPoint) {
        var mapProp = {
            center: new google.maps.LatLng(centerPoint.lat, centerPoint.lng),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        return mapProp;
    },
    createMap: function (mapProp) {
        var map = new google.maps.Map(document.getElementById("geolocalisation"), mapProp);
        return map;
    },
    addMarker: function (mapProp, LatLngValue) {
        var marker = new google.maps.Marker({
            position: LatLngValue,
            map: mapProp,
            title: 'Détails',
            icon: {
                path: fontawesome.markers.HOME,
                scale: 0.4,
                strokeWeight: 0.2,
                strokeColor: 'black',
                strokeOpacity: 1,
                fillColor: '#ad1e19',
                fillOpacity: 1.0,
            }
        });
        return marker;
    },
    CustomMarker: function (marker, map, point) {
        var popup_details = '<div id="' + point.id + '" class="map-icone-details">'
                  + '<div class="map-icone-details_image"><i class="fa fa-bed fa-2x"></i></div>'
                  + '<div class="map-icone-details_text"><div class="map-icone-details_adresse">' + point.adresse + '</div><div class="map-icone-details_description">' + point.prix + '$ - ' + point.resume + '</div></div>'
                  + '<div class="map-icone-details-iconeInfo"><i class="fa fa-info-circle fa-2x"></i></div>'
                  + '</div>'

        //Customiser le marker
        marker.addListener('click', function () {
            var infowindow = new google.maps.InfoWindow({
                content: popup_details
            });
            infowindow.open(map, marker);

        });
        return marker;
    }

};

var googleMapLoadingInfo =
{

    googleMapLoad: function () {
        //ajouter ici le processus de loadage par fichier (plugin cordova)

        //ajouter ici le processus de loadage dans le cloud (pour le moment chargement depuis un js pompé dans la page)
        //Affichage du point central
        var centerPoint = $(arrayPoint).get(0);

        var mapProp = localisation.initialize(centerPoint);
        var map = localisation.createMap(mapProp);
        var LatLngValue = { lat: centerPoint.lat, lng: centerPoint.lng };
        var marker = localisation.addMarker(map, LatLngValue);
        marker = localisation.CustomMarker(marker, map, centerPoint);

        //iterates through all of point from our model 
        $.each(arrayPoint, function (index, point) {
            if (index > 0) {
                var LatLngValue = { lat: point.lat, lng: point.lng };
                var marker = localisation.addMarker(map, LatLngValue);
                marker = localisation.CustomMarker(marker, map, point);
            }
        });

        //attach event after each map load
        mapPopupEventBinder.attachAllEvent();
    }
};

function loadGMap() {
    googleMapLoadingInfo.googleMapLoad();
}

document.addEventListener('deviceready', loadGMap(), false);


