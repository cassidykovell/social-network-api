const { Thought } = require('../models');

const reactionController = {
  async createReaction(req, res) {
    try {
      const thoughtId = req.params.thoughtId;
      const newReaction = req.body;

      const thought = await Thought.findById(thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      thought.reactions.push(newReaction);
      await thought.save();

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