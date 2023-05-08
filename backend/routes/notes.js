const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    obj={
        Art: 'Attack onTitan',
        Artist: 'Hajime Isayama'
    }
    res.json(obj)
})

module.exports = router