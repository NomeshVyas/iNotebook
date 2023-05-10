const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', (req,res)=>{
    console.log(req.body);
    const user = new User(req.body);
    user.save();
    res.send("Done");
})

module.exports = router