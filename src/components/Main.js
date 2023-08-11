import React, { useState, useEffect } from 'react';
import { api } from './utils/API';
import Card from './Card';

function Main({
    onEditProfile,
    onEditAvatar,
    onAddPlace,
    onCardClick
}) {
    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [cards, setCards] = useState([]);

    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([userInfo, initialCards]) => {
                setUserName(userInfo.name);
                setUserDescription(userInfo.about);
                setUserAvatar(userInfo.avatar);
                setCards(initialCards);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    return (
        <main className="section">
            <section className="profile">
                <div className="profile__avatar">
                    <div className="profile__avatar-image" style={{ backgroundImage: `url(${userAvatar})` }}></div>
                    <button className="profile__avatar-button" onClick={onEditAvatar}></button>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{userName}</h1>
                    <button type="button" className="profile__edit-button" onClick={onEditProfile}>
                    </button>
                    <p className="profile__description">{userDescription}</p>
                </div>
                <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
            </section>
            <section className="elements">
                {cards.map(card => (
                    <Card key={card._id} card={card} onCardClick={onCardClick} />
                ))}
            </section>

        </main>
    );
}

export default Main;