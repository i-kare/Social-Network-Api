const { User, Thought } = require("../models");

module.exports = {
    // get all thoughts
    async getAllThoughts(req, res) {

    },

    // get a single thought by its _id
    async getThoughtById(req, res) {
    
    },

    // create a new thought and push the created thought's _id to the associated user's thoughts array field
    async createThought(req, res) {
    
    },

    // update a thought by its _id
    async updateThought(req, res) {
    
    },

    // delete a thought by its _id
    async deleteThought(req, res) {
    
    },

    // create a reaction stored in a single thought's reactions array field
    async createReaction(req, res) {
    
    },


    // delete a reaction by the reaction's reactionId value
    async deleteReaction(req, res) {

    },
}