const templateCard = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');

function deleteCard(evt) {
  evt.target.closest('.card').remove();
}

function createCard (item) {
  const cardElement = templateCard.cloneNode(true);
  const cardImg = cardElement.querySelector('.card__image');
  cardElement.querySelector('.card__title').textContent = item.name;
  cardImg.src = item.link;
  cardImg.alt = item.name;

  const deleteCardBtn = cardElement.querySelector('.card__delete-button');
  deleteCardBtn.addEventListener('click', deleteCard);
  return cardElement
}

initialCards.forEach( item => {
    const cardElement = createCard (item)
    cardsContainer.append(cardElement);
});