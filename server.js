// Load Node modules
var express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const { Song, Playlist } = require('./model.js');

var app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.listen(8080);
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/database')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB', err);
    });

// Database Management Paths
app.post('/database/songs', async (req, res) => {   // Add song to database
    console.log(req.body);
    const { title, artist, album, year, album_art } = req.body;
    try {
        const newSong = await Song.create({ title, artist, album, year, album_art });
        res.status(201).json(newSong);
    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
});

app.get('/database/songs', async (req, res) => {    // Get songs from database
    try {
        const songs = await Song.find();
        res.json(songs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/database/songs/:id', async (req, res) => {    // Get a song based on its ID
    const songId = req.params.id;
    try {
        const song = await Song.findById(songId);
        if (!song) {
            return res.status(404).json({ error: 'Song not found' });
        }
        res.json(song);
    } catch (error) {
        console.error('Error fetching song:', error);
        res.status(500).json({ error: 'Error fetching song' });
    }
});

app.put('/database/songs/:title/:artist', async (req, res) => { // Update a song in the database
    const { title, artist } = req.params;
    const { album, year, album_art } = req.body;
    try {
        const songToUpdate = await Song.findOne({ title, artist });
        if (songToUpdate) {
            const songId = songToUpdate._id;
            const updatedSong = await Song.findByIdAndUpdate(songId, { album, year, album_art }, { new: true });
            res.json(updatedSong);
        } else {
            res.status(404).json({ message: 'Song not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/database/songs/:title/:artist', async (req, res) => {  // Delete a song from the databse
    const { title, artist } = req.params;
    try {
        const songToDelete = await Song.findOneAndDelete({ title, artist });
        if (songToDelete) {
            res.json({ message: 'Song deleted successfully' });
        } else {
            res.status(404).json({ message: 'Song not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/database/playlist', (req, res) => {  // Add a playlist to the database
    const playlistData = req.body;
    console.log(req.body);
    const newPlaylist = new Playlist({
        name: playlistData.name,
        songs: playlistData.songs,
        dj_name: playlistData.dj_name,
        start_time: playlistData.start_time,
        end_time: playlistData.end_time,
    });
    newPlaylist.save()
        .then(savedPlaylist => {
            res.status(201).json({ message: 'Playlist saved successfully', playlist: savedPlaylist });
        })
        .catch(error => {
            res.status(500).json({ error: 'Error saving playlist', message: error.message });
        });
});

// Display Pages
app.get('/producer', function (req, res) {
    var username = "Producer User";
    res.render('pages/producer', {
        username: username
    });
});

app.get('/listener', function (req, res) {
    var username = "Jimmy";
    res.render('pages/listener', {
        username: username
    });
});

app.get('/dj', function (req, res) {
    var username = "DJ User";
    res.render('pages/dj', {
        username: username
    });
});

app.get('/secret', function (req, res) {
    res.render('pages/secret');
});

