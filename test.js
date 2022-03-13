const { Config } = require('node-json-db/dist/lib/JsonDBConfig')
const { JsonDB } = require('node-json-db');
var db = new JsonDB(new Config("myDataBase", true, false, '/'));
db.push('/e', {'a': 'e'}, false)