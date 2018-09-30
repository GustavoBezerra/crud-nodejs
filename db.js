//var mongoClient = require("mongodb").MongoClient;
//mongoClient.connect("mongodb://localhost/teste")
 //   .then(conn => global.conn = conn.db("teste"))
  //  .then(err => console.log(err));

function findAll(callback){
    global.conn.collection("customers").find({}).toArray(callback);
}

function insert(customer, callback){
    global.conn.collection("customers").insert(customer, callback);
}

function findUser(username, callback){
    global.conn.collection("users").findOne({"username":username}, function (err, doc){
        callback(err, doc);
    });
}

function findUserById(id, callback){
    const ObjectId = require("mongodb").ObjectId;
    global.conn.collection("users").findOne({_id: ObjectId(id)}, (err, doc) => {
        callback(err, doc);
    });
}

module.exports = { findAll, insert }