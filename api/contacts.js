// routes will start with /api/:something

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Contact = require('../models/contact.js');
const user = require('../models/user.js');
mongoose.connect('mongodb://team7:ABC123@ds133152.mlab.com:33152/contact-manager', {useNewUrlParser: true});


router.get('/api/users/:id/search/:query', (req, res, next) => {
    var query = req.params.query;
    var userID = req.params.id;
    Contact.find({firstName:query, user:userID}, function(err, contacts) {
        if(err) {
            console.log(err);
        }
        else {
            for(var i = 0; i < contacts.length; i++) {
                console.log(contacts[i]);
            }
            {contacts:contacts};
        }
    
    
    res.status(200).json({
        message : 'search for ' + query,
        contactsList: contacts
    });
    
});
});

router.post('/api/users/:id/addcontact', (req, res, next) => {
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
    res.status(201).json({
        message: 'handeling post requests for /api/users/:id/addcontact',
        createdContact: contact
    });
    console.log(contact);
});

module.exports = router;