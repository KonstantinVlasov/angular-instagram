'use strict';

/* Controllers */
angular.module('angular-instagram')



  .controller('PhotoListCtrl', ['$scope', 'instagramService',
    function($scope, instagramService) {

      instagramService.getPhotos().then(function(photos) {
        $scope.photoList = photos;
      });

  }])



  .controller('PhotoCtrl', ['$scope', '$routeParams', 'instagramService',
    function($scope, $routeParams,instagramService) {

      instagramService.getPhoto($routeParams.id).then(function(photo) {
        $scope.photo = photo;
      });

  }])

;