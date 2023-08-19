import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ email, password });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  // const handleLoginClick = () => {
  //   navigate('/sign-in');
  // };

  return (
    <div className="register">
    <h2 className="register__title">Регистрация</h2>
      <form onSubmit={handleSubmit} className="register__form">
        <input
        className='register__input'
          id="email"
          name="email"
          type="text"
          value={email}
          onChange={handleChange}
          placeholder={"Email"}
        />
        <input
        className='register__input'
          id="password"
          type="text"
          name="password"
          value={password}
          onChange={handleChange}
          placeholder={'Пароль'}
        />
          <button type="submit" className="register__link">
            Зарегистрироваться
          </button>
      </form>
      <div className="register__signin">
        <p>Уже зарегистрированы? </p>
        <Link to={'/sign-in'} className="register__login-link"> Войти</Link>
      </div>
    </div>
  );
};

export default Register;