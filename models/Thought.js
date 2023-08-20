const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

// There is a reaction schema
// reactionId - Use Mongoose's ObjectId data type, default value is set to a new ObjectId
// reactionBody - string, required, 280 character maximum
// username(user that created this reaction) - string, required
// createdAt - date, set default value to the current timestamp, use a getter method to format the timestamp on query

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    userName: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAt) => moment(createdAt).format('MMMM Do YYYY, [at] h:mm a'),
    }
}, {
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false
})

// The thought model will have
// thoughtText - string, required, must be between 1 and 280 characters
// createdAt - date, set default value to the current timestamp, use a getter method to format the timestamp on query
// username(user that created this thought) - string required
// reactions - array of nested documents created with the reactionSchema

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAt) => moment(createdAt).format('MMMM Do YYYY, [at] h:mm a'),
    },
    userName: {
        type: String,
        required: true,
    },
    reactions: [ReactionSchema]
}, {
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false
})


// There will also be a virtual called reactionCount that retrieves the length of the thought's reactions array field on query
ThoughtSchema.virtual('reactionCount').get(function () {
    if (this.reactions) {
        return this.reactions.length;
    } else {
        return 0
    }
})

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;