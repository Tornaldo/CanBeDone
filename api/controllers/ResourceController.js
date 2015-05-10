/**
 * ResourceController
 *
 * @description :: Server-side logic for managing Resources
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var util = require('util');

module.exports = {
	addvote: function(req, res, next){

		console.log('1' + req.param('voter'));
		User.findOne(req.param('voter'), function(err, obj){
			console.log('2');
			obj.voting_history.add(req.param('id'));

			obj.save(function(err, result){
				if(err){
					res.send(err);
				}
				else {

					res.send(result);
					Resource.findOne(req.param('id'), function(err, element){
						
						console.log('vote: ' + req.param('vote'));
						if (req.param('vote') > 0) {
							element.vote = element.vote + 1;
						}
						else {
							element.vote = element.vote - 1;
						}

						element.save(function(err, result){
							//res.send(result);	
						})

					})	
				}
			})

			// obj.voting_history.add(req.param('id'), function(err, data){
			// 	console.log('3');
			// 	if(!err){
			// 		console.log('4');
			// 		Resource.findOne(req.param('id'), function(err, element){
						
			// 			console.log('vote: ' + req.param('vote'));
			// 			if (req.param('vote') > 0) {
			// 				element.vote = element.vote + 1;
			// 			}
			// 			else {
			// 				element.vote = element.vote - 1;
			// 			}

			// 			element.save(function(err, result){
			// 				res.send(result);	
			// 			})

			// 		})
			// 	}
			// 	else {
			// 		console.log('5' + err);
			// 		res.send('Something went wrong');
			// 	}
			// });
			// if (obj.voting_history) {
			// 	console.log('3');
			// 	for (var i in obj.voting_history){
			// 		if (obj.voting_history[i].id == req.param('id')) {
			// 			res.send('You have voted before!');
			// 		}
			// 		else if(i == obj.voting_history.length-1){
			// 			Resource.findOne(req.param('id'), function(err, obj){

			// 				console.log('vote: ' + req.param('vote'));
			// 				if (req.param('vote') > 0) {
			// 					obj.vote = obj.vote + 1;
			// 				}
			// 				else {
			// 					obj.vote = obj.vote - 1;
			// 				}

			// 				obj.save(function(err, result){
			// 					res.send(result);	
			// 				})

			// 			})
			// 		}
			// 	}

			// }

			
		})

	}
};

