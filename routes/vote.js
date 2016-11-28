var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Vote = require('../models/vote');

var voteRouter = express.Router();
voteRouter.use(bodyParser.json());

var Verify = require('./verify');

voteRouter.route('/:voteId/:participantId')

    // Get a vote
    .get(function (req, res, next) {
        var participantId = req.params.participantId;
        
        // Get the vote
        Vote.findById(req.params.voteId)
            .exec(function (err, vote) {
                if (err) return handleError(err);
                
                // Get current participant
                var currentParticipant;
                vote.participants.forEach(function(participant) {
                    if (participant._id == participantId) {
                        currentParticipant = participant;
                    }
                });
                
                if (!currentParticipant) {
                    return res.status(403).json({"error":1, "message":"participant_not_found"});
                } else if (currentParticipant.status == 1) {
                    return res.status(200).json({"error":1, "message":"participant_already_voted"});
                }
                
                // Format vote without important data
                var participation = {
                    _id: vote._id,
                    question: vote.question,
                    participant: participantId,
                    options: []
                };
                
                vote.options.forEach(function(option) {
                    participation.options.push({ "_id" : option.title, "title" : option.title});
                });
                
                res.json(participation);
        })
    })

    // Vote an option
    .put(function (req, res, next) {
        // Get data
        var optionId = req.body.option;
        var participantId = req.params.participantId;
        
        console.log('optionId ' + optionId);
        console.log('participantId ' + participantId);
        
        // Get and update the vote
        Vote.findByIdAndUpdate(req.params.voteId, {$inc : { nbParticipation : 1 }}, function (err, vote) {
            
            // Get current participant
            var currentParticipant;
            vote.participants.forEach(function(participant) {
                if (participant._id == participantId) {
                    currentParticipant = participant;
                }
            });
            
            if (!currentParticipant) {
                return res.status(403).json({"error":1, "message":"participant_not_found"});
            } else if (currentParticipant.status == 1) {
                return res.status(403).json({"error":1, "message":"participant_already_voted"});
            }
            
            if(err) return next(err);
            // Update participant
            Vote.update({'participants._id': participantId}, {'$set': {
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