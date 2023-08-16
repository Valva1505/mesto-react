import PopupWithForm from "./PopupWithForm";
import React, { useRef } from 'react';

function EditAvatarPopup({
    isOpen,
    onClose,
    onUpdateAvatar

}) {
    const avatarRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }
    return (
        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label className="popup__field">
                <input
                    ref={avatarRef}
                    type="url"
                    id="link"
                    name="link"
                    className="popup__input popup__input_type_link popup__input_type_error"
                    placeholder="Сcылка на картинку"
                    required
                />
                <span className="link-error popup__input-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;