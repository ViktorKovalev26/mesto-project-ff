const templateCard = document.querySelector('#card-template').content;

function createCard ({
  currentUserId,
  cardData,
  deleteCard,
  toggleIsLiked,
  handleImageClick,
}) {
  const cardElement = templateCard.cloneNode(true);
  const cardImg = cardElement.querySelector('.card__image');
  const counter = cardElement.querySelector('.card__like-counter');
  const cardDeleteBtn = cardElement.querySelector('.card__delete-button');
  const cardLikeBtn = cardElement.querySelector('.card__like-button');
  cardImg.src = cardData.link;
  cardImg.alt = cardData.name;
  cardImg.addEventListener('click',  () => {
    handleImageClick({
      cardName: cardData.name,
      cardLink: cardData.link,
    })
  });
  cardElement.querySelector('.card__title').textContent = cardData.name;
  if (cardData.likes.length > 0) {
    counter.classList.add('card__like-counter_is-active');
    counter.textContent = cardData.likes.length;
  }
  if (cardData.owner._id === currentUserId) {
    cardDeleteBtn.classList.add('card__delete-button_is-active');
    cardDeleteBtn.addEventListener('click', () => {
      deleteCard({
        cardId: cardData._id,
        cardElement: cardElement,
        btnElement: cardDeleteBtn,
      });
    });
  }
  if (cardData.likes.find((item) => item._id === currentUserId)) {
    cardLikeBtn.classList.add('card__like-button_is-active');
  }
  
  cardLikeBtn.addEventListener('click', () => {
    toggleIsLiked({
      cardId: cardData._id,
      btnElement: cardLikeBtn,
      counterElement: counter,
    });
  });
  
  return cardElement;
}

export { createCard };