/**
 * Resource.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var EMBEDLY_KEY = '66f17f93fa884646a88c25cc4a78e9f5';

var embedly = require('embedly'),
  util = require('util');

module.exports = {

  attributes: {
    url: {
      type: 'string',
      required: true
    },
    title: 'string',
    name: 'string',
    type: 'string',
    poster: {
      model: 'user'
    },
    vote: {
      type: 'integer',
      defaultsTo: 0
    },
    description: 'string',
    note: {
      type: 'string',
      defaultsTo: ''
    },
    image_url: 'string',
    img_width: 'integer',
    img_height: 'integer',
    provider_name: 'string',
    provider_url: 'string',
    provider_favicon: 'string',
    text: 'string'
  },
  beforeCreate: function(values, next) {

    if(values.title){
      values.name = values.title;
    }

    next();

  },
  afterCreate: function(values, next) {

    Resource.findOne(values.id, function(err, obj) {

      new embedly({
        key: EMBEDLY_KEY
      }, function(err, api) {
        if (!!err) {
          console.error('Error creating Embedly api');
          console.error(err.stack, api);
          return;
        }
        var url = obj.url;
        api.extract({
          url: url
        }, function(err, objs) {
          if (!!err) {
            console.error('request #1 failed');
            console.error(err.stack, objs);
            return;
          }
          console.log('---------------------------------------------------------');
          console.log(util.inspect(objs[0]));
          obj.title = objs[0].title;
          obj.description = objs[0].description;
          obj.provider_name = objs[0].provider_display;
          obj.provider_url = objs[0].provider_url;
          obj.provider_favicon = objs[0].favicon_url;

          if (objs[0].images[0]) {
            obj.image_url = objs[0].images[0].url;
            obj.img_width = objs[0].images[0].width;
            obj.img_height = objs[0].images[0].height;
          }

          obj.save(function(err, result) {

            console.log("kom hit");

            //Save to ElasticSearch:
            ElasticSearchService.saveObject(obj, 'resource', false);

            next();

          })
        });
      });

    })

  },
  beforeUpdate: function(values, next) {

    if(values.title){
      values.name = values.title;
    }

    next();

  },
  afterUpdate: function(values, next) {

    //Save to ElasticSearch:
    ElasticSearchService.saveObject(values, 'resource', true);

    next();

  }

};
