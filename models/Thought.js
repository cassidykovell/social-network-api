const mongoose = require('mongoose');
const { Schema } = mongoose;
const reactionSchema = require('./Reaction'); 


const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        maxlength: 280,
        minlength: 1,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    username: {
        type: String,
        required: true,
    },
    reactions: {
        reactions: [reactionSchema]
    }
}, {
    toJSON: {
        getters: true,
    },
    id: false,
});

thoughtSchema.virtual('formattedCreatedAt').get(function() {
    return this.createdAt.toLocaleString(); 
});

module.exports = thoughtSchema;