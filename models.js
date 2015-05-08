var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/photo-album');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
	console.log("Connected to DB!");
});

var models = {};

var Picture = mongoose.model('Picture', mongoose.Schema({
		uploaded: { type: Date, default: Date.now },
		tags: [String],
		description: String,
		exif: mongoose.Schema.Types.Mixed,
		path: String
	})
);

var Day = mongoose.model('Day', mongoose.Schema({
		title: String,
		description: String,
		location: {
			city: String,
			country: String
		},
		headerImgPath: String,
		weather: {
			temperature: Number, 
			description: String, 
			icon: String
		},
		pictures: [mongoose.Schema.Types.ObjectId]
	})
);

models.Picture = Picture;
models.Day = Day;

module.exports = models;