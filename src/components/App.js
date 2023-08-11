import React, { useState } from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';



function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);


  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  }
  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }
  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null)
  }


  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm
        name="user-information"
        title="Редактировать профиль"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <label className="popup__field">
          <input
            type="text"
            id="name"
            name="name"
            className="popup__input popup__input_type_name popup__input_type_error"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            required
          />
          <span className="name-error popup__input-error"></span>
        </label>
        <label className="popup__field">
          <input
            type="text"
            id="description"
            name="about"
            className="popup__input popup__input_type_description popup__input_type_error"
            placeholder="O себе"
            minLength="2"
            maxLength="200"
            required
          />
          <span className="description-error popup__input-error"></span>
        </label>
      </PopupWithForm>
      <PopupWithForm
        name="avatar"
        title="Обновить аватар"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <label className="popup__field">
          <input
            type="text"
            id="title"
            name="name"
            className="popup__input popup__input_type_title popup__input_type_error"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required
          />
          <span className="title-error popup__input-error"></span>
        </label>
        <label className="popup__field">
          <input
            type="url"
            id="link"
            name="link"
            className="popup__input popup__input_type_link popup__input_type_error"
            placeholder="Сcылка на картинку"
            required
          />
          <span className="link-error popup__input-error"></span>
        </label>
      </PopupWithForm>
      <PopupWithForm
        name="new-card"
        title="Новое место"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <label className="popup__field">
          <input
            type="text"
            id="title"
            name="name"
            className="popup__input popup__input_type_title popup__input_type_error"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required
          />
          <span className="title-error popup__input-error"></span>
        </label>
        <label className="popup__field">
          <input
            type="url"
            id="link"
            name="link"
            className="popup__input popup__input_type_link popup__input_type_error"
            placeholder="Сcылка на картинку"
            required
          />
          <span className="link-error popup__input-error"></span>
        </label>
      </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </div>

  );
}

export default App;
