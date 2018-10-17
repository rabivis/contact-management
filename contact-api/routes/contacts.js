var express = require('express');
var router = express.Router();
var contactModel = require('../models/contacts');
const uuid = require('uuid/v1');

router.route('/')
.all(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type');
    if ('OPTIONS' === req.method) {
      res.send(200);
    }
    else {
      next();
    }
})

.get((req, res, next) => {
    result = contactModel.getAll();
    result.then((contacts) => {
        if(contacts && contacts.length > 0) {
            res.status(200).send(contacts);
        } else {
            res.status(404).send('No contacts found');
        }
    }).catch((err) => {
        next({status: 500, message: err.message});
    });
})


.post((req, res, next) => {
    var id = uuid();
    req.body.id = id;
    if(req.body) {
        result = contactModel.post(req.body);
        result.then(() => {
            res.status(200).send('Successful creation of contact');
        }).catch((err) => {
            next({status: 500, message: err.message});
        })
    } else {
        next({status: 400, message: 'No data is provided/not in proper format'});
    }
})

.put((req, res, next) => {
    if(req.body) {
        result = contactModel.put(req.body);
        result.then(() => {
            res.status(200).send('Successful update of contact');
        }).catch((err) => {
            next({status: 500, message: err.message});
        })
    } else {
        next({status: 400, message: 'No data is provided/not in proper format'});
    }
});


router.route('/:contactId')
.all(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type');
    next();
})

.delete((req, res, next) => {

    if(req.params.contactId) {
        result = contactModel.delete(req.params.contactId);
        result.then(() => {
            res.status(200).send('Successful delete of contact');
        }).catch((err) => {
            next({status: 500, message: err.message});
        });
    } else {
        next({status: 400, message: 'No contact ID is provided/not in proper format'});
    }
})

.get((req, res, next) => {
    if(req.params.contactId) {
        result = contactModel.get(req.params.contactId);
        result.then((contact) => {
            if(contact) {
                res.status(200).send(contact);
            } else {
                res.status(400).send('No contacts found')
            }
        }).catch((err) => {
            next({status: 500, message: err.message});
        });
    } else {
        next({status: 400, message: 'No contact ID is provided/not in proper format'});
    }
})

.options(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type');
    res.send(200);
})

module.exports = router;
