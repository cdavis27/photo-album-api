var multer 		= require('multer');				// for file uploads
var ExifImage 	= require('exif').ExifImage;		// To get img data
var Q 			= require('q');

module.exports = function() {

	// configure mutler for image uploads
	var imgInfo = undefined; // stores info from multer
	var done = false; // a flag to tell if multer is done getting the file

	return multer({ dest: './uploads/',
		rename: function (fieldname, filename) {
			return filename+Date.now();
		},
		onFileUploadStart: function (file) {
			console.log(file.originalname + ' is starting ...')
		},
		onFileUploadComplete: function (file, req, res) {
			console.log(file.fieldname + ' uploaded to  ' + file.path)
			req.done = true;

			// Promise that you'll have imgInfo for the routes.
			var deferred = Q.defer();
			req.imgInfo = deferred.promise;

			try {
				new ExifImage({ image : file.path }, function (error, exifData) {
					imgInfo = {
						file: file,
						exif: exifData
					};

					if (error) {
						deferred.resolve(imgInfo);
						console.log('Error: '+error.message);
					}
					else {
						// I got data back, make good on my promise
						deferred.resolve(imgInfo);
					}
				});
			} catch (error) { deferred.reject(error); }
		}
	});
};