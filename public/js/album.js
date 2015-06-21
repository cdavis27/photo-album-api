'use strict';

// A global function accessible to both functions below
var doCollage = function(container) {
	$(container).removeWhitespace().collagePlus({
		'targetHeight': 700,
		'fadeSpeed': 1000
	});
};

$(document).ready(function() {
 	var $collageContent = $('.collage-content');
	var collage = CollageCreator($collageContent, albumPath);
	collage.loadImages(images);

	var resizeTimer = null;
	$(window).bind('resize', function() {
	    // hide all the images until we resize them
	    // set all img tags to opacity 0
	    $collageContent.find('img').css("opacity", 0);
	    // set a timer to re-apply the collage plugin
	    if (resizeTimer) clearTimeout(resizeTimer);
	    resizeTimer = setTimeout(function() {
	    	doCollage($collageContent);
	    }, 200);
	});

});

$(window).load(function() {
	var $collageContent = $('.collage-content'); 
	doCollage($collageContent)
	$('.hide-me').css('opacity', 1);
});