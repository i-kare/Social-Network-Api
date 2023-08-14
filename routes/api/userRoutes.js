const router = require('express').Router();
const { User, Thought } = require("../../models");

// The /api/users endpoint

// GET /api/user - get all users
router.get('/', (req, res) => {

});

// Get /api/users/:id - get a single user by its _id
router.get('/:id', (req, res) => {

});

// POST /api/users - create a new user with user and email
router.post('/', (req, res) => {

});

// PUT /api/user/:id - update a user by its _id
router.put('/:id', (req, res) => {

});

// DELETE /api/user/:id - delete a user by its _id
router.delete('/:id', (req, res) => {
    
});

// Add new friend to user's friend list
router.post('/:userId/friends/:friendId', (req, res) => {

});

// Delete friend from user's friend list
router.delete('/:userId/friends/:friendId', (req, res) => {

});

module.exports = router;