import { initialCards } from './initialCards.js';

const templateCard = document.querySelector('#card-template').content;

function toggleIsLiked(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

function deleteCard(evt) {
  evt.target.closest('.card').remove();
}

function createCard (cardData, likeButton, deleteCard, handleImageClick) {
  const cardElement = templateCard.cloneNode(true);
  const cardImg = cardElement.querySelector('.card__image');
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardImg.src = cardData.link;
  cardImg.alt = cardData.name;
  const cardDeleteBtn = cardElement.querySelector('.card__delete-button');
  const cardLikeBtn = cardElement.querySelector('.card__like-button');
  cardDeleteBtn.addEventListener('click', deleteCard);
  cardLikeBtn.addEventListener('click', likeButton);
  cardImg.addEventListener('click', handleImageClick);
  return cardElement
}

export { createCard, toggleIsLiked, deleteCard }

