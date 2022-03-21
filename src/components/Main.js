import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({ onEditProfile, onAddPlace, onEditAvatar, handleCardClick, cards, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="content">
      <section className="profile-container">
        <article className="profile">
          <div className="profile__hover-effect-container">
            <div style={{ backgroundImage: `url(${currentUser.avatar})` }} className="profile__avatar" alt="Аватар"></div>
              <button onClick={onEditAvatar} type="submit" className="profile__button-edit-avatar">
              </button>
          </div>
          <div className="profile__info-container">
            <div className="profile__info-group">
              <h1 className="profile__name">{currentUser.name}</h1>
              <h2 className="profile__job">{currentUser.about}</h2>
            </div>
            <button onClick={onEditProfile} type="submit" className="profile__button-edit"></button>
          </div>
        </article>
        <button onClick={onAddPlace} type="button" className="profile-container__button-add"></button>
      </section>

      <section className="gallery">
        {cards.map(item => (<Card key={item._id} {...item} card={item} 
        onCardClick={handleCardClick} 
        onCardLike={onCardLike} 
        onCardDelete={onCardDelete} />))}
      </section>
    </div>
  )
}

export default Main;