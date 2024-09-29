function closePressEscape(evt) {
  if (evt.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
}

function closeOnOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closePressEscape);
  popup.addEventListener("mousedown", closeOnOverlay);
}

function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closePressEscape);
  popup.removeEventListener("mousedown", closeOnOverlay);
}

export { openModal, closeModal }