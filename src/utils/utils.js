// import { formAdd, formEdit } from "./constants.js";
// import Card from "../components/Card.js";
// import PopupWithImage from "../components/PopupWithImage.js";
//
// export const submitFormEdit = (formValues) => {
//   const buttonSubmit = formEdit.querySelector(".form__button");
//   if (!buttonSubmit.classList.contains("form__button_disabled")) {
//     user.setUserInfo(formValues.profile_title, formValues.profile_subtitle);
//   }
// };
//
// export const submitFormAdd = (formValue) => {
//   const buttonSubmit = formAdd.querySelector(".form__button");
//   if (!buttonSubmit.classList.contains("form__button_disabled")) {
//     const newCard = new Card(
//       {
//         name: formValue.place_title,
//         link: formValue.place_link,
//       },
//       "#card",
//       ".card",
//       handleCardClick
//     );
//     cardList.addItemFirst(newCard.getCardElement());
//   }
// };
//
// export const handleCardClick = (ev) => {
//   const openedPopupWithImage = new PopupWithImage(".popup_type_picture", ev);
//   openedPopupWithImage.openPopup();
//   openedPopupWithImage.setEventListeners();
// };
