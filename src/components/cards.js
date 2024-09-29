import { openModal } from './modal.js';

const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

const templateCard = document.querySelector('#card-template').content;
const popupImage = document.querySelector('.popup_type_image');
const popupImageZoom = popupImage.querySelector(".popup__image");
const popupCaptionZoom = popupImage.querySelector(".popup__caption");
const cardsContainer = document.querySelector('.places__list');

function createCard (cardData) {
  const cardElement = templateCard.cloneNode(true);
  const cardImg = cardElement.querySelector('.card__image');
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardImg.src = cardData.link;
  cardImg.alt = cardData.name;
  const cardDeleteBtn = cardElement.querySelector('.card__delete-button');
  const cardImgZoom = cardElement.querySelector('.card__image');
  cardDeleteBtn.addEventListener('click', deleteCard);
  cardsContainer.addEventListener('click', toggleIsLiked);
  cardImgZoom.addEventListener('click', zoomPopupImg);
  return cardElement
}

function deleteCard(evt) {
  evt.target.closest('.card').remove();
}

function toggleIsLiked(evt) {
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active');
  }
}

function zoomPopupImg(evt) {
  openModal(popupImage);
  popupImageZoom.src = evt.target.src;
  popupImageZoom.alt = evt.target.alt;
  popupCaptionZoom.textContent = evt.target.alt;
}

export { initialCards, cardsContainer, createCard }