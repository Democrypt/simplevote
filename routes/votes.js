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
            .populate('options postedBy')
            .exec(function (err, votes) {
            if(err) return next(err);
            
            res.json(votes);
        })
    })
    
    // Create a vote
    .post(function (req, res, next) {
        // User id
        var userId = req.decoded._doc._id;
        req.body.postedBy = userId;
        // Total participation
        var totalParticipation = Object.keys(req.body.options).length;
        req.body.totalParticipation = totalParticipation;
        // Date end
        var dateEnd = new Date(new Date().getTime() + 60 * 60 * req.body.hours * 1000);
        
        // Create vote
        Vote.create(req.body, function (err, vote) {
            if(err) return next(err);
            
            res.json(vote);
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

    // Get a vote
    .get(function (req, res, next) {
        // Get the vote
        Vote.findById(req.params.voteId, function (err, vote) {
            if(err) return next(err);
            res.json(vote);
        })
    })

    // Vote an option
    .put(function (req, res, next) {
        // Get data
        optionId = req.body.option;
        userId = req.body.user;
        
        // Get the vote
        Vote.findByIdAndUpdate(req.params.voteId, {$inc : { nbParticipation : 1 }}, function (err, vote) {
            if(err) return next(err);
            // Update participant
            Vote.update({'participants._id': userId}, {'$set': {
                'participants.$.status': 1
            }}, function(err, vote) {
                res.json({"success":"true"});
            });
        });
    })

    .delete(function (req, res, next) {
        // Vote.findByIdAndRemove(req.params.voteId, function (err, resp) {        if(err) return next(err);
            // res.json(resp);
        // });
    })
    
module.exports = voteRouter;