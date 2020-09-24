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
const cardTemplate = document.querySelector("#card").content;
const cardList = document.querySelector(".stack__list");
// show big picture
const popupPicture = document.querySelector(".popup_type_picture");
const popupPictureImg = popupPicture.querySelector(".popup__picture");
const popupPictureCaption = popupPicture.querySelector(
  ".popup__picture-caption"
);
const closeButtonPopupPicture = popupPicture.querySelector(
  ".popup__button_form_picture"
);

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

const handleLikeButton = (evt) => {
  evt.target.classList.toggle("button_pressed_like");
};

const deleteCard = (evt) => {
  const removeItem = evt.target.closest(".card");
  removeItem.remove();
};

const openPopupPicture = (evt) => {
  togglePopupClass(popupPicture);
  popupPictureImg.src = evt.target.src;
  popupPictureImg.alt = evt.target.alt;
  popupPictureCaption.textContent = evt.target.alt;
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

const getCardElement = (card) => {
  const cardElement = cardTemplate.cloneNode(true);
  const likeButton = cardElement.querySelector(".button_type_like");
  const deleteButton = cardElement.querySelector(".button_type_delete");
  const pictureClick = cardElement.querySelector(".card__image");

  cardElement.querySelector(".card__item-title").textContent = card.name;
  pictureClick.src = card.link;
  pictureClick.alt = card.name;

  likeButton.addEventListener("click", handleLikeButton);
  deleteButton.addEventListener("click", deleteCard);
  pictureClick.addEventListener("click", openPopupPicture);
  return cardElement;
};

const submitFormAdd = (evt) => {
  evt.preventDefault();
  if (isValidationPass(evt)) {
    const newCard = {
      name: placeInput.value,
      link: linkInput.value,
    };
    cardList.prepend(getCardElement(newCard));
    togglePopupClass(popupAdd);
  }
};

const renderCard = (etv) => {
  cardList.append(getCardElement(etv));
};

initialCards.forEach(renderCard);

editButton.addEventListener("click", openPopupEdit);
formEdit.addEventListener("submit", submitFormEdit);
closeButtonEdit.addEventListener("click", () => togglePopupClass(popupEdit));
addButton.addEventListener("click", openPopupAdd);
formAdd.addEventListener("submit", submitFormAdd);
closeButtonAdd.addEventListener("click", () => togglePopupClass(popupAdd));
closeButtonPopupPicture.addEventListener("click", () =>
  togglePopupClass(popupPicture)
);
