import '../pages/index.css';
import { initialCards } from './initialCards.js';
import { createCard, toggleIsLiked, deleteCard } from './cards.js';
import { openModal, closeModal } from './modal.js';

const cardsContainer = document.querySelector('.places__list');
const profileEditBtn = document.querySelector('.profile__edit-button');
const popupEdit = document.querySelector('.popup_type_edit');
const closeButtons = document.querySelectorAll(".popup__close");
const profileForm = document.querySelector('form[name="edit-profile"]');
const nameInput = profileForm.querySelector(".popup__input_type_name");
const jobInput = profileForm.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const popupNewCard = document.querySelector(".popup_type_new-card");
const profileAddBtn = document.querySelector(".profile__add-button");
const formNewPlace = document.querySelector('form[name="new-place"]');
const cardInput = formNewPlace.querySelector(".popup__input_type_card-name");
const urlInput = formNewPlace.querySelector(".popup__input_type_url");
const popupImage = document.querySelector('.popup_type_image');
const popupImageZoom = popupImage.querySelector(".popup__image");
const popupCaptionZoom = popupImage.querySelector(".popup__caption");

function addPopupProfile() {
  openModal(popupNewCard);
}

function fillProfileInputs() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

function openProfilePopup() {
  openModal(popupEdit);
  fillProfileInputs();
}

function zoomPopupImg(evt) {
  openModal(popupImage);
  popupImageZoom.src = evt.target.src;
  popupImageZoom.alt = evt.target.alt;
  popupCaptionZoom.textContent = evt.target.alt;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;
  profileForm.reset();
  closeModal(popupEdit);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const newElement = {
    name: cardInput.value,
    link: urlInput.value
  }
  const cardElement = createCard (newElement, toggleIsLiked, deleteCard, zoomPopupImg);
  cardsContainer.prepend(cardElement);
  formNewPlace.reset();
  closeModal(popupNewCard);
}

initialCards.forEach( cardData => {
  const cardElement = createCard (cardData, toggleIsLiked, deleteCard, zoomPopupImg);
  cardsContainer.append(cardElement);
});

profileAddBtn.addEventListener('click', addPopupProfile);
profileEditBtn.addEventListener('click', openProfilePopup);
closeButtons.forEach(function(cross) {
  cross.addEventListener("click", () => {
    closeModal(cross.closest('.popup'));
  })
});
profileForm.addEventListener('submit', handleProfileFormSubmit);
formNewPlace.addEventListener('submit', handleCardFormSubmit);