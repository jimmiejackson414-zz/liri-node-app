///////////////////
// SET VARIABLES //
///////////////////

// Grabs the Twitter keys from the keys.js file
var keys = require('./keys.js');

// Uses the Twitter NPM package
var TwitterRequest = require('twitter');

// Uses the read and write package
var fs = require('fs');

// NPM package to help with OMDB API
var omdb = require('omdb');

// Used to request OMDB movie information
var request = require('request');

// NPM package to require Spotify
var spotify = require('spotify');

// Takes in command line from user
var nodeArgs = process.argv;

// Empty variable to store name of movie from user
var movieName = '';

// Empty song variable
var song = '';



/////////////
// TWITTER //
/////////////

var client = new TwitterRequest({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key: keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret
})

function myTweets() {
    var info = { screen_name: 'athike2012' };
    client.get('statuses/user_timeline', info, function(error, tweets, response) {
        if (!error) {
            for (i = 19; i >= 0; i--)
                console.log('Tweet #' + (20 - i) + ': ' + tweets[i].text);
        }
    })
}



/////////////
// SPOTIFY //
/////////////

function spotifyThisSong() {

    for (var i = 3; i < process.argv.length; i++) {

        if (i > 3 && i < process.argv.length) {

            song = song + '+' + process.argv[i];

        } else {

            song = song + process.argv[i];
        }
    }
    console.log(song);


    // Sets default song to Blink 182's hit song, What's My Age Again?
    if (song == '') {
        song = "Whats+My+Age+Again";
    }

    // Runs the Spotify search and outputs all necessary song information
    spotify.search({ type: 'track', query: song, limit: '20' }, function(err, data) {
        if (!err) {
            for (var i = 0; i < data.tracks.items.length; i++) {
            	console.log('');
            	console.log('----------------------------------');
                console.log('Artist: ' + data.tracks.items[i].artists[0].name);
                console.log('Song Name: ' + data.tracks.items[i].name);
                console.log('Album: ' + data.tracks.items[i].album.name);
                console.log('Preview Link: ' + data.tracks.items[i].preview_url);
                console.log('----------------------------------');
                console.log('');

            }

        } else {
            console.log('Error occurred: ' + err);
        }

    })
}


//////////
// OMDB //
//////////

function movieThis() {

    for (i = 3; i < nodeArgs.length; i++) {

        if (i > 2 && i < nodeArgs.length) {

            movieName = movieName + "+" + nodeArgs[i];

        } else {

            movieName = movieName + nodeArgs[i];

        }

    }

    // Runs request including movie name to OMDB
    var queryUrl = 'http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&r=json';

    console.log(queryUrl);

    request(queryUrl, function(error, response, body) {

        if (!error && response.statusCode == 200) {

            console.log("Title: " + JSON.parse(body)['Title']);
            console.log("Year: " + JSON.parse(body)["Year"]);
            console.log("IMDB Rating: " + JSON.parse(body)["imdbRating"]);
            console.log("Country: " + JSON.parse(body)["Country"]);
            console.log("Language: " + JSON.parse(body)["Language"]);
            console.log("Plot: " + JSON.parse(body)["Plot"]);
            console.log("Actors: " + JSON.parse(body)["Actors"]);
        }
    })
}


/////////////////////
// DO WHAT IT SAYS //
/////////////////////

if (process.argv[2] == 'my-tweets') {
    myTweets();
} else if (process.argv[2] == 'movie-this') {
    movieThis();
} else if (process.argv[2] == 'spotify-this-song') {
    spotifyThisSong();
}
