const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-25',
  headers: {
    authorization: 'fdfeac07-efaa-4faa-a366-e565ef394ffb',
    'Content-Type': 'application/json',
  },
};

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }

  return Promise.reject(`Ошибка: ${response.status}`);
};

function APIGetInitialCards() {
  return fetch(`${config.baseUrl}/cards`, { headers: config.headers }).then(
    handleResponse
  );
};

function APICreateCard ({ name, link }) {
  return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers,
      method: 'POST',
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(handleResponse);
};

function APIDeleteCard (cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    headers: config.headers,
    method: 'DELETE',
  }).then(handleResponse);
};

function APILikeCard (cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    headers: config.headers,
    method: 'PUT',
  }).then(handleResponse);
};

function APIUnLikeCard (cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    headers: config.headers,
    method: 'DELETE',
  }).then(handleResponse);
};

function APIGetUserInfo () {
  return fetch(`${config.baseUrl}/users/me`, { headers: config.headers }).then(
    handleResponse
  );
};

function APIUpdateUserInfo ({ name, description }) {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: 'PATCH',
    body: JSON.stringify({
      name,
      about: description,
    }),
  }).then(handleResponse);
};

function APIUpdateUserAvatar (url) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
      headers: config.headers,
      method: 'PATCH',
      body: JSON.stringify({
        avatar: url,
      }),
    }).then(handleResponse);
};

export {
  APIGetInitialCards,
  APICreateCard,
  APIDeleteCard,
  APILikeCard,
  APIUnLikeCard,
  APIGetUserInfo,
  APIUpdateUserInfo,
  APIUpdateUserAvatar,
};