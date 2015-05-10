/**
* Collection.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var util = require('util');
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({

});

module.exports = {

  attributes: {
  	name: {
  		type: 'string',
  		required: true
  	},
  	sub_collections: {
  		collection: 'collection'
  	},
  	parent_collections: {
  		model: 'collection'
  	},
  	resources: {
  		collection: 'resource'
  	},
  	description: {
      type: 'string',
      defaultsTo: 'No description yet!'
    },
  	poster: {
  		model: 'user',
  		required: true
  	},
  	admin: {
  		collection: 'user'
  	},
  	image_url: {
      type: 'string',
      defaultsTo: 'images/generic.png'
    }

  },
  beforeCreate: function(values, next) {

    values.name = values.name.trim().replace(/\s{2,}/g, ' ');
    values.description = values.description.trim().replace(/\s{2,}/g, ' ');

    next();

  }
  ,
  afterCreate: function(values, next) {

    //Save to ElasticSearch:
    ElasticSearchService.saveObject(values, 'collection', false);

    next();

  },
  beforeUpdate: function(values, next) {

    values.name = values.name.trim().replace(/\s{2,}/g, ' ');
    values.description = values.description.trim().replace(/\s{2,}/g, ' ');

    next();

  }
  ,
  afterUpdate: function(values, next) {

    //Save to ElasticSearch:
    ElasticSearchService.saveObject(values, 'collection', true);

    next();

  }


};
