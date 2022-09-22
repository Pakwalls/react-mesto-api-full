import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { useContext } from 'react';

function Card({card, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = useContext(CurrentUserContext)
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (
    `${isOwn ? 'article__del-btn' : 'article__del-btn_hidden'}`
  );

  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `article__feedback ${isLiked ? 'article__feedback_active' : ''}`
  ); 

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card._id);
  }

  function handleClick() {
    onCardClick(card);
  }
  
  return (
    <li className="cards__item article">
      <img 
        src={card.link} 
        alt={card.name} 
        className="article__img"
        onClick={handleClick} 
      />
      <div className="article__nameplate">
        <h2 className="article__title">{card.name}</h2>
        <div className="article__like-field">
          <button 
            type="button" 
            aria-label="like-button" 
            name="article__feedback" 
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <p className="article__like-counter">{card.likes.length}</p>
        </div>
      </div>
      <button 
        type="button" 
        aria-label="delete-button" 
        name="article__del-btn" 
        className={`${cardDeleteButtonClassName} hover-animated`}
        onClick={handleDeleteClick}
      ></button>
    </li>
  )
};

export default Card;