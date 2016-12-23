'use strict';

/**
 * this service obtains movie information
 */

var moviebuffService = angular.module('moviebuffService', ['jsonurlsService']);

moviebuffService.factory('MoviebuffSvc', ['JsonUrlsSvc', '$q', function(JsonUrlsSvc, $q) {

  return {
      
    loadMovieData : function loadMovieData() {
      var movieDataDeferred = $q.defer();
      var urls = ['http://www.moviebuff.com/api/v1/movies?status=IT',
                  'http://www.moviebuff.com/api/v1/movies?status=CS'];
      var movies = {};

      var movieDataPromise = (new JsonUrlsSvc(urls)).loadJsonData();
      movieDataPromise.then(function(movieData) {
        movies.inTheatres = movieData[0];
        movies.comingSoon = movieData[1];

        movieDataDeferred.resolve(movies);
      }, function() {
        movieDataDeferred.reject();
      });

      return movieDataDeferred.promise;
    },
    
    loadMovie : function loadMovie(uuid) {
      var movieDataDeferred = $q.defer();
      var url = 'http://www.moviebuff.com/api/v1/movies/' + uuid;
      var urls = [url];
      var movie = null;

      var movieDataPromise = (new JsonUrlsSvc(urls)).loadJsonData();
      movieDataPromise.then(function(movieData) {
    	movie = movieData[0];

        movieDataDeferred.resolve(movie);
      }, function() {
        movieDataDeferred.reject();
      });

      return movieDataDeferred.promise;
    }    

  };

}]);
