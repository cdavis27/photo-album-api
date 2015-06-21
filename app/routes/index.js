exports.index = function(req, res) {
  res.render('index');
};

exports.dayAlbum = function(req, res) {
    var day = req.params.day;

    
    var photos = [];

    res.render('album', {day: day, photos: photos});
};