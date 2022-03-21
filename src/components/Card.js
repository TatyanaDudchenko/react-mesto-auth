import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = useContext(CurrentUserContext);

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;
    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `card__icon-trash ${!isOwn && 'card__icon-trash_hidden'}`
    ); 

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
        `card__icon-like ${isLiked && 'card__icon-like_active'}`
    ); 

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card)
    } 

    function handleDeleteClick() {
        onCardDelete(card)
    } 

    return (
        <figure className="card">
            <div style={{ backgroundImage: `url(${card.link})` }} className="card__image" alt={card.name} onClick={handleClick}></div>
            <button onClick={handleDeleteClick} type="button" className={`${cardDeleteButtonClassName}`}></button>
            <figcaption className="card__description">
                <h2 className="card__text">{card.name}</h2>
                <div className="card__container-like">
                    <button onClick={handleLikeClick} type="button" className={`${cardLikeButtonClassName}`}></button>
                    <div className="card__counter-like">
                        {card.likes.length}
                    </div>
                </div>
            </figcaption>
        </figure>
    )
}

export default Card;

