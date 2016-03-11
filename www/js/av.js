/// <reference path="_references.js" />

"use strict";

function deviceReady() {
    window.location.hash = "map";
    window.onhashchange = function() {
        if(window.location.hash == '#filter') {
    		$('#map-container').hide();
    		$('#user-container').hide();
    		$('#details-container').hide();
    		$('#filter-container').show();
    		$('.map-icone').removeClass('active');
    		$('.user-icone').removeClass('active');
    		$('.filter-icon').addClass('active');
    	} else if(window.location.hash == '#user'){
     		$('#details-container').hide();
     		$('#filter-container').hide();
     		$('#map-container').hide();
     		$('#user-container').show();
     		$('.filter-icon').removeClass('active');
     		$('.map-icone').removeClass('active');
     		$('.user-icone').addClass('active');
    	}else if(window.location.hash == '#map') {
     		$('#user-container').hide();
     		$('#details-container').hide();
     		$('#filter-container').hide();
     		$('#map-container').show();
     		$('.filter-icon').removeClass('active');
     		$('.user-icone').removeClass('active');
     		$('.map-icone').addClass('active');
     		googleMapLoadingInfo.googleMapLoad();

        } else if(window.location.hash == '#details') {
     		$('#user-container').hide();
     		$('#filter-container').hide();
     		$('#map-container').hide();
     		$('#details-container').show();
     		$('.filter-icon').removeClass('active');
     		$('.user-icone').removeClass('active');
     		$('.map-icone').removeClass('active');

     		var CurrentAnnonceId = localStorage.getItem("CurrentAnnonceId");
     		detailsInfoReader.populateDetailsInfoContainer(CurrentAnnonceId);
    	}
    };

}

//Execute when cordova is ready
document.addEventListener('deviceready', deviceReady, false);