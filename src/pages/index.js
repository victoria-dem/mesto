import "./index.css";
import { initialCards } from "../utils/data.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  nameInput,
  jobInput,
  formEdit,
  nameProfile,
  jobProfile,
  editButton,
  addButton,
  formAdd,
  cardListSection,
  formValidationClasses,
  popupPictureImg,
  popupPictureCaption,
} from "../utils/constants.js";

const submitFormEdit = (formValues) => {
  const buttonSubmit = formEdit.querySelector(".form__button");
  if (!buttonSubmit.classList.contains("form__button_disabled")) {
    user.setUserInfo(formValues.profile_title, formValues.profile_subtitle);
  }
};

const createCardElement = (name, link) => {
  const newCard = new Card(
    {
      name,
      link,
    },
    "#card",
    ".card",
    (name, imgLink) => {
      openedPopupWithImage.open(name, imgLink);
    }
  );
  return newCard.getCardElement();
};

const submitFormAdd = (formValue) => {
  const buttonSubmit = formAdd.querySelector(".form__button");
  if (!buttonSubmit.classList.contains("form__button_disabled")) {
    cardList.addItemFirst(
      createCardElement(formValue.place_title, formValue.place_link)
    );
  }
};
const openedPopupWithImage = new PopupWithImage(
  ".popup_type_picture",
  popupPictureImg,
  popupPictureCaption
);
openedPopupWithImage.setEventListeners();

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardList.addItem(createCardElement(item.name, item.link));
    },
  },
  cardListSection
);

cardList.renderItems();

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

editButton.addEventListener("click", () => {
  const userInfo = user.getUserInfo();
  nameInput.value = userInfo.userName;
  jobInput.value = userInfo.userJob;
  openedPopupEdit.open();
});

addButton.addEventListener("click", () => {
  openedPopupAdd.open();
});
