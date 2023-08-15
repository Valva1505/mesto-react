import React, { useContext } from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main({
    onEditProfile,
    onEditAvatar,
    onAddPlace,
    onCardClick,
    onCardLike,
    onCardDelete,
    cards
}) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="section">
            <section className="profile">
                <div className="profile__avatar">
                    <div className="profile__avatar-image" style={{ backgroundImage: `url(${currentUser?.avatar})` }}></div>
                    <button className="profile__avatar-button" onClick={onEditAvatar}></button>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser?.name}</h1>
                    <button type="button" className="profile__edit-button" onClick={onEditProfile}>
                    </button>
                    <p className="profile__description">{currentUser?.about}</p>
                </div>
                <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
            </section>
            <section className="elements">
                {cards.map((card) => (
                    <Card
                        key={card._id}
                        card={card}
                        onCardClick={onCardClick}
                        onCardLike={onCardLike}
                        onCardDelete={onCardDelete} />
                ))}
            </section>

        </main>
    );
}

export default Main;