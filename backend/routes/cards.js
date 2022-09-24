const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { urlValidator } = require('../middlewares/validation');
const {
  getCards, postCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

// GET cards
router.get('/cards', getCards);

// POST card
router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(urlValidator),
  }),
}), postCard);

// DELETE card
router.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).alphanum(),
  }),
}), deleteCard);

// LIKE card
router.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).alphanum(),
  }),
}), likeCard);

// DISLIKE card
router.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).alphanum(),
  }),
}), dislikeCard);

module.exports = router;
