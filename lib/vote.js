var Vote = require('../models/vote');
var emailUtils = require("../lib/email.js");

module.exports = {
    // Check started and finished
    check: function () {
        this.notStarted();
        this.notFinished();
    },
    
    // Find all not started votes
    notStarted: function () {
        Vote.find({ status: 0 })
            .exec(function (err, votes) {
            if(err) return next(err);
            votes.forEach(function(vote) {
                // Start vote
                vote.status = 1;
                vote.save(function(err, vote) {
                    // Email to participants
                    emailUtils.sendParticipate(vote);
                    console.log("Start email sent");
                });
				
            });
        })
    },
    
    // Find all not finished votes
    notFinished: function () {
        Vote.find({ status: 1 })
            .exec(function (err, votes) {
            if(err) return next(err);
            votes.forEach(function(vote) {
                // All participants votes
                var date = new Date();
                if (vote.nbParticipation >= vote.totalParticipation || date >= vote.endAt) {
                    // End vote
                    vote.status = 2;
                    vote.save(function(err, vote) {
                        // Email to participants
                        emailUtils.sendParticipate(vote);
                        console.log("Finish email sent");
                    });
                }
                
            });
        })
    }
};
