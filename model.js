const mongoose = require('mongoose');

const song_schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: String,
    album: String,
    year: Number,
    album_art: String   // Stored as a URL to image
});

const Song = mongoose.model('Song', song_schema);

module.exports = Song;
