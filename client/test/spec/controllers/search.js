'use strict';

var response = [{
  "id": 2,
  "url": "https://en.wikipedia.org/wiki/Elizabeth_II",
  "text": "no written-explanationobject",
  "name": "queen"
}, {
  "id": 7,
  "url": "https://vg.no",
  "text": "no written-explanationobject",
  "name": "vg2"
}, {
  "id": 3,
  "url": "https://en.wikipedia.org/wiki/George_VI",
  "text": "no written-explanationobject",
  "name": "george"
}, {
  "id": 8,
  "url": "https://wikipedia.org",
  "text": "no written-explanationobject",
  "name": "wiki"
} ];


describe('SearchCtrl', function() {

  beforeEach(module('corsaneApp'));
  var scope;
  var resource;
  var conf;
  var httpBackend;
  var glob;

  beforeEach(inject(function($controller, $httpBackend, $rootScope, resourceService, global, config) {

    scope = $rootScope;
    conf = config;
    resource = resourceService;
    httpBackend = $httpBackend;
    glob = global;

    httpBackend.whenGET(conf.apiBaseUrl + 'resources/term').respond(response);
    $controller('SearchCtrl', {
      $scope: scope,
      resourceService: resource,
      global: glob

    });

    
  }));


  it('should assign resources to scope.resources', function() {
    resource.search('term');
    scope.resources = resource.get();
    httpBackend.flush();
    expect(scope.resources.length).toBe(4);

  });

  it('should show a resource when clicked', function() {

    scope.showResource(response[0]);
    var res = glob.setResource();
    expect(res.value.name).toBe("queen");

  });

});