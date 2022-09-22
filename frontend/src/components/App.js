import Header from './Header.js';
import Footer from './Footer.js';
import Main from './Main.js';
import { useState, useEffect } from 'react';
import { Route, Switch, useHistory, withRouter } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import api from '../utils/api.js';
import EditProfilePopup from './EditProfilePopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import ConfirmPopup from './ConfirmPopup.js';
import ImagePopup from './ImagePopup.js';
import Login from './Login.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip.js';
import ProtectedRoute from './ProtectedRoute.js';
import { register, authorize, getUserData } from '../utils/auth.js';

function App() {
  // -------------------------------------------------------------------------------------------------------------------------- переменная стейта авторизации
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // -------------------------------------------------------------------------------------------------------------------------- булевы стейты
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  // -------------------------------------------------------------------------------------------------------------------------- стейты с объектами
  const [currentUser, setCurrentUser] = useState({name:'', about:''});
  const [cards, setCards] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  // -------------------------------------------------------------------------------------------------------------------------- переменные
  const history = useHistory();
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isImagePopupOpen || isInfoToolTipOpen
  // ---------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((err) => console.error(err))
  }

  const handleCardDelete = (cardId) => {
    api.deleteCard(cardId)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardId));
      })
      .catch((err) => console.error(err))
  }

  useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopup();
      }
    }
    if(isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.fetchCardsList(), api.fetchUserInfo()])
      .then(([cards, user]) => {
        setCards(cards);

        setCurrentUser(user)
      })
      .catch((err) => console.error(err))
    }
    
  },[isLoggedIn])
  
  useEffect(() => {
    tokenCheck();
  }, [isLoggedIn])
 
  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
  
    if (jwt) {
      getUserData(jwt)
      .then((res) => {
        setUserEmail(res.data.email)
        setIsLoggedIn(true);
        history.push('/');
      })
      .catch(err => console.log(err))
    } 
  }

  const handleAuthorization = (data) => {
    return authorize(data)
      .then((res) => {
          setUserEmail(data.email);
          localStorage.setItem('jwt', res.token);
          setIsLoggedIn(true);
          history.push('/');
      })
      .catch((err) => {
        setIsInfoToolTipOpen(true);
        setIsConfirmed(false);
        console.log(err)
      });
  }

  const handleRegistration = (data) => {
    return register(data)
      .then((res) => {
        if (res) {
          setIsConfirmed(true);
          setIsInfoToolTipOpen(true);
          history.push('/sign-in');
        } else {
          setIsConfirmed(false);
        }
      })
      .catch(() => {
        setIsConfirmed(false);
        setIsInfoToolTipOpen(true);
      });
  }

  const handleLogOut = () => {
    setUserEmail('');
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
    history.push('/sign-in');
  }

  const handleUpdateUser = (name, description) => {
    api.patchUserInfo(name, description)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopup();
      })
      .catch((err) => console.error(err))
  }
  
  const handleUpdateAvatar = (avatar) => {
    api.patchAvatar(avatar)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopup();
      })
      .catch((err) => console.error(err))
  }

  const handleAddPlaceSubmit = (name, link) => {
    api.postCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]); 
        closeAllPopup();
      })
      .catch((err) => console.error(err))
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const closeAllPopup = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setIsImagePopupOpen(false);
    setIsInfoToolTipOpen(false);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header 
          isLoggedIn={isLoggedIn}
          email={userEmail}
          onLogout={handleLogOut}
        />
        <Switch>
          <ProtectedRoute 
            exact
            path="/"
            component={Main}
            loggedIn={isLoggedIn}
            cards={cards}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}>
          </ProtectedRoute>

          <Route path="/sign-up">
            <Register
              onRegister={handleRegistration}
            />
          </Route>

          <Route path="/sign-in">
            <Login
              onLogin={handleAuthorization}
            />
          </Route>
        </Switch>
        <Footer />
        
        <InfoTooltip 
          isOpen={isInfoToolTipOpen}
          onClose={closeAllPopup}
          isConfirmed={isConfirmed}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopup}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopup}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopup}
          onUpdateUser={handleUpdateUser}
        />

        <ConfirmPopup
        />

        <ImagePopup
          selectedCard={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopup}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
