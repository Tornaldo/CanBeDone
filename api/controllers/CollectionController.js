/**
 * CollectionController
 *
 * @description :: Server-side logic for managing Collections
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	addsubcollection: function(req, res, next){
		Collection.findOne(req.param('id'), function(err, obj){
			obj.subCollections.add(req.param('subid'));

			obj.save(function(err, result){
				res.send(result);
				Collection.findOne(req.param('subid'), function(err, newobj){
					newobj.parent_collections = req.param('id');

					newobj.save(function(err, resp){

					});
				})
			})
		})
	}
};

