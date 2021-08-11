var MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

var service= {};
var dbName = 'nodejs';
const url = 'mongodb://localhost:27017';

service.getCustomers = function(callback){
  MongoClient.connect(url, { useNewUrlParser: true },function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
      db.collection('customers').find().toArray(function (err, result) {
        if (err) throw err
        //console.log(result);
        callback(result);
      });
    client.close();
  });
};

service.getCustomerById = function(id,callback){
  var record = {};
    console.log(">> getCustomerById "+ id);
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
      db.collection('customers').find({"_id" : ObjectId(id)}).toArray(function (err, result) {
        if (err) throw err
        console.log(result);
        callback(result[0]);
      });
    client.close();
  });
};

service.addCustomer = function(record,callback) {
  MongoClient.connect(url, { useNewUrlParser: true },function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection = db.collection('customers');
    collection.insertMany([record],function(err,result){
      callback({result:'success'});
    });
    client.close();
  });
}

service.deleteCustomer = function(id,callback){
  MongoClient.connect(url, { useNewUrlParser: true },function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection = db.collection('customers');
    collection.deleteOne({"_id" : ObjectId(id)},function(err,result){
      callback({result:'success'});
    });
    client.close();
  });
};

service.updateCustomer = function(customer,callback){
    console.log("update::"+JSON.stringify(customer));
    let id = customer.id;
    delete(customer.id);
    MongoClient.connect(url, { useNewUrlParser: true },function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
    const collection = db.collection('customers');
    collection.updateOne({"_id" : ObjectId(id)},{ $set: customer },function(err,result){
      callback({result:'success'});
    });
    client.close();
  });
};

service.getCustomersBySearch = function(searchParam,callback){
    var records = [];
    //searhObject[searchParam.field] = "/"+searchParam.searchword+"/i";
    //console.log("search ==> "+JSON.stringify(searchParam));
    MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);
      db.collection('customers').
      find({[searchParam.field]:
        {'$regex' : searchParam.searchText, '$options' : 'i'}}).toArray(
        function (err, result) {
        if (err) throw err
        console.log("result:"+JSON.stringify(result));
        callback(result);
        });
        client.close();
    });
};   

module.exports=service;
