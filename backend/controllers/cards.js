const Card = require('../models/card');
const BadRequestError = require('../utils/errors/BadRequestError');
const NotFoundError = require('../utils/errors/NotFoundError');
const ForbiddenError = require('../utils/errors/ForbiddenError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

module.exports.postCard = (req, res, next) => {
  const { name, link } = req.body;
  const userId = req.user._id;

  Card.create({ name, link, owner: userId })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные'));
      }
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      next(new NotFoundError('Карточка с указанным _id не найдена'));
    })
    .then((card) => {
      if (card.owner.equals(req.user._id)) {
        return card.remove()
          .then(() => res.send({ message: 'Карточка удалена!' }));
      }
      return next(new ForbiddenError('Нельзя удалять чужие карточки'));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректные данные'));
      }
      next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) res.status(200).send(card);
      else next(new NotFoundError('Карточка с указанным _id не найдена'));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректные данные'));
      }
      next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (card) {
        return res.status(200).send(card);
      }
      return next(new NotFoundError('Карточка не найдена'));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректные данные'));
      }
      return next(err);
    });
};
