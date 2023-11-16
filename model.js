const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: String,
    album: String,
    year: Number,
    album_art: String   // Stored as a URL to image
});

const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    songs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Song'
    }],
    dj_name: String,
    start_time: String,
    end_time: String
});

const Song = mongoose.model('Song', songSchema);
const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = {
    Song,
    Playlist
};
