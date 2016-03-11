/// <reference path="_references.js" />


var detailsInfoReader =
{
    findAdsById: function (adsId) {
        var adsFound = null;
        $.each(arrayPoint, function (index, value) {
            if (value.id == adsId)
            {
                adsFound = value;
            }
        });
        return adsFound;
    },
    populateDetailsInfoContainer: function (adsId) {
        var imageGallery = '<div class="container">Aucun d�tails (Consulter votre adiministrateur)</div>';
        var topImages = '<div></div>';
        var ads = this.findAdsById(adsId);
        if (ads != null) {
            var carousel = this.buildCarouselHtml(ads);
            imageGallery = this.wrapCarouselInContainer(carousel);
        }
        $("div .imageGallery").html(imageGallery);
        $("div .annonceDetails").html( this.getAnnonceInfo(ads) );
    },
    buildCarouselHtml: function (ads) {


        var carouselHtml =   '<div class="row">'
               +     '<div id="myCarousel" class="carousel slide" data-ride="carousel">'
               +     '<ol class="carousel-indicators">' ;

       $.each (ads.imgObject , function(index , value){
           if (index == 0)
               carouselHtml = carouselHtml + '<li data-target="#myCarousel" data-slide-to="'+ index +'" class="active"></li>' ; 
           else
               carouselHtml = carouselHtml + '<li data-target="#myCarousel" data-slide-to="'+ index +'" class=""></li>' ;
        });
        carouselHtml  = carouselHtml +    '  </ol>';                                          
        carouselHtml = carouselHtml + '<div class="carousel-inner">' ;

        $.each (ads.imgObject , function(index , value){
            if (index == 0)
                carouselHtml  = carouselHtml  + '<div class="item active">'
                                                    + '<img src="'+ value.url64 +'"style="width:100%"  alt="">'
                                                    +'<div class="container">'
                                                          + '<div class="carousel-caption">'
                                                               + '<h1>'+ value.Titre +'</h1>'
                                                                +'<p>'+ value.Description +'</p>'
                                                            +'</div>'
                                                     +'</div>'
                                               +'</div>';
            else
                carouselHtml  = carouselHtml  + '<div class="item">'
                                                    + '<img src="'+ value.url64 +'"style="width:100%"  alt="">'
                                                    +'<div class="container">'
                                                          + '<div class="carousel-caption">'
                                                               + '<h1>'+ value.Titre +'</h1>'
                                                                +'<p>'+ value.Description +'</p>'
                                                            +'</div>'
                                                     +'</div>'
                                               +'</div>';
        });
                            

        carouselHtml =  carouselHtml + '</div>';

        carouselHtml = carouselHtml + '<a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">'
                           + '<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>'
                           + '<span class="sr-only">Previous</span>'
                      + ' </a>'
                       + '<a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">'
                       +     '<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>'
                       +     '<span class="sr-only">Next</span>'
                       + '</a>'
                   + '</div>'
           + '</div>';

        return carouselHtml; 
    },
    wrapCarouselInContainer: function (carouselHtml) {
        var carouselHtmlWrapped = '"<div class="container">' + carouselHtml + '</div>"'
        return carouselHtmlWrapped;
    },

    getAnnonceInfo : function(ads) {
           var toReturn =    '<div class="resume">'
                                    +'<div class="annonceTitle">'+ads.name+'</div>'
                                    +'<div class="annoncePrix">'+ads.prix+' CAD </div>'
                                    +'<ul class="otherInfo">'
                                        +'<li> Location: '+ads.adresse+'</li>'
                                        +'<li>'+ads.resume+'</li>'
                                    +'</ul>'
                                +'</div>'
                                +'<div class="description">'
                                    +ads.description+
                                +'</div>';

        return toReturn;
    },

};

