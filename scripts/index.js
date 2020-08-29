let profile = document.querySelector(".profile");
let editButton = profile.querySelector(".button_type_edit");
let popup = document.querySelector(".popup");
let nameInput = popup.querySelector(".input__text_profile_title");
let jobInput = popup.querySelector(".input__text_profile_subtitle");
let closeButton = popup.querySelector(".popup__button");
let formElement = popup.querySelector(".input");
let nameProfile = profile.querySelector(".profile__title");
let jobProfile = profile.querySelector(".profile__subtitle");

const popupToggle = () => popup.classList.toggle("popup_opened");

const formSubmitHandler = (evt) => {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  popupToggle();
};

const popupCloseOnOverlay = (event) => {
  if (event.target !== event.currentTarget) {
    return;
  }
  popupToggle();
};

const openPopup = () => {
  popupToggle();
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;

};

editButton.addEventListener("click", openPopup);
formElement.addEventListener("submit", formSubmitHandler);
closeButton.addEventListener("click", popupToggle);
popup.addEventListener("click", popupCloseOnOverlay);