const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { urlValidator } = require('../middlewares/validation');
const {
  getUser,
  getUsers,
  updateUser,
  updateAvatar,
  getMe,
} = require('../controllers/users');

// GET me
router.get('/users/me', getMe);

// GET users
router.get('/users', getUsers);

// GET user
router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).alphanum(),
  }),
}), getUser);

// PATCH user
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

// PATCH avatar
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().min(2).custom(urlValidator),
  }),
}), updateAvatar);

module.exports = router;
