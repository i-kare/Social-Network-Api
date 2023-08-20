const router = require('express').Router();
const { User, Thought } = require("../../models");

// The /api/users endpoint

// GET /api/user - get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        return res.json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Get /api/users/:id - get a single user by its _id
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id }).populate('friends').populate('thoughts');
        return res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// POST /api/users - create a new user with user and email
router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body);
        return res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// PUT /api/user/:id - update a user by its _id
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { runValidators: true, new: true });

        if (!user) {
            return res.status(404).json({ message: 'No users with this id!' });
        }

        return res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
});

// DELETE /api/user/:id - delete a user by its _id
router.delete('/:id', async (req, res) => {
    try {
        User.findOneAndDelete({ _id: req.params.id }).then((user)=> {
            if(!user) {
                return res.status(404).json({ message: 'No users with this id!' });
            }

            return Thought.deleteMany({ _id : { $in: user.thoughts } });
        })

        return res.json({ message: 'User deleted and their thoughts' });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Add new friend to user's friend list
router.post('/:userId/friends/:friendId', async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { runValidators: true, new: true });

        if (!user) {
            return res.status(404).json({ message: 'No users with this id!' });
        }

        return res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Delete friend from user's friend list
router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
        const user = await User.findOneAndDelete({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { runValidators: true, new: true });
        
        if(!user){
            return res.status(404).json({ message: 'No users with this id!' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;