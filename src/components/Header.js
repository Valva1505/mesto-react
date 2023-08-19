import React from 'react';
import headerLogo from '../images/logo.svg';
import { useNavigate } from 'react-router-dom';

const MainHeaderButtons = ({ userEmail, signOut }) => (
  <>
    <span className="header__email">{userEmail}</span>
    <button type="button" className="header__button header__exit" onClick={signOut}>Выйти</button>
  </>
);

const LoginPageButton = () => {
  const navigate = useNavigate();
  return (
    <button type="button" className="header__button header__register" onClick={() => navigate('/sign-up')}>Регистрация</button>
  );
};

const RegisterPageButton = () => {
  const navigate = useNavigate();
  return (
    <button type="button" className="header__button header__login" onClick={() => navigate('/sign-in')}>Войти</button>
  );
};

function Header({ userEmail, isMainPage, isLoginPage, isRegisterPage, signOut }) {
  return (
    <header className="header section">
      <img src={headerLogo} alt="логотип" className="header__logo" />
      <div className="header__info">
        {isMainPage && <MainHeaderButtons userEmail={userEmail} signOut={signOut} />}
        {isLoginPage && <LoginPageButton />}
        {isRegisterPage && <RegisterPageButton />}
      </div>
    </header>
  );
}

export default Header;