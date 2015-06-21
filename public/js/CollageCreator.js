'use strict';

var CollageCreator = function(collageContainer, albumRoot) {
    var tpl = $("<img>");

    // create an object to attach all internal variables and methods
    var collage = {};

    collage.container = collageContainer;

    collage.albumRoot = albumRoot;

    /*********************************************/
    /*  AlbumFactory Private (internal) Methods	 */
    /*********************************************/

    var createImage = function(path) {
		// make a deep copy of our template
        var img = tpl.clone();

        // build the full path of the image
        var fullPath = collage.albumRoot + '/' + path;

        // set the background-image css property of the div that has class='img-bg'
        img.attr('src', fullPath);

        // return the built image
    	return img;
    };


    /********************************************/
    /*      CollageCreator Public Methods		*/
    /********************************************/

    collage.loadImages = function(imageObjects) {
        // Loop through each imagePath and add that image to the
        // appropriate div. Once that's done, add that tpl to the
        // main container element passed in.

        for (var i = 0; i < imageObjects.length; i++) {
        	var currentImageObject = imageObjects[i];

        	var img = createImage(currentImageObject.path);

            collage.container.append(img);
        }

    };

    return collage;
}