const templateCard = document.querySelector('#card-template').content;
const liCard = document.querySelector('.places__list');

initialCards.forEach( item => {
    
    const liElement = templateCard.cloneNode(true);

    liElement.querySelector('.card__title').textContent = item.name;
    liElement.querySelector('.card__image').src = item.link;
    liElement.querySelector('.card__image').alt = item.name;

    const deleteCardBtn = liElement.querySelector('.card__delete-button');
    deleteCardBtn.addEventListener('click', deleteCard);

    liCard.append(liElement);
});

function deleteCard() {
  this.parentNode.remove();
}
