/**
 * SearchController
 *
 * @description :: Server-side logic for managing Searches
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var Q = require('q');
var elasticsearch = require('elasticsearch');
var ejs = require('elastic.js');

var client = new elasticsearch.Client({

});

module.exports = {

  autocomplete: function(req, res, next){

    var querystring = req.param('querystring');
    querystring = HelperFunctionsService.processForAutocomplete(querystring);
    var types = req.param('types');
    var typeArr;

    if(types){
      typeArr = types.split(',');
    }
    else{
      typeArr = ['collection'];
    }

    var functionScoreQuery =  ejs.FunctionScoreQuery()
      .functions(
      [
        ejs.BoostFactorScoreFunction(2).filter(ejs.TermFilter('name_autocomplete', querystring.toLowerCase())),
        ejs.BoostFactorScoreFunction(8).filter(ejs.ExistsFilter('is_type_collection'))
      ]
    )
      .query(ejs.MatchAllQuery())
      .scoreMode('multiply');

    client.search({
      index: 'corsane',
      type: typeArr,
      body: ejs.Request()
        .query(functionScoreQuery)
        .filter(ejs.OrFilter(
          [ejs.TermFilter('name_autocomplete_each_word', querystring.toLowerCase())],
          [ejs.TermFilter('name_autocomplete', querystring.toLowerCase())]
        )
      )
    }).then(function (resp) {
      res.send({
        "results": ElasticSearchService.extractObjects(resp)
      });
    }, function (err) {
      console.trace(err.message);
    });

  },

  search: function(req, res, next){

    var querystring = req.param('querystring');
    var types = req.param('types');
    var typeArr;

    if(types){
      typeArr = types.split(',');
    }
    else{
      typeArr = ['collection'];
    }

    searchQuery = ejs.MatchQuery ('name_analyzed.standard', querystring).fuzziness(0.3);

    client.search({
      index: 'corsane',
      type: typeArr,
      body: ejs.Request()
        .query(searchQuery)
    }).then(function (resp) {
      console.log(resp);
      res.send({
        "results": ElasticSearchService.extractObjects(resp)
      });
    }, function (err) {
      console.trace(err.message);
    });

  }

};

