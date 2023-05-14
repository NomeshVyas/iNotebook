const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');


//// ROUTE 1: Get All the Notes using: GET "/api/auth/fetchallnotes". Login required
router.get('/fetchallnotes',
  fetchuser,
  async (req,res)=>{
    const notes = await Notes.find({user: req.user.id});
    res.json(notes);
})

//// ROUTE 2: Add a new Note using: POST "/api/auth/addnote". Login required
router.post('/addnote',
  [fetchuser, 
  body('title', 'Enter a valid title').isLength({min: 2}),
  body('description', 'Enter a meaningfull description').isLength({min: 5})],
  async (req,res)=>{
    //// If there are errors, return Bad request and the errors
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()})
    }
    try {
        const {title, description, tag} = req.body;
        const note = new Notes({
            user: req.user.id, title, description, tag
        })
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).json({error: "Internal Server Error"})
    }
  })

module.exports = router