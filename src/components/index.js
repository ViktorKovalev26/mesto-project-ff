import '../pages/index.css';
import { initialCards, cardsContainer, createCard } from './cards.js';
import { openModal, closeModal } from './modal.js';

const profileEditBtn = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const closeButton = document.querySelectorAll(".popup__close");
const formElement = document.querySelector('form[name="edit-profile"]');
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const popupNewCard = document.querySelector(".popup_type_new-card");
const profileAddBtn = document.querySelector(".profile__add-button");
const formNewPlace = document.querySelector('form[name="new-place"]');
const cardInput = formNewPlace.querySelector(".popup__input_type_card-name");
const urlInput = formNewPlace.querySelector(".popup__input_type_url");

function addPopupProfile() {
  openModal(popupNewCard);
  formNewPlace.reset();
}

function fillPopupInputs() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

function editPopupProfile() {
  openModal(popupEdit);
  fillPopupInputs();
}

function editForm(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;
  closeModal(popupEdit);
  evt.removeEventListener('submit', editForm);
}

function addForm(evt) {
  evt.preventDefault();
  const cardValue = cardInput.value;
  const urlValue = urlInput.value;
  const newElement = {
    name: cardValue,
    link: urlValue
  }
  initialCards.unshift(newElement);
  const cardElement = createCard (newElement);
  cardsContainer.prepend(cardElement);
  closeModal(popupNewCard);
  evt.removeEventListener('submit', addForm);
}

initialCards.forEach( cardData => {
  const cardElement = createCard (cardData);
  cardsContainer.append(cardElement);
});

profileAddBtn.addEventListener('click', addPopupProfile);
profileEditBtn.addEventListener('click', editPopupProfile);
closeButton.forEach(function(cross) {
  cross.addEventListener("click", () => {
    closeModal(cross.closest('.popup'));
  })
});
formElement.addEventListener('submit', editForm);
formNewPlace.addEventListener('submit', addForm);