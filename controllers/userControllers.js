const { User, Thought } = require("../models");

module.exports = {
    // Get all users
    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            return res.json(users);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Get user by id
    async getUserById(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id }).populate('friends').populate('thoughts');
            return res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Create a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            return res.json({ message: 'User created!'});
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Update a user by id
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { runValidators: true, new: true });
    
            if (!user) {
                return res.status(404).json({ message: 'No users with this id!' });
            }
    
            return res.json({ message: 'User updated!' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err)
        }
    },

    // Delete a user by id
    async deleteUser(req, res) {
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
    },

    // Add a friend to a user's friend list
    async addFriend(req, res) { 
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { runValidators: true, new: true });
    
            if (!user) {
                return res.status(404).json({ message: 'No users with this id!' });
            }
    
            return res.json({ message: 'Friend added!' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // Delete a friend from a user's friend list
    async deleteFriend(req, res) { 
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { runValidators: true, new: true });
    
            if (!user) {
                return res.status(404).json({ message: 'No users with this id!' });
            }

            return res.json({ message: 'Friend deleted!' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }
}