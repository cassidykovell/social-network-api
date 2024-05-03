const router = require('express').Router();
const { addFriend, removeFriend } = require('../../controllers/friendsController');

router.post('/api/users/:userId/friends/:friendId', addFriend);

router.delete('/api/users/:userId/friends/:friendId', removeFriend);

module.exports = router;