const router = require('express').Router();
const { User, Thought } = require("../../models");

// The /api/thoughts endpoint

// GET /api/thoughts - get all thoughts
router.get('/', (req, res) => {

});

// Get /api/thoughts/:id - get a single thought by its _id
router.get('/:id', (req, res) => {

});

// POST /api/thoughts - create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
router.post('/', (req, res) => {

});

// PUT /api/thoughts/:id - update a thought by its _id
router.put('/:id', (req, res) => {

});

// DELETE /api/thoughts/:id - delete a thought by its _id
router.delete('/:id', (req, res) => {
    
});

module.exports = router;