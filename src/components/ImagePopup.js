import React from 'react';

function ImagePopup({ card, onClose }) {
    return (
        <div className={`popup popup_card ${card ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__container_card">
                <img src={card?.link} alt={card?.name} className="popup__image" />
                <p className="popup__caption">{card?.name}</p>
                <button type="button" className="popup__button-close popup__button-close_card" onClick={onClose}></button>
            </div>
        </div>
    );
}

export default ImagePopup;