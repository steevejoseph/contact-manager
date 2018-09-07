// routes will start with /api/:something

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Contact = require('../models/contact.js');
const user = require('../models/user.js');
mongoose.connect('mongodb://team7:ABC123@ds133152.mlab.com:33152/contact-manager', {useNewUrlParser: true});
//calls to this .js should already be at '/api' so here is just handeling the '/' after '/api'
router.get('/api/users/', (req, res, next) => {
    res.status(200).json({
        message: 'handeling get requests to api/users'
    });
    
});

router.post('/api/contacts', (req, res, next) => {
    res.status(200).json({
        message : 'handeling post requests to /api/contacts'
    });
});

router.get('/api/users/:id/search/', (req, res, next) => {
    var id = req.params.id;
    var query = req.body.query;
    
    
    res.status(200).json({
        message : 'search for contacts with id: ' + id
    });
    
});

router.get('/api/ids', (req, res, next) => {
    
})

router.post('/api/:id/addcontact', (req, res, next) => {
    
    
    var name = req.body.firstName;
    
    const contact = new Contact({
        firstName: name,
        lastName: req.body.lastName,
        mobilePhone: req.body.mobilePhone,
        homePhone: req.body.homePhone,
        email: req.body.email,
        birthday: req.body.Date,
        user: req.params.id
    });
    contact.save();
    res.status(200).json({
        message: 'handeling post requests for /api/users/:id/addcontact',
        createdContact: contact
    });
    console.log(contact);
});

module.exports = router;