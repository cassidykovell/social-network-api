const { Thought } = require('../models');

const reactionController = {
  async createReaction(req, res) {
    try {
     const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body }},
     );
     if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
     }
     res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  },

  async deleteReaction(req, res) {
    try {
      const { thoughtId, reactionId } = req.params;

      const thought = await Thought.findById(thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      thought.reactions = thought.reactions.filter(reaction => reaction._id.toString() !== reactionId);
      await thought.save();

      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  },
};

module.exports = reactionController;