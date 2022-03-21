import { useState, useEffect } from "react";
import api from "../utils/Api";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  
  const [currentUser, setСurrentUser] = useState({});

  const [cards, setCards] = useState([]);

  useEffect(() => {
      Promise.all([api.getUserData(), api.getInitialCards()])
    .then(([userData, cards]) => {
      setСurrentUser(userData)
      setCards(cards)
    })
    .catch((err) => {
      console.log(err);
    });
  }, [])

  // эффект закрытия модальных окон с помощью клавиши Escape
  useEffect(() => {
    if (isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isImagePopupOpen) {
      document.addEventListener('keydown', handleEscClose)
      return () => document.removeEventListener('keydown', handleEscClose)
    
      function handleEscClose(evt) {
        if (evt.key === 'Escape') {
          closeAllPopups();
        };
      }
    }
    
  }, [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen, isImagePopupOpen])

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
  }

  function handleCardClick(props) {
    setSelectedCard(props);
    setIsImagePopupOpen(true);
  }

  function handleUpdateUser(props) {
    api.editProfile(props)
    .then(userData => {
      setСurrentUser(userData);
    })
    .then(() => closeAllPopups())
    .catch((err) => {
      console.log(err);
    });
  }

  function handleUpdateAvatar(props) {
    api.updatedAvatar(props)
    .then(userData => {
      setСurrentUser(userData);
    })
    .then(() => closeAllPopups())
    .catch((err) => {
      console.log(err);
    });
  }

    function handleCardLike(card) {
      // Снова проверяем, есть ли уже лайк на этой карточке
      const isLiked = card.likes.some(i => i._id === currentUser._id);
      
      // Отправляем запрос в API и получаем обновлённые данные карточки
      if (!isLiked) {
        api.putLike(card._id)
        .then(newRenderCard => {
          setCards((cards) => cards.map((c) => c._id === card._id ? newRenderCard : c));
        })
        .catch((err) => {
          console.log(err);
        })

      } else {
        api.deleteLike(card._id)
        .then(newRenderCard => {
          setCards((cards) => cards.map((c) => c._id === card._id ? newRenderCard : c));
        })
        .catch((err) => {
          console.log(err);
        })
      }
    } 

    function handleCardDelete(card) {
      api.deleteCard(card._id)
      .then(deletedCardData => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      })
    }

    function handleAddPlaceSubmit(card) {
      api.createNewCard(card)
      .then(newCard => {
        setCards([newCard, ...cards]);
      })
      .then(() => closeAllPopups())
      .catch((err) => {
        console.log(err);
      });
    }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="background">
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        handleCardClick={handleCardClick}
        cards={cards} 
        onCardLike={handleCardLike} 
        onCardDelete={handleCardDelete} />
      <Footer />
      <EditProfilePopup 
        isOpen={isEditProfilePopupOpen} 
        onClose={closeAllPopups} 
        onUpdateUser={handleUpdateUser} />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups} 
        onAddPlace={handleAddPlaceSubmit} />
      <EditAvatarPopup 
        isOpen={isEditAvatarPopupOpen} 
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar} />
      <PopupWithForm
        title={"Вы уверены?"}
        name={"confirm"} />
      <ImagePopup
        name={"img"}
        isOpen={isImagePopupOpen}
        card={selectedCard}
        onClose={closeAllPopups} />
    </div>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
