// https://github.com/graalvm/graaljs/blob/master/docs/user/JavaInterop.md
// node --polyglot --jvm --vm.cp=/Users/bcohen/Documents/code/graal-demo/converter/target/classes app.js
var ConverterClass = Java.type("org.example.Converter");
var converter = new ConverterClass();

var HashMap = Java.type('java.util.HashMap');
var map = new HashMap();
map.put("first", "bruce");
map.put("last", "cohen");

var personJSON = converter.convertToJSON(map);
var person = JSON.parse(personJSON);

console.log(JSON.stringify(person, 0, 2));
