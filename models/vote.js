// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Option schema
var optionSchema = new Schema({
    title:  {
        type: String,
        required: true
    },
})

// Participant schema
var participantSchema = new Schema({
    email:  {
        type: String,
        required: true
    },
    status:  {
        type: Number,
        default: 0
    },
}, {
    timestamps: true
})

// Vote schema
var voteSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    
    status: {
        type: Number,
        default: 0
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    options:[optionSchema],
    participants:[participantSchema]
}, {
    timestamps: true
})

// create a model using it
var Votes = mongoose.model('Vote', voteSchema);

// make this available to our Node applications
module.exports = Votes;
