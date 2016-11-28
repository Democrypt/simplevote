// grab the things we need
var mongoose = require('mongoose')
    , Schema = mongoose.Schema;
var Schema = mongoose.Schema;

// Option schema
var optionSchema = new Schema({
    title:  {
        type: String,
        required: true
    },
})

// create a model using it
var Option = mongoose.model('Option', optionSchema);

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

// create a model using it
var Participant = mongoose.model('Participant', participantSchema);

// Vote schema
var voteSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    nbParticipation: {
        type: Number,
        default: 0
    },
    totalParticipation: {
        type: Number,
        default: 0
    },
    status: {
        type: Number,
        default: 0
    },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    options:[optionSchema],
    participants:[participantSchema],
    endAt: {
        type: Date
    }
}, {
    timestamps: true
})

// create a model using it
var Vote = mongoose.model('Vote', voteSchema);

// make this available to our Node applications
module.exports = Vote;