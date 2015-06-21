'use strict';

// list all the img names that you want to be albums
var albumImages = [
    // { path: "img001.png", title: "Cinque Terra", url: "/albums/cinque-terra" },
    // { path: "img002.png", title: "Edinburgh", url: "" },
    // { path: "img008.png", title: "Berlin", url: "" },
    // { path: "img009.png", title: "Madrid", url: "" },
    // { path: "img010.png", title: "Normandy", url: "" },
    // { path: "img011.png", title: "Bath", url: "" },
    // { path: "img012.png", title: "Paris", url: "" },
    // { path: "img001.png", title: "Cinque Terra", url: "/albums/cinque-terra" },
    // { path: "img002.png", title: "Edinburgh", url: "" },
    // { path: "img003.png", title: "Versailles", url: "" },
    // { path: "img004.png", title: "Ancey", url: "" },
    // { path: "img005.png", title: "Torino", url: "" },
    // { path: "img006.png", title: "Geneva", url: "" },
    // { path: "img007.png", title: "London", url: "" },
    // { path: "img008.png", title: "Berlin", url: "" },
    // { path: "img009.png", title: "Madrid", url: "" },
    // { path: "img010.png", title: "Normandy", url: "" },
    // { path: "img011.png", title: "Bath", url: "" },
    // { path: "img012.png", title: "Paris", url: "" },
    // { path: "img004.png", title: "Ancey", url: "" },
    // { path: "img005.png", title: "Torino", url: "" },
    // { path: "img006.png", title: "Geneva", url: "" },
    // { path: "img007.png", title: "London", url: "" }
];
// Can you make this more effecient/dynamic?

var ROOT_ALBUM_DIR = '';

$(document).ready(function() {
    var $albumRow = $('#albumRow');

    var albums = AlbumFactory($albumRow, ROOT_ALBUM_DIR);

    // Use AJAX to get days from the API
    $.ajax({
        url: '/api/days',
        success: function(result) {
            for(var i=0; i<result.length; i++) {
                var day = {};
                day.title = result[i].title;
                day.path = result[i].headerImgPath;
                day.url = '';
                albumImages.push(day);
                console.log(day);
            }

            albums.loadImages(albumImages);
        }
    });
});