![image_squidhome@2x.png](http://i.imgur.com/RIvu9.png)

# waterline-elasticsearch

Provides easy access to `elasticsearch` from Sails.js & Waterline.

### Installation

To install this adapter, run:

```sh
$ npm install waterline-elasticsearch
```


### Configuration

```js
var orm = new Waterline();

var config = {
	adapters: {
	    elasticsearch: require('waterline-elasticsearch')
	},
	connections: {
	    myLocalElasticsearch: {
	        adapter: 'elasticsearch',
	        host: 'localhost',
	        port: 9200,
	        log: 'warning',
	        index: '<index to use>'
	    }
	}
};

```

### Usage

```js
var createModel = function(orm, identity, connection, tablename) {
    console.log("Using connection: " + connection + " for object: " + identity);
    var obj = Waterline.Collection.extend({
        identity: identity,
        tableName: tablename ? tablename : identity + 's',
        connection: connection,
        attributes: {
            id: {
                type: 'integer',
                primaryKey: true,
                // required: true,
                index: true
            }
        }
    });
    orm.loadCollection(obj);
}

createModel(orm, 'note', 'myLocalElasticsearch', 'notes');

orm.initialize(config, function(err, models) {
    if (err) throw err;
    app.models = models.collections;
});

app.models[note].findOne({
    id: id
}).exec(function(err, model) {
    if (err) console.log(err);
    console.log(model);
});

```


This adapter exposes the following methods:

###### `find()`

+ **Status**
  + Done

###### `findOne()`

+ **Status**
  + Done

###### `create()`

+ **Status**
  + Done

###### `update()`

+ **Status**
  + Done

###### `destroy()`

+ **Status**
  + Done
