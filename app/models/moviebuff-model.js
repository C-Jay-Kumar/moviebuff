'use strict';

/**
 * the model for the Moviebuff
 */

var moviebuffModel = angular.module('moviebuffModel', ['moviebuffService']);

moviebuffModel.factory('MoviebuffMdl', ['$q', 'MoviebuffSvc', function($q, MoviebuffSvc) {
  var movieData = {};
  movieData.movie = {};

  var loadMovieData = function() {
    MoviebuffSvc.loadMovieData().then(function(movies) {
	  movieData.comingSoon = movies.comingSoon;
      movieData.inTheatres = movies.inTheatres;

    }, function() {

	});
  };
  
  return {
	loadMovieData: loadMovieData,
	movieData: movieData,
	setMovie: function(mov) {
	  movieData.movie = mov;
	},
  	getMovie: function() {
	  return movieData.movie;
	}
  };
  
}]);
