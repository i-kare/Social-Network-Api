const router = require('express').Router();
const { User, Thought } = require("../../models");

// The /api/thoughts endpoint

// GET /api/thoughts - get all thoughts
router.get('/', async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

// Get /api/thoughts/:id - get a single thought by its _id
router.get('/:thoughtId', async (req, res) => {
    try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId });
        res.json(thought);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

// POST /api/thoughts - create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
router.post('/', async (req, res) => {
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

});

// PUT /api/thoughts/:id - update a thought by its _id
router.put('/:id', async (req, res) => {
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
});

// DELETE /api/thoughts/:id - delete a thought by its _id
router.delete('/:id', async (req, res) => {
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
});

// POST to create a reaction stored in a single thought's reactions array field
router.post('/:thoughtId/reactions', async (req, res) => {
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

});

// DELETE to pull and remove a reaction by the reaction's reactionId value
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
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
});

module.exports = router;