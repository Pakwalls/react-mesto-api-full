import resolveImg from '../images/alert_img_resolve.svg'
import rejectImg from '../images/alert_img_reject.svg';

function InfoTooltip({isOpen, onClose, isConfirmed}) {

  return (
    <div className={`popup popup_type_info-tip ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button 
          type="button" 
          aria-label="close-popup" 
          className="popup__closer hover-animated"
          onClick={onClose}
        ></button>
          {isConfirmed?
            <img className="popup__alert-img" src={resolveImg}/>:
            <img className="popup__alert-img" src={rejectImg}/>}
        <h2 className="popup__alert-message">
          {isConfirmed? 
          "Вы успешно зарегистрировались!":
          "Что-то пошло не так! Попробуйте ещё раз."
          }
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;