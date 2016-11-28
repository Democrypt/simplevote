var Vote = require('../models/vote');
var config = require('../config');
var nodemailer = require('nodemailer');

module.exports = {
	
    sendParticipate: function (vote) {
        // Options
        var options = "";
        vote.options.forEach(function(option) {
            options += option.title + "<br />";
        });
        
        // Participants
        vote.participants.forEach(function(participant) {
            to_participant = participant.email;
            
            // Link
            var link = config.appurl + 'vote/' + vote._id + '/' + participant._id;
            
            // Email
            var smtpTransport = require('nodemailer-smtp-transport');
            
            var transporter = nodemailer.createTransport(smtpTransport({
                host: 'localhost',
                port: 25,
            }));
            
            // create template based sender function
            var sendParticipateVote = transporter.templateSender({
                subject: '[simplevote] new vote: {{question}}',
                text: 'Hello, You vote for the proposition: {{question}}',
                html: '<p>Hello, <br /><br />' +
                    'You vote for the proposition:<br /><strong>{{question}}</strong><br /><br />' +
                    'Options:<br /> <strong>' + options + '</strong><br />' + 
                    'You can <a href="{{ link }}">vote</a><br /><br />' +
                    'Thank you,<br /><br />Democrypt team</p>'
            }, {
                from: 'noreply-simplevote@democrypt.com',
            });
            
            // use template based sender to send a message
            sendParticipateVote({
                to: to_participant
            }, {
                question: vote.question,
                link: link,
            }, function(err, info){
                if(err){
                   console.log('Error');
                }else{
                    console.log('Participate email sent');
                }
            });
        });
    }
	
};