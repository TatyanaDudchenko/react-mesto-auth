import PopupWithForm from "./PopupWithForm";
import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState('');
    const [description , setDescription ] = useState('');

    function handleNameChange(e) {
        setName(e.target.value);
      }

    function handleDescriptionChange(e) {
       setDescription(e.target.value);
    }

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]); 

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
      
        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
          name,
          about: description,
        });
      } 

    return (
        <PopupWithForm
            title={"Редактировать профиль"}
            name={"edit"}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit} >
            <label className="popup__form-field">
                <input type="text" value={name || ''} onChange={handleNameChange} placeholder="Имя" name="name" className="popup__input popup__input_name" id="name-input" minLength="2" maxLength="40" required/>
                <span className="name-input-error popup__input-error"></span>
            </label>
            <label className="popup__form-field">
                <input type="text" value={description || ''} onChange={handleDescriptionChange} placeholder="Занятие" name="about" className="popup__input popup__input_job" id="job-input" minLength="2" maxLength="200" required/>
                <span className="job-input-error popup__input-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default EditProfilePopup;