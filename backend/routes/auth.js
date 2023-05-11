const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const JWT_SECRET = "Nomeshis@goodb0y"

//// Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser',
  [body('name', 'Enter a valid name').isLength({ min: 2 }),
  body('email', 'Enter a valid E-mail').isEmail(),
  body('password', 'Enter a strong password').isLength({min: 5})
  ],
  async (req,res)=>{
    //// If there are errors, return Bad request and the errors
    const error = validationResult(req);
    if (!error.isEmpty()) {
    return res.status(400).json({error: error.array()})
    }
    try{
      //// Check whether the user with this email exists already
      let user = await User.findOne({email: req.body.email});
      if(user){
        return res.status(400).json({error: "sorry a user with this email is already exists"})
      }
    //// Securing password through hash and salt
    const salt = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(req.body.password, salt);
    //// Create a new user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: securePassword
    })

    const data={
      user:{
        id: user.id
      }
    }
    var authToken = jwt.sign(data, JWT_SECRET);

    res.json(authToken)
    // res.json(user)
    }
    catch (err) {
      console.error(err.message);
      res.status(500).send("some error occured")
    }
})

module.exports = router