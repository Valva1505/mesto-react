import React from 'react';

function Card({ card, onCardClick }) {
    const handleClick = () => {
        onCardClick(card);
    };

    return (
        <div className="element">
            <img src={card.link} alt={card.name} className="element__image" onClick={handleClick} />
            <h2 className="element__title">{card.name}</h2>
            <div className="element__like">
                <button type="button" className="element__button" id="likes" name="likes"></button>
                <p className="element__likes">{card.likes.length}</p>
            </div>
            <button type="reset" className="element__urn-button"></button>
        </div>
    );
}

export default Card;