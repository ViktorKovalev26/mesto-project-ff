const hasInvalidInput = (inputList) => 
  inputList.some((input) => !input.validity.valid);

function showInputError ({
  formElement,
  inputElement,
  inputErrorClass,
  errorClass,
  errorMessage,
}) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
  inputElement.classList.add(inputErrorClass);
};

function hideInputError({
  formElement,
  inputElement,
  inputErrorClass,
  errorClass,
}) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
  inputElement.classList.remove(inputErrorClass);
};

function checkInputValidity({
  formElement,
  inputElement,
  inputErrorClass,
  errorClass,
}) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    showInputError({
      formElement,
      inputElement,
      inputErrorClass,
      errorClass,
      errorMessage: inputElement.validationMessage,
    });
  } else {
    hideInputError({
      formElement,
      inputElement,
      inputErrorClass,
      errorClass,
    });
  }
};

function toggleBtnState({
  inputList,
  submitBtnElement,
  inactiveBtnClass,
}) {
  if (hasInvalidInput(inputList)) {
    submitBtnElement.disabled = true;
    submitBtnElement.classList.add(inactiveBtnClass);
  } else {
    submitBtnElement.disabled = false;
    submitBtnElement.classList.remove(inactiveBtnClass);
  }
};

function setEventListeners({
  formElement,
  inputSelector,
  submitBtnSelector,
  inactiveBtnClass,
  inputErrorClass,
  errorClass,
}) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const submitBtnElement = formElement.querySelector(submitBtnSelector);
    toggleBtnState({
      inputList,
      submitBtnElement,
      inactiveBtnClass,
    });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity({
        formElement,
        inputElement,
        inputErrorClass,
        errorClass,
      });
      toggleBtnState({
        inputList,
        submitBtnElement,
        inactiveBtnClass,
      });
    });
  });
};

function enableValidation({
  formSelector,
  inputSelector,
  submitBtnSelector,
  inactiveBtnClass,
  inputErrorClass,
  errorClass,
}) {
  const formList = document.querySelectorAll(formSelector);

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });

  setEventListeners({
      formElement,
      inputSelector,
      submitBtnSelector,
      inactiveBtnClass,
      inputErrorClass,
      errorClass,
    });
  });
};

function clearValidation(
  formElement,
  {
    inputSelector,
    submitBtnSelector,
    inactiveBtnClass,
    inputErrorClass,
    errorClass,
  }) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const submitBtnElement = formElement.querySelector(submitBtnSelector);

  inputList.forEach((inputElement) => {
    hideInputError({
      formElement,
      inputElement,
      inputErrorClass,
      errorClass,
    });
  });
    toggleBtnState({
      inputList,
      submitBtnElement,
      inactiveBtnClass,
    });
};

export { enableValidation, clearValidation };