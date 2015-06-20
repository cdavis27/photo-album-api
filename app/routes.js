var express 	= require('express');
var router 		= express.Router();

// Model imports
var Picture 	= require('./models/Picture');
var Day 	 	= require('./models/Day');

// read
router.get('/days', function (req, res) {
	Day.find({}, function (err, data) {
		res.json(data);
	})
});

router.get('/days/:id', function (req, res) {
	Day.findOne({_id: req.params.id}, function (err, data) {
		if (!data) {
			res.send('id not found');
			return;
		}
		res.json(data);
	})
});

// create
router.post('/days', function (req, res) {
	if (req.done) {
		req.imgInfo.then(function(imgInfo) {

			console.log("imgInfo:", imgInfo);
			var day = new Day({
				'headerImgPath': imgInfo.file.path,
				'title': req.body.title,
				'description': req.body.description,
				'location': {
					'city': req.body.location_city,
					'country': req.body.location_country
				},
				'weather': {
					'temperature': req.body.weather_temperature,
					'description': req.body.weather_description
				}
			});

			day.save(function (err, data) {
				if (err) {
					res.send('create failed');
					return;
				}
				res.send('create successful');
			});

		}, function(error) {
			console.log("Error: " + error);
			res.send('create failed -- probably tried to use something other than a JPG');
		});
	}
});

// update
router.put('/days', function (req, res) {
	Day.findOne({_id: req.body._id}, function (err, data) {
		if (!data) {
			res.send('id not found');
			return;
		}
		for (var key in req.body) {
			data[key] = req.body[key];
		}
		data.save(function (err, data) {
			if (err) {
				res.send('update falied');
				return;
			}
			res.send('update successful');
		});
	});
});

// delete
router.delete('/days/:id', function (req, res) {
	Day.findOne({_id: req.params.id}, function (err, data) {
		if (!data) {
			res.send('id not found');
			return;
		}
		data.remove( function (err, data) {
			if (err) {
				res.send('delete failed');
				return;
			}
			res.send('delete successful');
		});
	});
});

module.exports = router;