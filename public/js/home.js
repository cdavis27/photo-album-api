'use strict';

var ROOT_ALBUM_DIR = '';

$(document).ready(function() {
    var $albumRow = $('#albumRow');

    var albums = AlbumFactory($albumRow, ROOT_ALBUM_DIR);

    // Use AJAX to get days from the API
    $.ajax({
        url: '/api/days',
        success: function(result) {
            var albumImages = [];

            for(var i=0; i<result.length; i++) {
                var day = {};
                day.title = result[i].title;
                day.path = result[i].headerImgPath;
                day.url = '';
                albumImages.push(day);

                // for debuging
                console.log('result['+i+']: ', result[i]);
                console.log('day['+i+']: ', day);
                console.log('--------')
            }

            albums.loadImages(albumImages);
        }
    });
});