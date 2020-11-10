import "./index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
  nameInput,
  jobInput,
  formEdit,
  nameProfile,
  jobProfile,
  pictureProfile,
  editButton,
  addButton,
  formAdd,
  cardListSection,
  formValidationClasses,
  popupPictureImg,
  popupPictureCaption,
  buttonProfile,
  formEditImg,
} from "../utils/constants.js";
import { renderLoading } from "../utils/utils.js";

let buttonText = "";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-17",
  headers: {
    authorization: "17280b83-28ab-4e16-88f5-b5da7798c655",
    "Content-Type": "application/json",
  },
});

const submitFormEdit = (formValues, close, popupContainer) => {
  const buttonSubmit = formEdit.querySelector(".form__button");
  buttonText = renderLoading(buttonSubmit, true);
  if (!buttonSubmit.classList.contains("form__button_disabled")) {
    api
      .patchUserData(formValues.profile_title, formValues.profile_subtitle)
      .then((res) => {
        user.setUserInfo(res.name, res.about);
        renderLoading(buttonSubmit, false, buttonText);
        popupContainer.querySelector(".form").reset();
        close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const submitFormAdd = (formValue, close, popupContainer) => {
  const buttonSubmit = formAdd.querySelector(".form__button");
  buttonText = renderLoading(buttonSubmit, true);
  if (!buttonSubmit.classList.contains("form__button_disabled")) {
    api
      .getAllInfoForAddedCard(formValue.place_title, formValue.place_link)
      .then((res) => {
        cardList.addItemFirst(createCardElement(res[1], res[0]._id));
        renderLoading(buttonSubmit, false, buttonText);
        popupContainer.querySelector(".form").reset();
        close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

function handleLikeClick(
  element,
  likes,
  id,
  likeButton,
  countLikes,
  buttonLikeColor
) {
  if (likeButton.classList.contains("button_pressed_like")) {
    api
      .deleteCardLike(id)
      .then((res) => {
        buttonLikeColor(false);
        countLikes(res.likes);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api
      .putCardLike(id)
      .then((res) => {
        buttonLikeColor(true);
        countLikes(res.likes);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function handleDeleteClick(id, deleteCardFromScreen) {
  openedPopupWithConfirmation.getSubmitHandler((buttonSubmit, close) => {
    buttonText = renderLoading(buttonSubmit, true);
    api
      .deleteCard(id)
      .then((res) => {
        deleteCardFromScreen();
        renderLoading(buttonSubmit, false, buttonText);
        close();
      })
      .catch((err) => {
        console.log(err);
      });
  });
  openedPopupWithConfirmation.open();
}

const createCardElement = (data, profileId) => {
  const newCard = new Card(
    data,
    "#card",
    ".card",
    (name, imgLink) => {
      openedPopupWithImage.open(name, imgLink);
    },
    handleLikeClick,
    handleDeleteClick
  );
  return newCard.getCardElement(profileId);
};

const cardList = new Section(
  {
    renderer: (item, profileId) => {
      cardList.addItem(createCardElement(item, profileId));
    },
  },
  cardListSection
);

const formValidProfile = new FormValidator(formValidationClasses, formEdit);
formValidProfile.enableValidation();

const formValidAdd = new FormValidator(formValidationClasses, formAdd);
formValidAdd.enableValidation();

const formValidProfileImg = new FormValidator(
  formValidationClasses,
  formEditImg
);
formValidProfileImg.enableValidation();

const openedPopupWithImage = new PopupWithImage(
  ".popup_type_picture",
  popupPictureImg,
  popupPictureCaption
);

const submitFormEditImg = (formValues, close) => {
  const buttonSubmit = formEditImg.querySelector(".form__button");
  if (!buttonSubmit.classList.contains("form__button_disabled")) {
    buttonText = renderLoading(buttonSubmit, true);
    api
      .patchUserProfileImg(formValues.profile__img)
      .then((res) => {
        user.setUserAvatar(pictureProfile, res.avatar);
        renderLoading(buttonSubmit, false, buttonText);
        close();
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

const openedPopupEditProfileImg = new PopupWithForm(
  ".popup_type_profileimg",
  submitFormEditImg
);

const openedPopupWithConfirmation = new PopupWithConfirmation(
  ".popup_type_confirmation"
);

const openedPopupEdit = new PopupWithForm(".popup_type_edit", submitFormEdit);
openedPopupEdit.setEventListeners();
const user = new UserInfo({
  name: nameProfile,
  userJob: jobProfile,
});

const openedPopupAdd = new PopupWithForm(".popup_type_add", submitFormAdd);

function renderUserData(userData) {
  user.setUserInfo(userData.name, userData.about);
  user.setUserAvatar(pictureProfile, userData.avatar);
}

api
  .getAllInfoForPage()
  .then((res) => {
    const [userData, cardsData] = res;
    renderUserData(userData);
    cardList.renderItems(cardsData, userData._id);
  })
  .catch((err) => {
    console.log(err);
  });

openedPopupAdd.setEventListeners();
openedPopupWithConfirmation.setEventListeners();
openedPopupEditProfileImg.setEventListeners();
openedPopupWithImage.setEventListeners();

editButton.addEventListener("click", () => {
  const userInfo = user.getUserInfo();
  nameInput.value = userInfo.userName;
  jobInput.value = userInfo.userJob;
  openedPopupEdit.open();
});

addButton.addEventListener("click", () => {
  openedPopupAdd.open();
});

buttonProfile.addEventListener("mouseover", () => {
  buttonProfile
    .querySelector(".profile__img")
    .classList.add("profile__img_hover");
  buttonProfile
    .querySelector(".profile__edit-icon")
    .classList.add("profile__edit-icon_hover");
});

buttonProfile.addEventListener("mouseout", () => {
  buttonProfile
    .querySelector(".profile__img")
    .classList.remove("profile__img_hover");
  buttonProfile
    .querySelector(".profile__edit-icon")
    .classList.remove("profile__edit-icon_hover");
});
buttonProfile.addEventListener("click", () => {
  openedPopupEditProfileImg.open();
});
