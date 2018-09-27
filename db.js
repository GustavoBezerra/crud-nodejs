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


require('dotenv-safe').load();
const mongoClient = require("mongodb").MongoClient;
mongoClient.connect(process.env.MONGO_CONNECTION, function(err, conn){
  if(err) { return console.log(err); }
  console.log("conectou no banco de dados!");
  global.conn = conn.db(process.env.MONGO_DB); 
})

module.exports = { findAll, insert }