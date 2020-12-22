const express = require('express');
const bodyParser = require('body-parser');
const cors = require('./cors');

const AC = require('../models/ac');
const acRouter = express.Router();

acRouter.use(bodyParser.json());

acRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    AC.find({author : req.user._id})
    .then((entries) => {
        let data = [];
        entries.map(entry => {
            data.push({
                QId: entry.QId,
                QState: entry.QState,
                QTt: entry.QTt
            });
        })
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(data);
    },(err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, (req, res, next) => {
    req.body.author = req.user._id;
    const question = new AC({
        QId: req.body.index,
        QState: req.body.choice,
        QTt: req.body.tt,
        author: req.user._id      
    });

    question.save()
    .then((info) => {
        AC.findById(info._id)
        .populate('author')
        .then((info) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({'message' : 'Suceessful'});
        })            
    }, 
    (err) => {
        console.log(err);
        next(err)
    })
    .catch((err) => next(err));    
})
.put(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /ac');
})
.delete(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE opeartion not supported on /ac');
});

module.exports = acRouter;