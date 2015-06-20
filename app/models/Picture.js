var mongoose = require('mongoose');

module.exports = mongoose.model('Picture', mongoose.Schema({
        uploaded: { type: Date, default: Date.now },
        tags: [String],
        description: String,
        exif: mongoose.Schema.Types.Mixed,
        path: String
    })
);