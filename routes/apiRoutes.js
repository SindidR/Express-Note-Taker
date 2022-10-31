const store = require('../db/store');
const router = require('express').Router();

router.get('/notes/:id', (req,res) =>{
    res.json(notes[req.params.id]);
});
router.get('/api/notes', (req,res) =>{
    fs.readFile('./db/db.json', (err,data) => {
        if(err) throw err;
        var notes =JSON.parse(data);
        res.JSON(notes);
    });
});



router.post('/notes', (req,res) =>{
    fs.readFile('./db/db.json', (err,data) => {
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

router.delete('/notes/:id', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if(err) throw err;
        let notes = JSON.parse(data);
        const newNotes = notes.filter(note => note.id !== parseInt(req.params.id));
        fs.writeFile('./db/db.json', JSON.stringify(newNotes), (err,data) => {
            res.json({msg: 'success'});
        });
    });
});

module.exports = router;