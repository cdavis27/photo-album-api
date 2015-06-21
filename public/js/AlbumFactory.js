'use strict';

var AlbumFactory = function(container, assetsRoot) {
    var tpl = $("<div class='col-md-3 col-sm-4 col-xs-12'>" + 
    				"<div class='img-circle-container'>" + 
    					"<div class='img-bg'>" + 
    						"<div class='info'>" + 
    							"<h3></h3>" + 
    						"</div>" + 
    					"</div>" + 
    				"</div>" + 
    			"</div>");

    // create an object to attach all internal variables and methods
    var factory = {};

    factory.container = container; // hold on to the container element passed in

    factory.rootAssetsDir = assetsRoot; // doesn't have to be the same name

    /*********************************************/
    /*  AlbumFactory Private (internal) Methods	 */
    /*********************************************/

    var createImage = function(path, title) {
		// make a deep copy of our template
        var img = tpl.clone();

        // build the full path of the image
        var fullPath = factory.rootAssetsDir + '/' + path;

        // set the background-image css property of the div that has class='img-bg'
        img.find('.img-bg').css('background-image', 'url("' + fullPath + '")');
        img.find('h3').html(title)

        // return the built image
    	return img;
    };

    var addClickListener = function(img, url) {
    	img.bind('click', function(e) {
    		location.href = url;
    	});

    	return img;
    }


    /********************************************/
    /*       AlbumFactory Public Methods		*/
    /********************************************/

    factory.loadImages = function(imageObjects) {
        // Loop through each imagePath and add that image to the
        // appropriate div. Once that's done, add that tpl to the
        // main container element passed in.

        for (var i = 0; i < imageObjects.length; i++) {
        	// get the current element of the array we are iterating through
        	var currentImageObject = imageObjects[i];
            
            // build an image block
            var img = createImage(currentImageObject.path, currentImageObject.title);

            img = addClickListener(img, currentImageObject.url)

            // append to the album container
            factory.container.append(img);
        }
    };

    return factory;
}