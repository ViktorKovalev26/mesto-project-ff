!function(){"use strict";var e=document.querySelector("#card-template").content;function t(e){e.target.classList.toggle("card__like-button_is-active")}function n(e){e.target.closest(".card").remove()}function r(t,n,r,o){var c=e.cloneNode(!0),p=c.querySelector(".card__image");c.querySelector(".card__title").textContent=t.name,p.src=t.link,p.alt=t.name;var u=c.querySelector(".card__delete-button"),a=c.querySelector(".card__like-button");return u.addEventListener("click",r),a.addEventListener("click",n),p.addEventListener("click",o),c}function o(e){"Escape"===e.key&&u(document.querySelector(".popup_is-opened"))}function c(e){e.target===e.currentTarget&&u(e.currentTarget)}function p(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",o),e.addEventListener("mousedown",c)}function u(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",o),e.removeEventListener("mousedown",c)}var a=document.querySelector(".places__list"),d=document.querySelector(".profile__edit-button"),i=document.querySelector(".popup_type_edit"),s=document.querySelectorAll(".popup__close"),l=document.querySelector('form[name="edit-profile"]'),_=l.querySelector(".popup__input_type_name"),m=l.querySelector(".popup__input_type_description"),y=document.querySelector(".profile__title"),v=document.querySelector(".profile__description"),f=document.querySelector(".popup_type_new-card"),k=document.querySelector(".profile__add-button"),q=document.querySelector('form[name="new-place"]'),S=q.querySelector(".popup__input_type_card-name"),g=q.querySelector(".popup__input_type_url"),E=document.querySelector(".popup_type_image"),L=E.querySelector(".popup__image"),h=E.querySelector(".popup__caption");function x(e){p(E),L.src=e.target.src,L.alt=e.target.alt,h.textContent=e.target.alt}[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){var o=r(e,t,n,x);a.append(o)})),k.addEventListener("click",(function(){p(f)})),d.addEventListener("click",(function(){p(i),_.value=y.textContent,m.value=v.textContent})),s.forEach((function(e){e.addEventListener("click",(function(){u(e.closest(".popup"))}))})),l.addEventListener("submit",(function(e){e.preventDefault();var t=_.value,n=m.value;y.textContent=t,v.textContent=n,l.reset(),u(i)})),q.addEventListener("submit",(function(e){e.preventDefault();var o=r({name:S.value,link:g.value},t,n,x);a.prepend(o),q.reset(),u(f)}))}();