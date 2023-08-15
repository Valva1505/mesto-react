import React from 'react';

function PopupWithForm(props) {
  return (

    <section className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`} >
      <div className="popup__container">
        <h3 className="popup__title">{props.title}</h3>
        <form className={`popup__form popup__form_type_${props.name}`} method="post" onSubmit={props.onSubmit} noValidate>
          <fieldset className="popup__set">
            {props.children}
            <button type="submit" className="popup__button-submit">
              Сохранить
            </button>
          </fieldset>
        </form>
        <button type="button" className="popup__button-close" onClick={props.onClose}></button>
      </div>
    </section>
  )
}

export default PopupWithForm;