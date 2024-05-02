const router = require('express').Router();
const { getThoughts, getSingleThought, createThought, updateThought, deleteThought } = require('../../controllers/thoughtController');

router.route('/')
  .get(getThoughts)
  .post(createThought);

router.route('/:userId')
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

router.route('/:userId/thoughts/:thoughtId')
  .delete(deleteThought);

module.exports = router;