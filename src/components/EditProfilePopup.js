import PopupWithForm from "./PopupWithForm";
import React, { useState, useEffect, useContext } from 'react';
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({
    isOpen,
    onClose,
    onUpdateUser
}) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [about, setAbout] = useState('');

    useEffect(() => {
        if (currentUser && isOpen) {
            setName(currentUser.name);
            setAbout(currentUser.about);
        }
    }, [currentUser, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name') {
            setName(value);
        } else if (name === 'about') {
            setAbout(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateUser({
            name,
            about
        });
    }

    return (
        <PopupWithForm
            name="user-information"
            title="Редактировать профиль"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label className="popup__field">
                <input
                    value={name}
                    onChange={handleChange}
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
                    value={about}
                    onChange={handleChange}
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
    )
}

export default EditProfilePopup;