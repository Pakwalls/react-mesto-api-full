import PopupWithForm from "./PopupWithForm.js";
import { useState, useEffect } from 'react';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleLinkChange(e) {
    setLink(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace(name, link);
  }

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  return (
    <PopupWithForm
      formType={'add-form'}
      formTitle={'Новое место'}
      submitButtonText={'Создать'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>

      <input
        value={name}
        onChange={handleNameChange}
        type="text"
        className="input input_theme_day"
        id="place-name"
        name="name"
        minLength="2"
        maxLength="30"
        placeholder="Название"
        required />
      <span className="popup__error" id="place-name-error"></span>
      <input
        value={link}
        onChange={handleLinkChange}
        type="url"
        className="input input_theme_day"
        id="place-link"
        name="link"
        placeholder="Ссылка на картинку"
        required />
      <span className="popup__error" id="place-link-error"></span>

    </PopupWithForm>
  )
}

export default AddPlacePopup;