const { ObjectId } = require('mongoose').Types;
const { User, Thought, Reaction } = require('../models');

const addFriend = (req, res) => {
    const { userId, friendId } = req.params;
  
    res.json({
      message: `Friend with id ${friendId} added to user with id ${userId}'s friend list`,
    });
  };
  
  const removeFriend = (req, res) => {
    const { userId, friendId } = req.params;
  
    res.json({
      message: `Friend with id ${friendId} removed from user with id ${userId}'s friend list`,
    });
  };
  
  module.exports = { addFriend, removeFriend };