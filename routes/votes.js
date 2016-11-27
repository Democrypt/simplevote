var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Vote = require('../models/vote');

var voteRouter = express.Router();
voteRouter.use(bodyParser.json());

var Verify = require('./verify');

voteRouter.route('/')

    .all(Verify.verifyOrdinaryUser)
    
    .get(Verify.verifyOrdinaryUser, function (req, res, next) {
        // Get all user favorites and populate
        Vote.find({})
            // .populate('postedBy dishes')
            .exec(function (err, votes) {
            if(err) return next(err);
            res.json(votes);
        })
    })
    
    // Create a vote
    .post(function (req, res, next) {
        var userId = req.decoded._doc._id;
        req.body.postedBy = userId;
        
        Vote.create(req.body, function (err, vote) {
            if(err) return next(err);
            console.log('Vote created!');
            var id = vote._id;

            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end('Added the vote with id: ' + id);
        })
    })
    
    .delete(function (req, res, next) {
        Vote.remove({}, function (err, resp) {
            if(err) return next(err);
            res.json(resp);
        })
    })

voteRouter.route('/:voteId')

    .all(Verify.verifyOrdinaryUser)

    .get(function (req, res, next) {
        Vote.findById(req.params.voteId, function (err, vote) {
            if(err) return next(err);
            res.json(vote);
        })
    })

    .put(function (req, res, next) {
        Vote.findByIdAndUpdate(req.params.voteId, {
            $set: req.body
        }, {
            new: true
        }, function (err, vote) {
            if(err) return next(err);
            res.json(vote);
        })
    })

    .delete(function (req, res, next) {
        // Vote.findByIdAndRemove(req.params.voteId, function (err, resp) {        if(err) return next(err);
            // res.json(resp);
        // });
    })
    
module.exports = voteRouter;