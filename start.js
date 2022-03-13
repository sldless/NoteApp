const electron = require("electron");
const child_process = require("child_process");
const express = require('express')
const path = require('path')
const app = express()
app.use(express.json());
app.set('views', path.join(__dirname, 'html'));
app.set('view engine', 'pug');
app.post('/post', function (req, res) {
    console.log(req.query);
    console.log(req.body);
    res.send('Hello World')
})

app.listen()
child_process.spawn(electron, ["."]);