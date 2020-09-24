const setEventListener = (form, inputClasses) => {
  const inputList = Array.from(
    form.querySelectorAll(inputClasses.inputSelector)
  );
  const buttonElement = form.querySelector(inputClasses.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, inputClasses);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(form, inputElement, inputClasses);
      toggleButtonState(inputList, buttonElement, inputClasses);
    });
  });
};

const toggleButtonState = (inputList, buttonElement, inputClasses) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inputClasses.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inputClasses.inactiveButtonClass);
  }
};

const checkInputValidity = (form, inputElement, inputClasses) => {
  if (!inputElement.validity.valid) {
    showInputError(
      form,
      inputElement,
      inputElement.validationMessage,
      inputClasses
    );
  } else {
    hideInputError(form, inputElement, inputClasses);
  }
};

const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  inputClasses
) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputClasses.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(inputClasses.errorClass);
};

const hasInvalidInput = (inputList) =>
  inputList.some((elm) => !elm.validity.valid);

const hideInputError = (formElement, inputElement, inputClasses) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputClasses.inputErrorClass);
  errorElement.classList.remove(inputClasses.errorClass);
  errorElement.textContent = "";
};

const enableValidation = (inputClasses) => {
  const formList = Array.from(
    document.querySelectorAll(inputClasses.formSelector)
  );
  formList.forEach((form) => {
    setEventListener(form, inputClasses);
  });
};

enableValidation({
  formSelector: ".form",
  inputSelector: ".form__text",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__text_type_error",
  errorClass: "form__error_visible",
});
