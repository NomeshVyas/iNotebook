const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

router.post('/',
  [body('name', 'Enter a valid name').notEmpty(),
  body('email', 'Enter a valid E-mail').isEmail(),
  body('password', 'Enter a strong password').isLength({min: 5})
  ],
  (req,res)=>{
    const error = validationResult(req);
    if (!error.isEmpty()) {
    return res.status(400).json({error: error.array()})
    }
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }).then(user=>res.json(user));
})

module.exports = router