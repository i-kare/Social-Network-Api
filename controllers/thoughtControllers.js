const { User, Thought } = require("../models");

module.exports = {
    // get all thoughts
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },

    // get a single thought by its _id
    async getThoughtById(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });
            res.json(thought);
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },

    // create a new thought and push the created thought's _id to the associated user's thoughts array field
    async createThought(req, res) {
        try {
            Thought.create(req.body).then((thoughtData) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: thoughtData._id } },
                    { new: true }
                )
            }).then(user => {
                if (!user) {
                    res.status(404).json({ message: 'No user with this id!' });
                    return;
                } else {
                    res.json({ message: 'Thought created!' });
                }
            })
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },

    // update a thought by its _id
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thoughts with this id!' });
            }

            res.json({ message: 'Thought updated!' })
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },

    // delete a thought by its _id
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.id });

            if (!thought) {
                return res.status(404).json({ message: 'No thoughts with this id!' });
            }
            res.json({ message: 'Thought deleted!' });
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },

    // create a reaction stored in a single thought's reactions array field
    async createReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $addToSet: { reactions: req.body } }, { runValidators: true, new: true });
            if (!reaction) {
                return res.status(404).json({ message: 'No thoughts with this id!' });
            }
            res.json({ message: 'Reaction created!' });
        } catch (err) {
            res.status(500).json(err);
            console.log(err)
        }
    },


    // delete a reaction by the reaction's reactionId value
    async deleteReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { runValidators: true, new: true });
            if (!reaction) {
                return res.status(404).json({ message: 'No thoughts with this id!' });
            }
            res.json({ message: 'Reaction deleted!' });
        } catch (err) {
            console.log(err)
            res.status(500).json(err);
        }
    },
}