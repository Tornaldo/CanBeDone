/*---------------------------------------------------------------
  :: Elasticsearch
  -> waterline adapter
---------------------------------------------------------------*/

var Database = require('./database');
var Errors = require('waterline-errors').adapter;
var _runJoins = require('waterline-cursor');

module.exports = (function() {
  // Hold connections for this adapter
  var connections = {};
  var adapter = {
    // Name
    identity: 'sails-elasticsearch',
    // Which type of primary key is used by default
    pkFormat: 'integer',
    // Whether this adapter is syncable (yes)
    syncable: true,
    // How this adapter should be synced
    migrate: 'alter',
    // Allow a schemaless datastore
    defaults: {
      schema: false
    },
    // Register A Connection
    registerConnection: function(connection, collections, cb) {
      // console.log("registerConnection");
      if (!connection.identity) return cb(Errors.IdentityMissing);
      if (connections[connection.identity]) return cb(Errors.IdentityDuplicate);
      connections[connection.identity] = new Database(connection, collections);
      cb();
    },
    // Find OneByID or All
    find: function(conn, coll, options, cb) {
      // console.log("find");
      grabConnection(conn).select(coll, options, cb);
    },
    // Create
    create: function(conn, coll, values, cb) {
      // console.log("create");
      grabConnection(conn).insert(coll, values, cb);
    },
    // Update
    update: function(conn, coll, options, values, cb) {
      // console.log("update");
      grabConnection(conn).update(coll, options, values, cb);
    },
    // Delete
    destroy: function(conn, coll, options, cb) {
      // console.log("destroy");
      grabConnection(conn).destroy(coll, options, cb);
    }
  };

  function grabConnection(connectionName) {
    return connections[connectionName];
  }

  return adapter;
})();