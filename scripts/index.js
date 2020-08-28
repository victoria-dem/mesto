let profile = document.querySelector(".profile");
let editButton = profile.querySelector(".button-edit");
let popup = document.querySelector(".popup");
let nameInput = document.querySelector(".input__text_profile_title");
let jobInput = document.querySelector(".input__text_profile_subtitle");

const popupToggle = () => popup.classList.toggle("popup_opened");

const formSubmitHandler = (evt) => {
  evt.preventDefault();
  let name = nameInput.value;
  let job = jobInput.value;
  let nameModified = profile.querySelector(".profile__title");
  let jobModified = profile.querySelector(".profile__subtitle");
  if (name !== "") {
    nameModified.textContent = name;
  }
  if (job !== "") {
    jobModified.textContent = job;
  }
  popupToggle();
};

const popupCloseOnOverlay = (event) => {
  if (event.target !== event.currentTarget) {
    return;
  }
  popupToggle();
};

const editProfile = () => {
  popupToggle();
  let closeButton = popup.querySelector(".popup__close-btn");
  let formElement = document.querySelector(".input");
  let nameProfile = profile.querySelector(".profile__title");
  let jobProfile = profile.querySelector(".profile__subtitle");
  nameInput.placeholder = nameProfile.textContent;
  jobInput.placeholder = jobProfile.textContent;
  formElement.addEventListener("submit", formSubmitHandler);
  closeButton.addEventListener("click", popupToggle);
  popup.addEventListener("click", popupCloseOnOverlay);
};

editButton.addEventListener("click", editProfile);
