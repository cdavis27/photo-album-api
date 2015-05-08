var express 	= require('express');
var app 		= express();
var multer 		= require('multer');
var ExifImage 	= require('exif').ExifImage;
var bodyParser 	= require('body-parser');
var models 		= require('./models.js');
var Q 			= require('q');
var cors 		= require('cors')

// set up middleware to parse the request body
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors())

// configure mutler for image uploads
var imgInfo = undefined; // stores info from multer
var done = false; // a flag to tell if multer is done getting the file
app.use(multer({ dest: './uploads/',
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
}));


app.use('/', require('./routes.js'));
app.use('/uploads', express.static(__dirname + '/uploads'));

app.listen(5000);