'use strict';

/* Controllers */
angular.module('angular-tweets')



  .controller('PhotoListCtrl', ['$scope', 'instagramService',
    function($scope, instagramService) {

      instagramService.getPhotos().then(function(photos) {
        console.log(photos);
        $scope.photoList = photos;
      });

  }])



  .controller('PhotoCtrl', ['$scope', '$routeParams', 'instagramService',
    function($scope, $routeParams,instagramService) {

      instagramService.getPhoto($routeParams.id).then(function(photo) {
        console.log(photo);
        $scope.photo = photo;
      });

  }])

;