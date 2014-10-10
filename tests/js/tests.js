(function() {

var q;
var deferred;
var instagramService = {
  getPhotos: function() {
    deferred = q.defer();
    return deferred.promise;
  },
  getPhoto: function() {
    deferred = q.defer();
    return deferred.promise;
  },
  like: function(photo) {
    photo.likes.count++;
  }
};

describe('PhotoList Controller', function(){
  var scope;
  var photos;
  var controller;

  beforeEach(function () {
    module('angular-instagram');
  });

  beforeEach(inject(function($rootScope, $controller, $q) {
    photos = [{id: 1}, {id: 2}];

    scope = $rootScope.$new();
    q = $q;

    spyOn(instagramService, 'getPhotos').andCallThrough();
  }));

  it('should call instagramService.getPhotos on creating',
    inject(function($rootScope, $controller) {

      controller = $controller('PhotoListCtrl', {
        $scope: scope,
        instagramService: instagramService
      });

      deferred.resolve(photos);
      scope.$digest();

      expect(instagramService.getPhotos).toHaveBeenCalled();
    }));

  it('should receive photoList array with length equal 2',
    inject(function($rootScope, $controller) {

      controller = $controller('PhotoListCtrl', {
        $scope: scope,
        instagramService: instagramService
      });

      deferred.resolve(photos);
      scope.$digest();

      expect(scope.photoList).not.toBe(undefined);
      expect(scope.photoList.length).toBe(2);
    }));
});


  describe('Photo Controller', function(){
    var scope;
    var photo;
    var controller;

    beforeEach(function () {
      module('angular-instagram');
    });

    beforeEach(inject(function($rootScope, $controller, $q) {
      photo = {
        id: 7,
        likes: {count: 99}
      };
      scope = $rootScope.$new();
      q = $q;

      spyOn(instagramService, 'getPhoto').andCallThrough();
    }));

    it('should call instagramService.getPhoto on creating',
      inject(function($rootScope, $controller) {

        controller = $controller('PhotoCtrl', {
          $scope: scope,
          instagramService: instagramService
        });

        deferred.resolve(photo);
        scope.$digest();

        expect(instagramService.getPhoto).toHaveBeenCalled();
      }));

    it('should receive photo object with id equal 7',
      inject(function($rootScope, $controller) {

        controller = $controller('PhotoCtrl', {
          $scope: scope,
          instagramService: instagramService
        });

        deferred.resolve(photo);
        scope.$digest();

        expect(scope.photo).not.toBe(undefined);
        expect(scope.photo.id).toBe(7);
      }));
  });

  describe('Instagram module', function () {
    var photo = {
      id: 7,
      likes: {count: 99}
    };
    var service;

    beforeEach(module("angular-instagram"));
    beforeEach(inject(
      function(instagramService) {
        service = instagramService;
      }
    ));

    it('should increase likes count by 1', function() {
      expect(photo.likes.count).toBe(99);
      service.like(photo);
      expect(photo.likes.count).toBe(100);
    });
  });

})();