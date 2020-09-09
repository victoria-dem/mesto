const profile = document.querySelector(".profile");
const editButton = profile.querySelector(".button_type_edit");
const addButton = profile.querySelector(".button_type_add");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");
const nameInput = popupEdit.querySelector(".input__text_profile_title");
const jobInput = popupEdit.querySelector(".input__text_profile_subtitle");
const placeInput = popupAdd.querySelector(".input__text_profile_title");
const linkInput = popupAdd.querySelector(".input__text_profile_subtitle");
const closeButtonEdit = popupEdit.querySelector(".popup__button");
const closeButtonAdd = popupAdd.querySelector(".popup__button");
const formEdit = popupEdit.querySelector(".input");
const formAdd = popupAdd.querySelector(".input");
const nameProfile = profile.querySelector(".profile__title");
const jobProfile = profile.querySelector(".profile__subtitle");
const cardTemplate = document.querySelector("#card").content;
const cardList = document.querySelector(".stack__list");
const initialCards = [
  {
      name: 'Архыз',
      link:   'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const createCardTemplate = (title, link) => {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(".card__item-title").textContent = title;
  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").alt = title;
  return cardElement;
};

const popupEditToggle = () =>  popupEdit.classList.toggle("popup_opened");
const popupAddToggle = () => popupAdd.classList.toggle("popup_opened");
const classToggle = (evt) => {
  if(evt.target.classList.contains('button_type_like') || evt.target.classList.contains('button_pressed_like')){
   evt.target.classList.toggle("button_type_like");
   evt.target.classList.toggle("button_pressed_like");
   return;
  } 
  if(evt.target.classList.contains('button_type_delete')){
    const removeItem = evt.target.closest('.card');
    removeItem.remove();
    return;
  }
};

const submitFormEditHandler = (evt) => {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  popupEditToggle();
};

const submitFormAddHandler = (evt) => {
  evt.preventDefault();
  cardList.prepend(createCardTemplate(placeInput.value,linkInput.value))
  popupAddToggle();
};

const closePopupOnOverlay = (event) => {
  if (event.target !== event.currentTarget) {
    return;
  }
  popupEditToggle();
};

const closePopupOnOverlayAdd = (event) => {
  if (event.target !== event.currentTarget) {
    return;
  }
  popupAddToggle();
};

const openEditPopup = () => {
  popupEditToggle();
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
};

initialCards.forEach((element) => {
  cardList.append(createCardTemplate(element.name, element.link));
});

editButton.addEventListener("click", openEditPopup);
formEdit.addEventListener("submit", submitFormEditHandler);
closeButtonEdit.addEventListener("click", popupEditToggle);
popupEdit.addEventListener("click", closePopupOnOverlay);
addButton.addEventListener("click", popupAddToggle);
formAdd.addEventListener("submit", submitFormAddHandler);
closeButtonAdd.addEventListener("click", popupAddToggle);
popupAdd.addEventListener("click", closePopupOnOverlayAdd);
cardList.addEventListener("click", classToggle);