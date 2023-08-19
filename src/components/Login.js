import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(email, password);
    };

    return (
        <div className="login">
            <form className="login__form" onSubmit={handleSubmit}>
                <h2 className="login__title">Вход</h2>
                <input
                    className="login__input"
                    type="text"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    placeholder={"Email"}
                />
                <input
                    className="login__input"
                    type="text"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    placeholder={'Пароль'}
                />
                <p className="login__error"></p>
                <button className="login__button" type="submit">Войти</button>
            </form>
        </div>
    );
}

export default Login;