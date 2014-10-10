'use strict';

angular.module('angular-instagram', [
    // angular modules
    'ngRoute', 'ngResource', 'ngAnimate',

    // components
    'instagram'])



  // config routes
  .config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
      'use strict';

      $routeProvider
        .when('/',              {templateUrl: 'templates/photo-list.html',    controller: 'PhotoListCtrl'})
        .when('/photo-list',    {templateUrl: 'templates/photo-list.html',    controller: 'PhotoListCtrl'})
        .when('/photo/:id',     {templateUrl: 'templates/photo.html',         controller: 'PhotoCtrl'})

        .otherwise({redirectTo: '/'});

      $locationProvider.hashPrefix('!');
    }])

;