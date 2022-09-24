const validator = require('validator');
const { CelebrateError } = require('celebrate');

module.exports.urlValidator = (url) => {
  if (validator.isURL(url)) {
    return url;
  }
  throw new CelebrateError('Некорректный адрес url');
};

module.exports.mailValidator = (email) => {
  if (validator.isEmail(email)) {
    return email;
  }
  throw new CelebrateError('Почтовый адрес введен некорректно');
};
