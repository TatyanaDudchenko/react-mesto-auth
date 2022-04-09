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
import { Route, Switch } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/Auth";
import { useHistory } from "react-router-dom";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState(true);

  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setСurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [signedIn, setSignedIn] = useState(false);
  const [infoemail, setInfoemail] = useState("");

  const history = useHistory();

  useEffect(() => {
    if (signedIn) {
      Promise.all([api.getUserData(), api.getInitialCards()])
        .then(([userData, cards]) => {
          setСurrentUser(userData);
          setCards(cards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [signedIn]);

  // эффект закрытия модальных окон с помощью клавиши Escape
  useEffect(() => {
    if (
      isEditProfilePopupOpen ||
      isAddPlacePopupOpen ||
      isEditAvatarPopupOpen ||
      isImagePopupOpen ||
      isInfoTooltipOpen
    ) {
      document.addEventListener("keydown", handleEscClose);
      return () => document.removeEventListener("keydown", handleEscClose);

      function handleEscClose(evt) {
        if (evt.key === "Escape") {
          closeAllPopups();
        }
      }
    }
  }, [
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    isEditAvatarPopupOpen,
    isImagePopupOpen,
    isInfoTooltipOpen,
  ]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleInfoTooltipOpen() {
    setIsInfoTooltipOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  function handleCardClick(props) {
    setSelectedCard(props);
    setIsImagePopupOpen(true);
  }

  function handleUpdateUser(props) {
    api
      .editProfile(props)
      .then((userData) => {
        setСurrentUser(userData);
      })
      .then(() => closeAllPopups())
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(props) {
    api
      .updatedAvatar(props)
      .then((userData) => {
        setСurrentUser(userData);
      })
      .then(() => closeAllPopups())
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (!isLiked) {
      api
        .putLike(card._id)
        .then((newRenderCard) => {
          setCards((cards) =>
            cards.map((c) => (c._id === card._id ? newRenderCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .deleteLike(card._id)
        .then((newRenderCard) => {
          setCards((cards) =>
            cards.map((c) => (c._id === card._id ? newRenderCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((deletedCardData) => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(card) {
    api
      .createNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => closeAllPopups())
      .catch((err) => {
        console.log(err);
      });
  }

  function handleRegister(registerState) {
    auth
      .register(registerState.password, registerState.email)
      .then(() => {
        setTooltipMessage(true);
        handleInfoTooltipOpen();
        history.push("/signin");
      })
      .catch((err) => {
        console.log(err);
        setTooltipMessage(false);
        handleInfoTooltipOpen();
      });
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  function handleLogin(loginState) {
    auth
      .authorize(loginState.password, loginState.email)
      .then((data) => {
        if (!data.token) return;

        localStorage.setItem("jwt", data.token);
        setSignedIn((old) => ({ ...old, signedIn: true }));

        emailCheck();

        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        setTooltipMessage(false);
        handleInfoTooltipOpen();
      });
  }

  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");

    if (!localStorage.getItem("jwt")) return;
    auth
      .checkToken(jwt)
      .then((res) => {
        if (!res) return;

        setSignedIn({
          signedIn: true,
        });

        const email = res.data.email;
        setInfoemail(email);

        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function emailCheck() {
    const jwt = localStorage.getItem("jwt");

    auth
      .checkToken(jwt)
      .then((res) => {
        console.log(res);
        if (!res) return;

        const email = res.data.email;
        setInfoemail(email);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function signout() {
    setSignedIn(false);
    localStorage.removeItem("jwt");
    setInfoemail("");
    history.push("/signin");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="background">
        <div className="page">
          <Header signedIn={signedIn} signout={signout} email={infoemail} />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <PopupWithForm title={"Вы уверены?"} name={"confirm"} />
          <ImagePopup
            name={"img"}
            isOpen={isImagePopupOpen}
            card={selectedCard}
            onClose={closeAllPopups}
          />
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            message={tooltipMessage}
          />
          <Switch>
            <Route path="/signin">
              <Login handleLogin={handleLogin} />
            </Route>
            <Route path="/signup">
              <Register handleRegister={handleRegister} />
            </Route>
            <ProtectedRoute exact path="/" signedIn={signedIn}>
              <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                handleCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
              <Footer />
            </ProtectedRoute>
          </Switch>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
