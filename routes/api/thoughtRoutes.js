const router = require('express').Router();
const { User, Thought } = require("../../models");

// The /api/thoughts endpoint

// GET /api/thoughts - get all thoughts
router.get('/', async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch(err) {
        res.status(500).json(err);
    }
});

// Get /api/thoughts/:id - get a single thought by its _id
router.get('/:thoughtId', async (req, res) => {
    try {
        const thought = await Thought.findOne({_id: req.params.thoughtId});
        res.json(thought);
    } catch(err) {
        res.status(500).json(err);
    }
});

// POST /api/thoughts - create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
router.post('/', async (req, res) => {
    try {
        const thought = await Thought.create(req.body);
        const userID = req.body.userId;
        User.findOneAndUpdate(
            {_id: userID},
            {$push: {thoughts: thought._id}},
            {new: true}
        )
        res.json(thought);
    } catch(err) {
        res.status(500).json(err);
    }

});

// PUT /api/thoughts/:id - update a thought by its _id
router.put('/:id', async (req, res) => {
    try {
        const thought = await Thought.findOneAndUpdate( 
            {_id: req.params.id},
            {$set: req.body},
            {runValidators: true, new: true}
        );

        if (!thought) {
            return res.status(404).json({ message: 'No thoughts with this id!' });
          }
        
          res.json(thought)
    } catch(err) {
        res.status(500).json(err);
    }
});

// DELETE /api/thoughts/:id - delete a thought by its _id
router.delete('/:id', async (req, res) => {
    try {
        const thought = await Thought.findOneAndDelete({_id: req.params.id});

        if(!thought){
            return res.status(404).json({message: 'No thoughts with this id!'});
        }
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;