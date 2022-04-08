function Form({ title, button, password, email, onChange, onSubmit }) {
    return (
        <div className="popup__container popup__container_background-black">
            <h3 className="popup__title popup__title_color-white popup__title_align-center">{title}</h3>
            <form onSubmit={onSubmit} className="popup__form" noValidate>
                <label className="popup__form-field">
                    <input type="text"placeholder="Email" name="email" value={email} onChange={onChange} className="popup__input popup__input_background-black popup__input_email" id="email-input" minLength="2" maxLength="30" required/>
                    <span className="email-input-error popup__input-error"></span>
                </label>
                <label className="popup__form-field">
                    <input type="password" placeholder="Пароль" name="password" value={password} onChange={onChange} className="popup__input popup__input_background-black popup__input_password" id="password-input" required/>
                    <span className="password-input-error popup__input-error"></span>
                </label>
                <button type="submit" className="popup__button popup__button_margin-large popup__button_background-white">{button}</button>
            </form>
        </div>
    )
}

export default Form;