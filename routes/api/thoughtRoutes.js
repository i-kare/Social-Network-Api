const router = require('express').Router();
const { User, Thought } = require("../../models");

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtControllers');

// The /api/thoughts endpoint

// GET /api/thoughts - get all thoughts
router.get('/', getAllThoughts);

// Get /api/thoughts/:id - get a single thought by its _id
router.get('/:thoughtId', getThoughtById);

// POST /api/thoughts - create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
router.post('/', createThought);

// PUT /api/thoughts/:id - update a thought by its _id
router.put('/:id', updateThought);

// DELETE /api/thoughts/:id - delete a thought by its _id
router.delete('/:id', deleteThought);

// POST to create a reaction stored in a single thought's reactions array field
router.post('/:thoughtId/reactions', createReaction);

// DELETE to pull and remove a reaction by the reaction's reactionId value
router.delete('/:thoughtId/reactions/:reactionId', deleteReaction);

module.exports = router;