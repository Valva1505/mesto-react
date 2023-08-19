import React from "react";
import okLogin from "../images/success.png";
import errorLogin from "../images/fail.png";

const InfoTooltip = ({ isOpen, onClose, isError }) => {
  const popupClass = `popup popup__infotooltip ${isOpen ? "popup_opened" : ""}`;

  return (
    <div className={popupClass}>
      <div className="popup__container">
        <button type="button" className="popup__button-close" onClick={onClose}></button>
        <figure className="popup__image-container">
          <img
            src={isError ? errorLogin : okLogin}
            className="popup__error-image"
            alt={isError ? "Error" : "Success"}
          />
          <figcaption className="popup__error">
            {isError
              ? "Что-то пошло не так! Попробуйте ещё раз."
              : "Вы успешно зарегистрировались!"}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export default InfoTooltip;