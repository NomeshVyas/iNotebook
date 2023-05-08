const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    object={
        creation: 'Your Name',
        creator: 'Makoto shinkai'
    }
    res.json(object)
})

module.exports = router