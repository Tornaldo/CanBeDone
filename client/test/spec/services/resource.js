'use strict';

describe('Service: resource', function() {

  // load the service's module
  beforeEach(module('corsaneApp'));

  // instantiate service
  var $httpBackend;
  var conf;
  var resources;

  beforeEach(inject(function($rootScope, _$httpBackend_, $http, config) {
    conf = config;
    $httpBackend = _$httpBackend_;

  }));

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  })

  it('should return a list of resources', inject(function(resourceService) {
    $httpBackend.expectGET(conf.apiBaseUrl + 'resources/term').respond(200, [{
      "id": 1,
      "name": "queen 1"
    }, {
      "id": 2,
      "name": "queen 2",
      "food": "cake"
    }]);
    resources = resourceService.search('term');

    $httpBackend.flush();

    expect(resources.length).toBe(2);
  }));

});