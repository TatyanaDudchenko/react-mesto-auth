import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from "react";

function AddPlacePopup ({ isOpen, onClose, onAddPlace }) {
    const [name, setName] = useState('');
    const [link , setLink ] = useState('');

    function handleNameChange(e) {
        setName(e.target.value);
      }

    function handleLinkChange(e) {
       setLink(e.target.value);
    }

    useEffect(() => {
        setName('');
        setLink('');;
    }, [isOpen]); 

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
      
        // Передаём значения управляемых компонентов во внешний обработчик
        onAddPlace({
          name,
          link,
        });
      } 

    return (
        <PopupWithForm
            title={"Новое место"}
            name={"add"}
            button={"Создать"}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>
            <label className="popup__form-field">
                <input type="text" value={name || ''} onChange={handleNameChange} placeholder="Название" name="name" className="popup__input popup__input_title" id="title-input" minLength="2" maxLength="30" required/>
                <span className="title-input-error popup__input-error"></span>
            </label>
            <label className="popup__form-field">
                <input type="url" value={link || ''} onChange={handleLinkChange} placeholder="Ссылка на картинку" name="link" className="popup__input popup__input_link" id="link-input" required/>
                <span className="link-input-error popup__input-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default AddPlacePopup;