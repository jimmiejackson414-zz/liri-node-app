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

var nodeArgs = process.argv;

// Grabs the name of the movie from user
var movieName = "";



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
    var info = { screen_name: 'athike2012', count: 1 };
    client.get('statuses/user_timeline', info, function(error, tweets, response) {
        if (!error) {
            console.log("Tweet created: " + tweets.created_at + "\n" + "Tweet: " + tweets.text);
        }
    })
}

// myTweets();



/////////////
// SPOTIFY //
/////////////



//////////
// OMDB //
//////////
function movieThis() {

    for (var i = 2; i < nodeArgs.length; i++) {

        if (i > 2 && i < nodeArgs.length) {
            movieName = movieName + "+" + nodeArgs[i];
        } else {
            movieName = movieName + nodeArgs[i];
        }
    }

    // Runs request including movie name to OMDB
    var queryUrl = 'http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&r=json';

    // request(queryUrl, function(err, response, movie) {

    // 	if (movieName == "") {
    // 		movieName = "Mr. Nobody";
    // 	}
    //     if (!err && response.statusCode == 200) {
    //         console.log("Title: " + movie.title + "Year: " + JSON.parse(body)["Year"] + "IMDB Rating: " + JSON.parse(body)["imdbRating"] + "Country: " + JSON.parse(body)["Country"] + "Language: " + JSON.parse(body)["Language"] + "Plot: " + JSON.parse(body)["Plot"] + "Actors: " + JSON.parse(body)["Actors"]);
    //     }
    // })

    omdb.search(queryUrl, function(err, movies) {
    if(err) {
        return console.error(err);
    }
 
    if(movies.length < 1) {
        return console.log('No movies were found!');
    }
 
    // movies.forEach(function(movie) {
    //     console.log('%s (%d)', movie.title, movie.year);
    // });
 	
 	console.log('Title: ' + movie.title + '\n' + 'Year: ' + movie.year + '\n' + 'IMDB Rating: ' + movie.imdb.rating + '\n' + "Country: " + movie.countries + '\n' + "Language: " + '\n' + "Plot: " + movie.plot + '\n' + "Actors: " + movie.actors);
});


movieThis();

/////////////////////
// DO WHAT IT SAYS //
/////////////////////
if (process.argv[2] == "my-tweets") {
	myTweets();
} else if (process.argv[2] == "movie-this") {
	movieThis();
}




