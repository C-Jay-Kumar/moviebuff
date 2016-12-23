'use strict';

/**
 * given a list of urls to json, fetches them 
 *  * returns: a list of contents, each corresponding to the urls
 */

var jsonurlsService = angular.module('jsonurlsService', []);

jsonurlsService.factory('JsonUrlsSvc', ['$http', '$q', function($http, $q) {

  return function(urls) {
    
    /*
     * input: [url1, url2, url3, url4, ...]
     * output: [json1, json2, txt1, txt2, ...]
     */
    this.loadJsonData = function loadJsonData() {
      var jsonDataDeferred = $q.defer();
      var urlCalls = [];

      angular.forEach(urls, function(url) {
        urlCalls.push($http.get(url));
      });
      
      $q.all(urlCalls).then(
        function(results) {
          var resultsData = [];
          angular.forEach(results, function(result) {
            resultsData.push(result.data);
          });
          jsonDataDeferred.resolve(resultsData);
        },
        function(errors) {
          jsonDataDeferred.reject();
        }
      );
      
      return jsonDataDeferred.promise;
    }
  };

}]);
