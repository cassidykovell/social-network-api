const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    async getUsers(req, res) {
      try {
        const users = await User.find().populate('thoughts');
        res.json(users);
      } catch (err) {
        res.status(500).json(err);
      }
    },

    async getSingleUser(req, res) {
      try {
        const user = await User.findOne({ _id: req.params.userId })
          .populate('thoughts');
  
        if (!user) {
          return res.status(404).json({ message: 'No user with that ID' });
        }
  
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },

    async createUser(req, res) {
      try {
        const user = await User.create(req.body);
        res.json(user);
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },

    async deleteUser(req, res) {
      try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });
  
        if (!user) {
          res.status(404).json({ message: 'No user with that ID' });
        }
  
        await Thought.deleteMany({ _id: { $in: user.thoughts } });
        res.json({ message: 'User and thoughts deleted!' });
      } catch (err) {
        res.status(500).json(err);
      }
    },
  
    async updateUser(req, res) {
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $set: req.body },
          { new: true, runValidators: true }
        );
    
        if (!updatedUser) {
          return res.status(404).json({ message: 'No user found with this ID' });
        }
    
        res.json(updatedUser);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    async deleteThought(req, res) {
      try {
        const deletedThought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
        
        if (!deletedThought) {
          return res.status(404).json({ message: 'No thought found with this ID' });
        }
    
        res.json({ message: 'Thought deleted successfully' });
      } catch (err) {
        res.status(500).json(err);
      }
    }
  }
