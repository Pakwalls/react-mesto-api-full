function PopupWithForm({formType, formTitle, submitButtonText, children, isOpen, onClose, onSubmit}) {

  return (
    <div className={`popup popup_type_${formType} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button 
        type="button" 
        aria-label="close-popup" 
        className="popup__closer hover-animated"
        onClick={onClose}
        ></button>
        <form
          onSubmit={onSubmit}
          name={`popup__${formType}`}
          className="popup__form">
          <h2 className="popup__title">{formTitle}</h2>
          <fieldset className="popup__data">
            {children}
          </fieldset>
          <button type="submit" className="popup__button">{submitButtonText}</button>      
        </form>  
      </div>
    </div>
  );
}

export default PopupWithForm;