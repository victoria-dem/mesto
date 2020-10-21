// import './pages/index.css';
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
} from "../utils/constants.js";

const submitFormEdit = (formValues) => {
  console.log(formValues);
  const buttonSubmit = formEdit.querySelector(".form__button");
  if (!buttonSubmit.classList.contains("form__button_disabled")) {
    user.setUserInfo(formValues.profile_title, formValues.profile_subtitle);
  }
};

const submitFormAdd = (formValue) => {
  const buttonSubmit = formAdd.querySelector(".form__button");
  if (!buttonSubmit.classList.contains("form__button_disabled")) {
    const newCard = new Card(
      {
        name: formValue.place_title,
        link: formValue.place_link,
      },
      "#card",
      ".card",
      handleCardClick
    );
    cardList.addItemFirst(newCard.getCardElement());
  }
};

const handleCardClick = (ev) => {
  const openedPopupWithImage = new PopupWithImage(".popup_type_picture", ev);
  openedPopupWithImage.openPopup();
  openedPopupWithImage.setEventListeners();
};

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#card", ".card", handleCardClick);
      const cardElement = card.getCardElement();
      cardList.addItem(cardElement);
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
const user = new UserInfo({
  name: nameProfile.textContent,
  userJob: jobProfile.textContent,
});

editButton.addEventListener("click", () => {
  openedPopupEdit.openPopup();
  openedPopupEdit.setEventListeners();
  nameInput.value = user.getUserInfo().userName;
  jobInput.value = user.getUserInfo().userJob;
});

addButton.addEventListener("click", () => {
  const openedPopupAdd = new PopupWithForm(".popup_type_add", submitFormAdd);
  openedPopupAdd.openPopup();
  openedPopupAdd.setEventListeners();
});
