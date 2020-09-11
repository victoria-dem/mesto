// profile
const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.button_type_edit');
const popupEdit = document.querySelector('.popup_type_edit');
const nameInput = popupEdit.querySelector('.input__text_profile_title');
const jobInput = popupEdit.querySelector('.input__text_profile_subtitle');
const closeButtonEdit = popupEdit.querySelector('.popup__button');
const formEdit = popupEdit.querySelector('.input');
const nameProfile = profile.querySelector('.profile__title');
const jobProfile = profile.querySelector('.profile__subtitle');
// place
const addButton = profile.querySelector('.button_type_add');
const popupAdd = document.querySelector('.popup_type_add');
const placeInput = popupAdd.querySelector('.input__text_profile_title');
const linkInput = popupAdd.querySelector('.input__text_profile_subtitle');
const closeButtonAdd = popupAdd.querySelector('.popup__button');
const formAdd = popupAdd.querySelector('.input');
// display cards
const cardTemplate = document.querySelector('#card').content;
const cardList = document.querySelector('.stack__list');
// show big picture
const popupPicture = document.querySelector('.popup_type_picture');
const popupPictureImg = popupPicture.querySelector('.popup__picture');
const popupPictureCaption = popupPicture.querySelector(
  '.popup__picture-caption',
);
const closeButtonPopupPicture = popupPicture.querySelector(
  '.popup__button_form_picture',
);
const initialCards = [
  {
    name: 'Архыз',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link:
      'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

const displayCard = (card, index) => {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.card__item-title').textContent = card.name;
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.name;
  cardElement.querySelector('.card').classList.add(index);
  cardList.append(cardElement);
};

const displayAllCards = () => {
  cardList.innerHTML = '';
  initialCards.forEach(displayCard);
};

const togglePopupClass = (element) => element.classList.toggle('popup_opened');

const handleLikeButton = (evt) => {
  evt.target.classList.toggle('button_type_like');
  evt.target.classList.toggle('button_pressed_like');
};

const deleteCard = (evt) => {
  const indexCardArray = evt.target.parentNode.classList.value.match(/\d/);
  const indexCard = indexCardArray[0];
  initialCards.splice(indexCard, 1);
  displayAllCards();
};

const openPopupPicture = (evt) => {
  popupPicture.classList.toggle('popup_opened');
  popupPictureImg.src = evt.target.src;
  popupPictureCaption.textContent = evt.target.alt;
};

const handleListClick = (evt) => {
  if (
    evt.target.classList.contains('button_type_like')
    || evt.target.classList.contains('button_pressed_like')
  ) {
    handleLikeButton(evt);
    return;
  }
  if (evt.target.classList.contains('button_type_delete')) {
    deleteCard(evt);
  }
  if (evt.target.classList.contains('card__image')) {
    openPopupPicture(evt);
  }
};

const submitFormEdit = (evt) => {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  togglePopupClass(popupEdit);
};

const submitFormAdd = (evt) => {
  evt.preventDefault();
  const newCard = { name: placeInput.value, link: linkInput.value };
  initialCards.unshift(newCard);
  displayAllCards();
  togglePopupClass(popupAdd);
};

const closeOnOverlay = (element, evt) => {
  if (evt.target !== evt.currentTarget) {
    return;
  }
  togglePopupClass(element);
};

const closePopupEdit = (evt) => closeOnOverlay(popupEdit, evt);
const closePopupAdd = (evt) => closeOnOverlay(popupAdd, evt);
const closePopupPicture = (evt) => closeOnOverlay(popupPicture, evt);

const openPopupEdit = () => {
  togglePopupClass(popupEdit);
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
};

const openPopupAdd = () => togglePopupClass(popupAdd);

displayAllCards();

editButton.addEventListener('click', openPopupEdit);
formEdit.addEventListener('submit', submitFormEdit);
closeButtonEdit.addEventListener('click', closePopupEdit);
popupEdit.addEventListener('click', closePopupEdit);
addButton.addEventListener('click', openPopupAdd);
formAdd.addEventListener('submit', submitFormAdd);
closeButtonAdd.addEventListener('click', closePopupAdd);
popupAdd.addEventListener('click', closePopupAdd);
cardList.addEventListener('click', handleListClick);
closeButtonPopupPicture.addEventListener('click', closePopupPicture);
popupPicture.addEventListener('click', closePopupPicture);
