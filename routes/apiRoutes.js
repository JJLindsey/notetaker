const router = require('express').Router();
const Notes = require('../db/storeData.js');

router.get('/notes.html', (req, res) => {
    Notes.getNotes()
        .then((notes)=> {
            return res.json(notes)
        })
        .catch((err) => res.status(500).json(err))
});

//POST
router.post('/notes', (req, res) => {
    Notes.createNotes(req.body)
    .then((note) => res.json(note))
    .catch((err) => res.status(500).json(err))
})
//DELETE
router.delete('/notes/:id',(req,res) => {
    Notes.deleteNotes(req.params.id)
    .then(() => res.json({ok:true}))
    .catch((err) => res.status(500).json(err))
})

module.exports = router;