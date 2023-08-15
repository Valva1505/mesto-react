import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({
    isOpen,
    onClose,
    onAddPlace
}) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        if (!isOpen) {
            setName('');
            setLink('');
        }
    }, [isOpen]); //очистить инпуты после сохранения
    
    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name,
            link
        });
    }
    return (
        <PopupWithForm
            name="new-card"
            title="Новое место"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label className="popup__field">
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
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
    )
}

export default AddPlacePopup;