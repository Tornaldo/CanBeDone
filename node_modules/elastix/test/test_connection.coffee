fs = require("fs")
log = console.log
colors = require('colors')
logjson = (j,color="green")->
  j = JSON.parse(j) if(typeof j is "string")
  j = JSON.stringify(j,null,2)
  log j[color]
Elastix = require('../index.js')
elx = new Elastix()
# test_config = JSON.parse(fs.readFileSync("./test_config.json","utf8")) 
# elx = new Elastix(test_config.url)

location = {
  _index:"nixProductionV10",
  _type:"test"
}


# indexes a document into the given location
elx.document(location).index({
  # Set your own ID
  _id:"51c3c1ed97c3e6d8d3b49b5a",
  # pass to qs params
  # params:{
  #   # check version before saving
  #   version:6
  # },
  # Set the document to be indexed
  _source:{
    # Set your own ID
    something:1,
    new:2
  }
},(err,data)->
  console.log("INDEXING".yellow)
  log(err.message.red) if err
  logjson(data)
  
  # Returns a document by its id
  elx.document(location).get("51c3c1ed97c3e6d8d3b49b5a",(err,data)->
    console.log("GETTING".yellow)
    return log(err,"red") if err
    logjson(data)

    # Returns an updated document
    elx.document(location).update({
      _id:"51c3c1ed97c3e6d8d3b49b5a",
      # Set the attributes to be updated
      _source:{doc:{something:3000000}},
      params:{pretty:true},
    },(err,data)->
      console.log("UPDATING".yellow)
      log(err.message.red) if err
      logjson(data)

      # Delete a document by its id
      elx.document(location).delete("51c3c1ed97c3e6d8d3b49b5a",(err,data)->
        console.log("DELETING".yellow)
        return log(err,"red") if err
        logjson(data)
        
        # Try to find an item that dosnt exist
        elx.document(location).delete("51c3c1ed97c3e6d8d3b49b5a",(err,data)->
          console.log("SHOULD ERROR".yellow)
          log(err.toString().red) if err
          logjson(data)
        )

      )

    )

  )

)



