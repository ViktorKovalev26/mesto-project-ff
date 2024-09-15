const templateCard = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');

function deleteCard(evt) {
  evt.target.closest('.card').remove();
}

function createCard (cardData) {
  const cardElement = templateCard.cloneNode(true);
  const cardImg = cardElement.querySelector('.card__image');
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardImg.src = cardData.link;
  cardImg.alt = cardData.name;

  const deleteCardBtn = cardElement.querySelector('.card__delete-button');
  deleteCardBtn.addEventListener('click', deleteCard);
  return cardElement
}

initialCards.forEach( cardData => {
    const cardElement = createCard (cardData)
    cardsContainer.append(cardElement);
});