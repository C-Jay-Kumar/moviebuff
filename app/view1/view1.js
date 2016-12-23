'use strict';

angular.module('myApp.view1', ['ngRoute', 'moviebuffModel'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$location', 'MoviebuffMdl', function($scope, $location, MoviebuffMdl) {
  MoviebuffMdl.loadMovieData();
  
  $scope.movieData = MoviebuffMdl.movieData;
	
  $scope.TABS = { 'comingSoon':1, 'inTheatres':2 };
  
  $scope.setSelectedTab = function setSelectedTab(tabId) {
	$scope.selectedTab = tabId;
  };
  
  $scope.selectedTab = $scope.TABS.inTheatres;
  
  $scope.viewMovie = function(movie) {
	MoviebuffMdl.setMovie(movie);
	$location.path('/view2');
  };
}]);
