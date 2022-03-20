const electron = require("electron");
const child_process = require("child_process");
const express = require('express')
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express()
let notes = [];
let db = new sqlite3.Database('notes.sqlite', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to SQlite database.');
});

db.run('CREATE TABLE IF NOT EXISTS notes (id TEXT PRIMARY KEY, title TEXT, content TEXT)');
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, "public/css")));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', function(_req, res) {
    db.all('SELECT * FROM notes', function(err, rows) {
        if (err) {
            return console.error(err.message);
        }
        notes = rows;
        res.render('notesmenu.pug', {
            notes: notes
        });
    });
});
app.use('/notes', function(req, res) {
    if (req.method === 'POST') {
        db.run('INSERT INTO notes (id, title, content) VALUES (?, ?, ?)', [Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 9), req.body.title, req.body.content]);
    }
    if (req.method === 'DELETE') {
        db.run('DELETE FROM notes WHERE id = ?', [req.headers.id]);
        res.sendStatus(200);
        return res.end()
    }
    if (req.method === 'PUT') {
        db.run('UPDATE notes SET title = ?, content = ? WHERE id = ?', [req.body.title, req.body.content, req.params.id]);

    }
    res.redirect('/');
});
app.listen(7829, function(){ 
    console.log('listening on port 7829!')
})
child_process.spawn(electron, ["index.js"]);