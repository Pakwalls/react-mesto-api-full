import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import PopupWithForm from "./PopupWithForm.js";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const currentUser = useContext(CurrentUserContext);

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    
    onUpdateUser(
      name,
      description,
    );
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);


  return (
    <PopupWithForm
      formType={'edit-form'}
      formTitle={'Редактировать профиль'}
      submitButtonText={'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={handleNameChange}
        type="text"
        className="input input_theme_day"
        id="name-field"
        name="name"
        minLength="2"
        maxLength="40"
        placeholder="Имя"
        required/>
      <span className="popup__error" id="name-field-error"></span>
      <input
        value={description}
        onChange={handleDescriptionChange}
        type="text"
        className="input input_theme_day"
        id="about-field"
        name="about"
        minLength="2"
        maxLength="200"
        placeholder="Подпись"
        required/>
      <span className="popup__error" id="about-field-error"></span>

    </PopupWithForm>
  )
}

export default EditProfilePopup;