// https://github.com/graalvm/graaljs/blob/master/docs/user/JavaInterop.md
// node --polyglot --jvm --vm.cp=/Users/bcohen/Documents/code/graal-demo/converter/target/classes app.js
var mongodb = require('mongodb');

// create an instance of the Java Converter class
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

       console.log(JSON.stringify(doc, 0, 2));

       // create an instance of a Java HashMap to use as an argument to the
       // Java Converter class
       var HashMap = Java.type('java.util.HashMap');
       var map = new HashMap();
       map.put("first", doc.first);
       map.put("last", doc.last);

       // call the convertToJSON on the Java converter class
       var personJSON = converter.convertToJSON(map);
       var person = JSON.parse(personJSON);

       console.log(JSON.stringify(person, 0, 2));
    }
 })
 client.close();
})
