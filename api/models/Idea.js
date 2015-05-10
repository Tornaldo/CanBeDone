/**
* Idea.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    attributes: {
      name: {
        type: 'string',
        required: true
      },
      what: {
        type: 'string'
      },
      why: {
        type: 'string'
      },
      poster: {
        model: 'user',
        required: true
      },
      image_url: {
        type: 'string'
      }

    }


  }
};

