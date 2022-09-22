import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { useContext } from 'react';

function Main({cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext)


  return (
    <main className="content">
      <section className="profile">
        <div className="profile__card">
          <div className="profile__avatar">
            <button 
              type="button" 
              aria-label="change-avatar" 
              className="profile__img-changer"
              onClick={onEditAvatar}
            ></button>
            <div 
              className="profile__img"
              style={{ backgroundImage: `url(${currentUser.avatar})` }}  />
          </div>
          <div className="profile__description">
            <div className="profile__title-box">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button 
                type="button" 
                aria-label="edit-popup" 
                className="profile__edit-btn hover-animated"
                onClick={onEditProfile}
                ></button>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button 
          type="button" 
          aria-label="add-picture" 
          className="profile__add-btn hover-animated"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="elements">
        <ul className="cards">
          {cards.map((card) => (
            <Card 
              key={card._id}
              card={card} 
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}/>
            ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
