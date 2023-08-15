import React, { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `element__button ${isLiked && 'element__button_active'}`
    );

    const handleClick = () => {
        onCardClick(card);
    };

    const handleLikeClick = () => {
        onCardLike(card);
    };

    const handleDeleteClick = () => {
        onCardDelete(card);
    };

    return (
        <div className="element">
            <img src={card.link} alt={card.name} className="element__image" onClick={handleClick} />
            <h2 className="element__title">{card.name}</h2>
            <div className="element__like">
                <button type="button" className={cardLikeButtonClassName} id="likes" name="likes" onClick={handleLikeClick} ></button>
                <p className="element__likes">{card.likes.length}</p>
            </div>
            {isOwn && <button type="reset" className='element__urn-button' onClick={handleDeleteClick} />}
        </div>
    );
}

export default Card;