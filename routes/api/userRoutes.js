const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require("../../controllers/userControllers");
// The /api/users endpoint

// GET /api/user - get all users
router.get('/', getAllUsers);

// Get /api/users/:id - get a single user by its _id
router.get('/:id', getUserById);

// POST /api/users - create a new user with user and email
router.post('/', createUser);

// PUT /api/user/:id - update a user by its _id
router.put('/:id', updateUser);

// DELETE /api/user/:id - delete a user by its _id
router.delete('/:id', deleteUser);

// Add new friend to user's friend list
router.post('/:userId/friends/:friendId', addFriend);

// Delete friend from user's friend list
router.delete('/:userId/friends/:friendId', deleteFriend);

module.exports = router;