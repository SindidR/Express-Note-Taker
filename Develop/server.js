const fs = require('fs');
const path = require('path');
const express = require('express');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/api/notes/:id', (req,res) =>{
    res.json(notes[req.params.id]);
});
app.get('/api/notes', (req,res) =>{
    fs.readFile('./db/db.json', 'utf-8', (err,data) => {
        if(err) throw err;
        var notes =JSON.parse(data);
        res.JSON(notes);
    });
});
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/notes.html'))
);
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/index.html'))
);


app.post('/api/notes', (req,res) =>{
    fs.readFile('./db/db.json', 'utf-8', (err,data) => {
        if(err) throw err;
        var notes = JSON.parse(data);
        let userNote = req.body;
        userNote.id = Math.floor(Math.random() * 5000);
        notes.push(userNote);
        fs.writeFile('./db/db.json', json.stringify(notes), (err,data) => {
            res.json(userNote);
        })
    });
});

app.delete('/api/notes/:id', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if(err) throw err;
        let notes = JSON.parse(data);
        const newNotes = notes.filter(note => note.id !== parseInt(req.params.id));
        fs.writeFile('./db/db.json', JSON.stringify(newNotes), (err,data) => {
            res.json({msg: 'success'});
        });
    });
});

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`)
})