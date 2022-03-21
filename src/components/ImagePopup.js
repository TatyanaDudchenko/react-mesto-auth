function ImagePopup({ name, isOpen, card, onClose }) {
    return (
        <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
            <figure className="popup__image">
                <button onClick={onClose} type="button" className="popup__icon-close"></button>
                <img className="popup__image-is-opened" src={card.link} alt={card.name}/>
                <figcaption className="popup__description-is-opened">
                {card.name}
                </figcaption>
            </figure>
        </div>
    )
}

export default ImagePopup;