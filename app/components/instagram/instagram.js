'use strict';

angular.module('instagram', [])

  // Service for receive raw instagram data
  .service('instagramResource', ['$resource', function($resource) {
    return $resource('https://api.instagram.com/v1/media/:id', {}, {

      // Getting popular photos
      getPopular: {
        method: 'JSONP',
        params: {id: 'popular', callback:'JSON_CALLBACK'},
        cache: true},

      // Getting photo by id
      getMedia: {
        method: 'JSONP',
        params: {callback:'JSON_CALLBACK'},
        cache: true}
    });
  }])

  // Service for receive raw instagram data
  .service('instagramTest', [function() {
    return {test: 1}
  }])


  // Service for receive ready to use photos/photo
  .service('instagramService', ['$q', 'instagramResource', function($q, instagramResource) {

    var client_id = '642176ece1e7445e99244cec26f4de1f';

    return {
      getPhotos: function() {
        var deferred = $q.defer();

        instagramResource.getPopular({client_id: client_id}, function(response) {
          deferred.resolve(response.data);
        }, function(response) {
          deferred.reject(response);
        });

        return deferred.promise;
      },

      getPhoto: function(id) {
        var deferred = $q.defer();

        instagramResource.getMedia({id: id, client_id: client_id}, function(response) {
          deferred.resolve(response.data);
        }, function(response) {
          deferred.reject(response);
        });

        return deferred.promise;
      },

      like: function(photo) {
        photo.likes.count++;
      }
    };
  }])



  // Directive for render photos
  .directive('instagramPhotoList', function() {
    return {
      restrict: 'A',
      scope: {
        photoList: '=instagramPhotoList'
      },
      templateUrl: 'components/instagram/instagram-photo-list.html'
    }
  })



  // Directive for render one photo
  .directive('instagramPhoto', ['instagramService', function(instagramService) {
    return {
      restrict: 'A',
      scope: {
        photo: '=instagramPhoto'
      },
      link: function(scope) {
        scope.instagram = instagramService;
      },
      templateUrl: 'components/instagram/instagram-photo.html'
    }
  }])

;