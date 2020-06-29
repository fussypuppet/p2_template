const express = require('express');
const router = express.Router();

const db = require('../models');

router.get('/register', function(req,res){
    res.render('auth/register');
})

router.get('/login', function(req,res){
    res.render("auth/login");
})

module.exports = router;