import React from 'react';
import headerLogo from '../images/logo.svg';

function Header() {
    return (
        <header className="header section">
            <img src={headerLogo} alt="логотип" className="header__logo" />
        </header>
    );
}

export default Header;