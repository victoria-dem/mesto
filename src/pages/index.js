// import "./index.css";
import { initialCards } from "../utils/data.js";
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
} from "../utils/constants.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-17",
  headers: {
    authorization: "17280b83-28ab-4e16-88f5-b5da7798c655",
    "Content-Type": "application/json",
  },
});

const submitFormEdit = (formValues) => {
  const buttonSubmit = formEdit.querySelector(".form__button");
  if (!buttonSubmit.classList.contains("form__button_disabled")) {
    api
      .patchUserData(formValues.profile_title, formValues.profile_subtitle)
      .then((res) => {
        user.setUserInfo(res.name, res.about);
      });
  }
};

const submitFormAdd = (formValue) => {
  const buttonSubmit = formAdd.querySelector(".form__button");
  if (!buttonSubmit.classList.contains("form__button_disabled")) {
    api.postNewCard(formValue.place_title, formValue.place_link).then((res) => {
      cardList.addItemFirst(
        createCardElement(res.name, res.link, res.id, res.likes)
      );
    });
  }
};

const createCardElement = (data, profileName) => {
  const newCard = new Card(
    data,
    "#card",
    ".card",
    (name, imgLink) => {
      openedPopupWithImage.open(name, imgLink);
    },
    (id, likes) => {},
    (id) => {
      openedPopupWithConfirmation.open();
    }
  );
  return newCard.getCardElement(profileName);
};

const openedPopupWithImage = new PopupWithImage(
  ".popup_type_picture",
  popupPictureImg,
  popupPictureCaption
);
openedPopupWithImage.setEventListeners();

const cardList = new Section(
  {
    renderer: (item, profileName) => {
      cardList.addItem(createCardElement(item, profileName));
    },
  },
  cardListSection
);

const formValidProfile = new FormValidator(formValidationClasses, formEdit);
formValidProfile.enableValidation();

const formValidAdd = new FormValidator(formValidationClasses, formAdd);

formValidAdd.enableValidation();

const openedPopupEdit = new PopupWithForm(".popup_type_edit", submitFormEdit);
openedPopupEdit.setEventListeners();
const user = new UserInfo({
  name: nameProfile,
  userJob: jobProfile,
});

const openedPopupAdd = new PopupWithForm(".popup_type_add", submitFormAdd);
openedPopupAdd.setEventListeners();

const openedPopupWithConfirmation = new PopupWithConfirmation(
  ".popup_type_confirmation"
);

openedPopupWithConfirmation.setEventListeners();

function renderUserData(userData) {
  user.setUserInfo(userData.name, userData.about);
  pictureProfile.src = userData.avatar;
}

api.getAllInfoForPage().then((res) => {
  renderUserData(res[0]);
  // console.log(res[0].name);
  cardList.renderItems(res[1], res[0].name);
});

// api.getUserData().then((res) => renderUserData(res));
// api.getInitialCards().then((res) => {
//   cardList.renderItems(res);
// });

editButton.addEventListener("click", () => {
  const userInfo = user.getUserInfo();
  nameInput.value = userInfo.userName;
  jobInput.value = userInfo.userJob;
  openedPopupEdit.open();
});

addButton.addEventListener("click", () => {
  openedPopupAdd.open();
});
