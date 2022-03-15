const electron = require("electron");
const child_process = require("child_process");
const express = require('express')
const path = require('path')
const app = express()
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, "public/css")));
app.use(express.static(path.join(__dirname, "public/js")));
app.post('/post', function (req, res) {
    console.log(req, res)
    console.log(req.query);
    console.log(req.body);
    res.send('Hello World')
})
app.get('/', function(req, res) {
    res.render('notesmenu.pug')
})
app.listen(3000, function(){ 
    console.log('listening on port 3000!')
})
child_process.spawn(electron, ["index.js"]);
