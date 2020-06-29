const express = require('express');
const router = express.Router();

const db = require('../models');

router.get('/register', function(req,res){
    res.render('auth/register');
})

router.post('/register', function(req,res){
    db.user.findOrCreate({
        where: {
            email: req.body.email
        }, defaults {
            name: req.body.name,
            password: req.body.password
        }
    }).then(function([user,created]){
        //if user was created
        if (created){
            console.log("user created!");
            res.redirect('/');
        } else 
            console.log("User email already exists");
            req.flash('error', 'Error: email already exists');
            res.redirect('/auth/register');
        }.catch(function(err){
            console.log(`Error found Message: ${err.message}.  Please review ${err}`);
            req.flash('error', err.message)
            res.redirect('/auth/register');
        }
        //authenticate user and start authorization process
        // else if user already exists
            //send error user that email already exists
            //redirect back to register get route
    })
})

router.get('/login', function(req,res){
    res.render("auth/login");
})

module.exports = router;