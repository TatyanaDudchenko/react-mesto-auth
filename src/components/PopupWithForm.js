function PopupWithForm({ title, name, button="Сохранить", isOpen, onClose, children, onSubmit}) {
    return (
        <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
            <div className="popup__container">
                <button onClick={onClose} type="button" className="popup__icon-close"></button>
                <h3 className="popup__title">{title}</h3>
                <form name={name} onSubmit={onSubmit} className="popup__form" noValidate>
                    {children}
                    <button type="submit" className="popup__button">{button}</button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;