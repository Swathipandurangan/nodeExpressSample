var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017',{ useNewUrlParser: true }, function (err, client) {
  if (err) throw err

  var db = client.db('nodejs')

  db.collection('customers').find().toArray(function (err, result) {
    if (err) throw err

    console.log(result)
  })
});
