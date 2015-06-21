exports.index = function(req, res) {
  res.render('index');
};

exports.dayAlbum = function(req, res) {
    var day = req.params.day;

    res.render('album', {day: day});
};