/**
 * AdminController
 *
 * @description :: Server-side logic for managing Admins
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  update_mappings: function(req, res) {
    res.send({
      message: ElasticSearchService.updateMappings()
    });
  },
  test: function(req, res) {
    res.send({
      message: ElasticSearchService.test(req.param('number'))
    });
  }

};
