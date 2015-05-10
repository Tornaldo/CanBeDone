/**
 * Guide for searching: http://docs.fullscale.co/elasticjs
 */

var Q = require('q');
var util = require('util');
var elasticsearch = require('elasticsearch');
var ejs = require('elastic.js')

var client = new elasticsearch.Client({

});

module.exports = {

  //Update mapping:
  test: function (number) {

    var settings =
    {
      "analysis": {
        "analyzer": {
          "lowercase": {
            "type": "custom",
            "tokenizer": "keyword",
            "filter": "lowercase"
          }
        }
      }
    }

    var mappingForResource =
    {
      "resource": {
        "properties": {
          "title": {
            "type": "string",
            "index": "not_analyzed"
          },
          "name": {
            "type": "string",
            "index": "not_analyzed"
          },
          "name_analyzed": {
            "type": "multi_field",
            "fields": {
              "standard": {
                "type": "string",
                "analyzer": "standard"
              },
              "lowercase": {
                "type": "string",
                "analyzer": "lowercase"
              }
            }
          },
          "name_autocomplete_each_word": {
            "type": "string",
            "analyzer": "lowercase"
          },
          "name_autocomplete": {
            "type": "string",
            "analyzer": "lowercase"
          },
          "note": {
            "type": "string",
            "index": "not_analyzed"
          },
          "description": {
            "type": "string",
            "index": "not_analyzed"
          },
          "url": {
            "type": "string",
            "index": "not_analyzed"
          },
          "url_normalized": {
            "type": "string",
            "index": "not_analyzed"
          },
          "type": {
            "type": "string",
            "index": "not_analyzed"
          },
          "provider_name": {
            "type": "string",
            "index": "not_analyzed"
          },
          "provider_url": {
            "type": "string",
            "index": "not_analyzed"
          },
          "provider_favicon": {
            "type": "string",
            "index": "not_analyzed"
          },
          "image_url": {
            "type": "string",
            "index": "not_analyzed"
          },
          "img_width": {
            "type": "integer"
          },
          "img_height": {
            "type": "integer"
          },
          "vote": {
            "type": "integer"
          },
          "text": {
            "type": "string",
            "index": "not_analyzed"
          },
          "text_analyzed": {
            "type": "multi_field",
            "fields": {
              "standard": {
                "type": "string",
                "analyzer": "standard"
              }
            }
          },
          "poster": {
            "type": "string",
            "index": "not_analyzed"
          },
          "is_type_resource": {
            "type": "integer"
          }

        }
      }
    };

    var mappingForCollection =
    {
      "collection": {
        "properties": {
          "name": {
            "type": "string",
            "index": "not_analyzed"
          },
          "name_analyzed": {
            "type": "multi_field",
            "fields": {
              "standard": {
                "type": "string",
                "analyzer": "standard"
              },
              "lowercase": {
                "type": "string",
                "analyzer": "lowercase"
              }
            }
          },
          "name_autocomplete_each_word": {
            "type": "string",
            "analyzer": "lowercase"
          },
          "name_autocomplete": {
            "type": "string",
            "analyzer": "lowercase"
          },
          "sub_collections": {
            "type": "integer"
          },
          "description": {
            "type": "string",
            "index": "not_analyzed"
          },
          "poster": {
            "type": "string",
            "index": "not_analyzed"
          },
          "image_url": {
            "type": "string",
            "index": "not_analyzed"
          },
          "image_url_normalized": {
            "type": "string",
            "index": "not_analyzed"
          },
          "admin": {
            "type": "string",
            "index": "not_analyzed"
          },
          "is_type_collection": {
            "type": "integer"
          }

        }
      }
    };


    console.log(number);

    if (number == 1) {

      client.indices.delete({
          index: 'corsane'
        }
      );

    }
    else if (number == 2) {

      client.indices.create({
          index: 'corsane'
        }
      );

    }
    else if (number == 3) {

      client.indices.close({
          index: 'corsane'
        }
      );

    }
    else if (number == 4) {

      client.indices.putSettings({
          index: 'corsane',
          body: settings
        }
      );

    }
    else if (number == 5) {

      client.indices.putMapping({
          index: 'corsane',
          type: "collection",
          body: mappingForCollection
        }
      );

      client.indices.putMapping({
          index: 'corsane',
          type: "resource",
          body: mappingForResource
        }
      );

    }
    else if (number == 6) {

      client.indices.open({
          index: 'corsane'
        }
      );

    }

    else if (number == 7) {

      ElasticSearchService.indexType('collection');
      ElasticSearchService.indexType('resource');

    }

    return number;

  },

  extractObjects: function (response) {

      var returnArr = [];

      for (var i = 0; i < response.hits.hits.length; i++) {
        returnArr.push(response.hits.hits[i]['_source']);
      }

      //Remove fields used for indexing:
      for (var i = 0; i < returnArr.length; i++) {
        delete returnArr[i]['name_autocomplete_each_word'];
        delete returnArr[i]['name_autocomplete'];
        delete returnArr[i]['name_analyzed'];
      }

      return returnArr;

    },

  saveObject: function (values, type, isUpdate) {

      body = {};

      //Old body will be passed when we are to update (and not add a new object)
      if (isUpdate) {
        body.createdAt = new Date().toLocaleString();
      }
      else{

        if (type == 'resource') {
          body.is_type_resource = 1;
        }
        else if (type == 'collection') {
          body.is_type_collection = 1;
        }

      }

      body.updatedAt = new Date().toLocaleString();

      if (type == 'collection') {

        if (values.name) {
          body.name = values.name;
          body.name_analyzed = values.name;
          body.name_autocomplete_each_word = HelperFunctionsService.splitForAutocomplete(values.name.toLowerCase(), true, 4, 10);
          body.name_autocomplete = HelperFunctionsService.splitForAutocomplete(values.name.toLowerCase(), false, 3, 25);
        }

        if (values.image_url) {
          body.image_url = values.image_url;
          body.image_url_normalized = HelperFunctionsService.normalizeUrl(values.image_url, false, true);
        }

      }
      else if (type == 'resource') {

        //So that all objects can be queried using 'name':
        if (!values.name && values.title) values.name = values.title;

        if (values.name) {
          body.title = values.name;
          body.name = values.name;
          body.name_analyzed = values.name;
          body.name_autocomplete_each_word = HelperFunctionsService.splitForAutocomplete(values.name.toLowerCase(), true, 4, 10);
          body.name_autocomplete = HelperFunctionsService.splitForAutocomplete(values.name.toLowerCase(), false, 3, 25);
        }

        if (values.url) {
          body.url = values.url;
          body.url_normalized = HelperFunctionsService.normalizeUrl(values.url, true, true);
        }

        if (body.note) body.note = values.note;
        if (body.description) body.description = values.description;
        if (body.type) body.type = values.type;
        if (body.provider_name) body.provider_name = values.provider_name;
        if (body.provider_url) body.provider_url = values.provider_url;
        if (body.image_url) body.image_url = values.image_url;
        if (body.img_width) body.img_width = values.img_width;
        if (body.img_height) body.img_height = values.img_height;
        if (body.vote) body.vote = values.vote;

        if (body.text) {
          body.text = values.text;
          body.text_analyzed = values.text;
        }

        if (body.poster) body.poster = values.poster;

      }
      else {
        console.log('oops');
      }


      if (isUpdate) {

        client.update({
          index: 'corsane',
          type: type,
          id: values.id,
          body: {
            // put the partial document under the `doc` key
            doc: body
          }
        }, function (error, response) {
          //todo
        })

      }
      else {

        client.create({
          index: 'corsane',
          type: type,
          id: values.id,
          body: body
        }, function (error, response) {
          //todo
        });

      }

    },

  indexType: function (type) {

      var objectsAtOnce = 10;

      if (type == 'collection') Model = Collection;
      else if (type == 'resource') Model = Resource;
      else console.log("oops");

      numberOfElements = Model.count()
        .exec(function (err, result) {
          if (err) {
            console.log(err);
          }
          else {

            numberOfRounds = Math.ceil(result / objectsAtOnce);

            for (var i = 0; i < numberOfRounds; i++) {

              Model
                .find({
                  skip: objectsAtOnce * i,
                  limit: objectsAtOnce,
                  sort: 'id'
                })
                .exec(function (err, results) {

                  for (var u = 0; u < results.length; u++) {
                    ElasticSearchService.saveObject(results[u], type, false);
                  }

                })

            }

          }
        });

    }

}
