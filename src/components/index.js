import '../pages/index.css';

import {
  closeModal,
  openModal,
} from '../components/modal.js';

import { createCard as DOMCreateCard } from '../components/cards.js';

import {
  APIGetInitialCards,
  APIGetUserInfo,
  APIUpdateUserAvatar,
  APIUpdateUserInfo,
  APILikeCard,
  APIUnLikeCard,
  APICreateCard,
  APIDeleteCard,
} from '../components/api.js';

import { clearValidation, enableValidation } from '../components/validation.js';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitBtnSelector: '.popup__button',
  inactiveBtnClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

const popupImage = document.querySelector('.popup_type_image');
const popupImageCaption = popupImage.querySelector('.popup__caption');
const popupImageImage = popupImage.querySelector('.popup__image');

const cardsContainer = document.querySelector('.places__list');
const closeBtns = document.querySelectorAll(".popup__close");
const cardForm = document.forms['new-place'];
const cardFormSubmitBtn = cardForm.querySelector('.popup__button');
const cardNameInput = cardForm.elements['place-name'];
const cardLinkInput = cardForm.elements.link;

const popupCard = document.querySelector('.popup_type_new-card');
const popupCardBtnOpen = document.querySelector('.profile__add-button');

const profileImageForm = document.forms['edit-avatar'];
const profileImageInput = profileImageForm.elements.avatar;
const profileImageFormSubmitBtn = profileImageForm.querySelector('.popup__button');

const popupProfileImage = document.querySelector('.popup_type_edit-avatar');

const profileImage = document.querySelector('.profile__image');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const profileForm = document.forms['edit-profile'];
const profileFormSubmitBtn = profileForm.querySelector('.popup__button');
const profileNameInput = profileForm.elements.name;
const profileDescriptionInput = profileForm.elements.description;

const popupProfile = document.querySelector('.popup_type_edit');
const popupProfileBtnOpen = document.querySelector('.profile__edit-button');

function setProfile({ name, description, avatar }) {
  profileName.textContent = name;
  profileDescription.textContent = description;
  profileImage.style.backgroundImage = `url(${avatar})`;
};

function renderLoading({ btnElement, isLoading }) {
  if (isLoading) {
    btnElement.textContent = 'Сохранение...';
  } else {
    btnElement.textContent = 'Сохранить';
  }
};

function handleCardLike({ cardId, btnElement, counterElement }) {
  btnElement.disabled = true;

  if (btnElement.classList.contains('card__like-button_is-active')) {
    APIUnLikeCard(cardId)
      .then(({ likes }) => {
        btnElement.classList.remove('card__like-button_is-active');

        if (likes.length) {
          counterElement.classList.add('card__like-counter_is-active');
          counterElement.textContent = likes.length;
        } else {
          counterElement.classList.remove('card__like-counter_is-active');
          counterElement.textContent = '';
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        btnElement.disabled = false;
      });
  } else {
    APILikeCard(cardId)
      .then(({ likes }) => {
        btnElement.classList.add('card__like-button_is-active');

        counterElement.classList.add('card__like-counter_is-active');
        counterElement.textContent = likes.length;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        btnElement.disabled = false;
      });
  }
};

function handleCardDelete({ cardId, btnElement }) {
    APIDeleteCard(cardId)
      .then(() => {
        btnElement.closest('.card').remove();
      })
      .catch((err) => {
        console.log(err);
      });
};

function handleCardFormSubmit(event) {
  event.preventDefault();

  renderLoading({
    btnElement: cardFormSubmitBtn,
    isLoading: true,
  });

  APICreateCard({
    name: cardNameInput.value,
    link: cardLinkInput.value,
  })
    .then((cardData) => {
      cardsContainer.prepend(
        DOMCreateCard({
          currentUserId: cardData.owner['_id'],
          cardData: cardData,
          deleteCard: handleCardDelete,
          toggleIsLiked: handleCardLike,
          handleImageClick: handleCardImageClick,
        })
      );

      cardForm.reset();

      closeModal(popupCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading({
        btnElement: cardFormSubmitBtn,
        isLoading: false,
      });
    });
};

function handleProfileFormSubmit(event) {
  event.preventDefault();

  renderLoading({
    btnElement: profileFormSubmitBtn,
    isLoading: true,
  });

  APIUpdateUserInfo({
    name: profileNameInput.value,
    description: profileDescriptionInput.value,
  })
    .then(({ name, about, avatar }) => {
      setProfile({
        name,
        description: about,
        avatar,
      });

      closeModal(popupProfile);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading({
        btnElement: profileFormSubmitBtn,
        isLoading: false,
      });
    });
};

function handleProfileImageFormSubmit(event) {
  event.preventDefault();

  renderLoading({
    btnElement: profileImageFormSubmitBtn,
    isLoading: true,
  });

  APIUpdateUserAvatar(profileImageInput.value)
    .then(({ name, about, avatar }) => {
      setProfile({
        name,
        description: about,
        avatar,
      });

      closeModal(popupProfileImage);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading({
        btnElement: profileImageFormSubmitBtn,
        isLoading: false,
      });
    });
};

function handlePopupProfileBtnOpenClick() {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  clearValidation(profileForm, validationConfig);

  openModal(popupProfile);
};

function handlePopupCardBtnOpenClick() {
  cardForm.reset();

  clearValidation(cardForm, validationConfig);

  openModal(popupCard);
};

function handleCardImageClick({ cardName, cardLink }) {
  popupImageImage.src = cardLink;
  popupImageImage.alt = cardName;
  popupImageCaption.textContent = cardName;

  openModal(popupImage);
};

function handleProfileImageClick() {
  profileImageForm.reset();

  clearValidation(profileImageForm, validationConfig);

  openModal(popupProfileImage);
};

cardForm.addEventListener('submit', handleCardFormSubmit);
profileForm.addEventListener('submit', handleProfileFormSubmit);
profileImageForm.addEventListener('submit', handleProfileImageFormSubmit);
profileImage.addEventListener('click', handleProfileImageClick);
popupCardBtnOpen.addEventListener('click', handlePopupCardBtnOpenClick);
popupProfileBtnOpen.addEventListener('click', handlePopupProfileBtnOpenClick);

closeBtns.forEach(function(cross) {
  cross.addEventListener("click", () => {
    closeModal(cross.closest('.popup'));
  })
});

enableValidation(validationConfig);

Promise.all([APIGetUserInfo(), APIGetInitialCards()])
  .then(([{ name, about, avatar, ['_id']: currentUserId }, cardsData]) => {
    setProfile({
      name,
      description: about,
      avatar,
    });

    cardsData.forEach((cardData) => {
      cardsContainer.append(
        DOMCreateCard({
          currentUserId,
          cardData: cardData,
          deleteCard: handleCardDelete,
          toggleIsLiked: handleCardLike,
          handleImageClick: handleCardImageClick,
        })
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });