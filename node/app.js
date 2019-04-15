// https://github.com/graalvm/graaljs/blob/master/docs/user/JavaInterop.md
// node --polyglot --jvm --vm.cp=/Users/bcohen/Documents/code/graal-demo/converter/target/classes app.js
var mongodb = require('mongodb');

var ConverterClass = Java.type("org.example.Converter");
var converter = new ConverterClass();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
const client = new MongoClient(url);

client.connect(function(err) {
  if (err) throw err;

  console.log("Database created!");
  const db = client.db('mydb');

  const cursor = db.collection("people").find({});

  cursor.toArray(function(err, documents) {

     if (err) throw err;

     for(var i=0; i < documents.length; i++) {
       var doc = documents[i];

       var HashMap = Java.type('java.util.HashMap');
       var map = new HashMap();
       map.put("first", doc.first);
       map.put("last", doc.last);

       var personJSON = converter.convertToJSON(map);
       var person = JSON.parse(personJSON);

       console.log(JSON.stringify(person, 0, 2));

       console.log(JSON.stringify(doc));
    }
 })
 client.close();
})
