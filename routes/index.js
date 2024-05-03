const router = require('express').Router();
const friendsRoutes = require('./api/friendsRoutes');
const reactionRoutes = require('./api/reactionRoutes');
const thoughtRoutes = require('./api/thoughtRoutes');
const userRoutes = require('./api/userRoutes');

router.use('/api/friends', friendsRoutes);
router.use('/api/reactions', reactionRoutes);
router.use('/api/thoughts', thoughtRoutes);
router.use('/api/users', userRoutes);

router.use((req, res) => res.send('Wrong route!'));

module.exports = router;
