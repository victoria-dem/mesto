import { initialCards } from "../utils/data.js";
import { FormValidator } from "../components/formvalidator.js";
import { Card } from "../components/card.js";
// profile

const profile = document.querySelector(".profile");
const editButton = profile.querySelector(".button_type_edit");
const popupEdit = document.querySelector(".popup_type_edit");
const nameInput = popupEdit.querySelector(".form__text_profile_title");
const jobInput = popupEdit.querySelector(".form__text_profile_subtitle");
const closeButtonEdit = popupEdit.querySelector(".popup__button");
const formEdit = popupEdit.querySelector(".form");
const nameProfile = profile.querySelector(".profile__title");
const jobProfile = profile.querySelector(".profile__subtitle");
// place
const addButton = profile.querySelector(".button_type_add");
const popupAdd = document.querySelector(".popup_type_add");
const placeInput = popupAdd.querySelector(".form__text_profile_title");
const linkInput = popupAdd.querySelector(".form__text_profile_subtitle");
const closeButtonAdd = popupAdd.querySelector(".popup__button");
const formAdd = popupAdd.querySelector(".form");
// display cards
const cardList = document.querySelector(".stack__list");
// show big picture
const popupPicture = document.querySelector(".popup_type_picture");
const popupPictureImg = popupPicture.querySelector(".popup__picture");
const popupPictureCaption = popupPicture.querySelector(".popup__picture-caption");
const closeButtonPopupPicture = popupPicture.querySelector(
  ".popup__button_form_picture"
);

const formValidationClasses = {
  formSelector: ".form",
  inputSelector: ".form__text",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__text_type_error",
  errorClass: "form__error_visible",
};

const togglePopupClass = (element) => {
  element.classList.toggle("popup_opened");
  if (element.classList.contains("popup_opened")) {
    element.addEventListener("click", closeOnOverlay);
    document.addEventListener("keydown", closeOnEsc);
  } else {
    document.removeEventListener("keydown", closeOnEsc);
    element.removeEventListener("click", closeOnOverlay);
  }
};

const isValidationPass = (evt) => {
  const buttonSubmit = evt.target.querySelector(".form__button");
  return !buttonSubmit.classList.contains("form__button_disabled");
};

const closeOnEsc = (evt) => {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    togglePopupClass(openedPopup);
  }
};

const submitFormEdit = (evt) => {
  evt.preventDefault();

  if (isValidationPass(evt)) {
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    togglePopupClass(popupEdit);
  }
};

const closeOnOverlay = (evt) => {
  if (evt.target !== evt.currentTarget) {
    return;
  }
  const openedPopup = document.querySelector(".popup_opened");
  togglePopupClass(openedPopup);
};

const openPopupEdit = () => {
  togglePopupClass(popupEdit);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
};

const openPopupAdd = () => {
  togglePopupClass(popupAdd);
  popupAdd
    .querySelector(".form__button")
    .classList.add("form__button_disabled");
  placeInput.value = "";
  linkInput.value = "";
};

const openPopupPicture = (ev) =>  {
  togglePopupClass(popupPicture);
  popupPictureImg.src = ev.target.src;
  popupPictureImg.alt = ev.target.alt;
  popupPictureCaption.textContent = ev.target.alt;
};

const submitFormAdd = (evt) => {
  evt.preventDefault();
  if (isValidationPass(evt)) {
    const newCard = new Card(
      { name: placeInput.value, link: linkInput.value },
      "#card",
      ".card"
    );
    cardList.prepend(newCard.getCardElement());
    togglePopupClass(popupAdd);
  }
};

const renderCard = (item) => {
  const card = new Card(item, "#card", ".card",openPopupPicture);
  cardList.append(card.getCardElement());
};

initialCards.forEach(renderCard);

const formValidProfile = new FormValidator(formValidationClasses, formEdit);
formValidProfile.enableValidation();

const formValidAdd = new FormValidator(formValidationClasses, formAdd);
formValidAdd.enableValidation();

editButton.addEventListener("click", openPopupEdit);
formEdit.addEventListener("submit", submitFormEdit);
closeButtonEdit.addEventListener("click", () => togglePopupClass(popupEdit));
addButton.addEventListener("click", openPopupAdd);
formAdd.addEventListener("submit", submitFormAdd);
closeButtonAdd.addEventListener("click", () => togglePopupClass(popupAdd));
closeButtonPopupPicture.addEventListener("click", () =>
  togglePopupClass(popupPicture)
);
