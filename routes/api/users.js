const express = require("express");
const routes = express.Router();
const gravatar = require("gravatar");
const User = require("../../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

routes.get("/test", (req, res) => res.json({ msg: "users working" }));

routes.post('/register', (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200', // Size
        r: 'pg', // Rating
        d: 'mm' // Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

routes.post('/login', (req,res) => {
  const email = req.body.email;
  const  password = req.body.password;
  User.findOne({email}).then(user => {
    if(!user){
      res.status(404).json({email: 'user not exists'});
    }
    bcrypt.compare(password, user.password).then(isMatch =>{
      if(isMatch){
        // res.json({msg:'success'});
        const payload = {id: user.id, name: user.name,  avatar: user.avatar };
        jwt.sign(payload, keys.secretOrKey,{expiresIn : 3600} ,(err, token) =>{
              res.json({
                success: true,
                token: 'Bearer ' + token 
              })
        });
      }else{
        res.status(400).json({msg: 'no such user' });
      }
    });
  });
});

routes.get('/current', passport.authenticate('jwt', {session: false}), (req,res) => {
  return res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  });
})
module.exports = routes;
