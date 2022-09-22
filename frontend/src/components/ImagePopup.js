function ImagePopup({selectedCard, isOpen, onClose}) {
  
  return (
    <div className={`popup popup_type_show ${isOpen ? 'popup_opened' : ''}`}>
      <figure className="popup__figure">
        <button 
          type="button" 
          aria-label="close-popup" 
          className="popup__closer hover-animated"
          onClick={onClose}
        ></button>
        <img src={selectedCard.link} alt={selectedCard.name} className="popup__img" />
        <figcaption className="popup__figcaption">{selectedCard.name}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;