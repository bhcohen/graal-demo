// https://github.com/graalvm/graaljs/blob/master/docs/user/JavaInterop.md
// node --polyglot --jvm --vm.cp=/Users/bcohen/Documents/code/graal-demo/converter/target/classes app.js
var mongodb = require('mongodb');

var Converter = Java.type("org.example.Converter");
var Person = Java.type("org.example.Person");

// create a Java Converter
var converter = new Converter();

var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/mydb";

const client = new MongoClient(url, { useNewUrlParser: true });

client.connect(function(err) {
  if (err) throw err;

  const db = client.db('mydb');

  const cursor = db.collection("people").find({});

  cursor.toArray(function(err, documents) {

     if (err) throw err;

     for(var i=0; i < documents.length; i++) {
       var doc = documents[i];

       console.log("MongoDB document: " + JSON.stringify(doc, 0, 2));

       // create a Java Person from MongoDB document
       var person = Person.builder()
         .first(doc.first)
         .last(doc.last)
         .build();

       // call the convertToJSON on the Java converter class
       var personJSON = converter.convertToJSON(person);

       person = JSON.parse(personJSON);

       console.log(JSON.stringify(person, 0, 2));
    }
 })
 client.close();
})
