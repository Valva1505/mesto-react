import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

import CurrentUserContext from '../contexts/CurrentUserContext';
import { api } from '../utils/API';
import * as auth from '../utils/auth';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';

import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [infoTooltipPopup, setInfoTooltipPopup] = useState(false);
  const [errorInfoTooltipPopup, setErrorInfoTooltipPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userInfo, initialCards]) => {
          setCurrentUser(userInfo);
          setCards(initialCards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setUserEmail(res.data.email);
            navigate("/users/me");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const handleLogin = (email, password) => {
    return auth.authorize(email, password)
      .then((data) => {
        console.log(data.token);
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setLoggedIn(true);
          setUserEmail(email);
          navigate('/');
        }
      })
      .catch((err) => {
        setInfoTooltipPopup(true);
        setErrorInfoTooltipPopup(true);
        console.log(err);
      });
  };

  const handleRegister = ({ email, password }) => {
    return auth
      .register({ email, password })
      .then((res) => {
        if (res) {
          navigate('/sign-in');
          setInfoTooltipPopup(true);
          setErrorInfoTooltipPopup(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setInfoTooltipPopup(true);
        setErrorInfoTooltipPopup(true);
      });
  }

  const handleSignOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    navigate('/sign-in');
  }

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((like) => like._id === currentUser._id);
    api.selectLike(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((c) => c._id !== card._id)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateUser = (data) => {
    api.userInfo(data)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const handleUpdateAvatar = (data) => {
    api.userAvatar(data)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddPlaceSubmit = (newCard) => {
    api.postNewCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };





  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card)
  }

  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
    setInfoTooltipPopup(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Routes>
            <Route
              path="/sign-in"
              element={
                <>
                  <Header isLoginPage />
                  <Login onLogin={handleLogin} />
                </>
              }
            />
            <Route
              path="/sign-up"
              element={
                <>
                  <Header isRegisterPage />
                  <Register onRegister={handleRegister} />
                </>
              }
            />
            <Route
              path="/users/me"
              element={
                <>
                  <Header
                    userEmail={userEmail}
                    isMainPage
                    signOut={handleSignOut} />
                  <ProtectedRoute
                    element={Main}
                    loggedIn={loggedIn}
                    onEditProfile={handleEditProfileClick}
                    onEditAvatar={handleEditAvatarClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    onCardClick={handleCardClick}
                    cards={cards}

                  />
                </>
              }
            />

            <Route
              path="/*"
              element={
                loggedIn ? (
                  <Navigate to="/users/me" />
                ) : (
                  <Navigate to="/sign-in" replace />
                )
              }
            />
          </Routes>
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoTooltip
            isOpen={infoTooltipPopup}
            onClose={closeAllPopups}
            isError={errorInfoTooltipPopup}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;