import PopupWithForm from "./PopupWithForm";
import { useEffect, useContext, useRef } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const currentUser = useContext(CurrentUserContext);

    
  const avatarRef = useRef(); // записываем объект, возвращаемый хуком, в переменную
    

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
      
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  } 

  useEffect(() => {
    avatarRef.current.value = currentUser.avatar;
  }, [currentUser]); 

  useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]); 


  return (
    <PopupWithForm
      title={"Обновить аватар"}
      name={"edit-avatar"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit} >
      <label className="popup__form-field">
        <input type="url" ref={avatarRef} placeholder="Ссылка на картинку" name="link" className="popup__input popup__input_link" id="link-inp" required/>
        <span className="link-inp-error popup__input-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;