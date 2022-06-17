'use strict'
import { clearHTMLItem, checkFavoriteCard } from './common.js';
import { onCardListFavoriteClick } from './favorite-add.js';
import { initMap } from './map.js';

const popup = document.querySelector('.popup');
let popupCloseBtn = popup.querySelector('.popup__close');
let popupFavoriteBtn = popup.querySelector('button.fav-add');
let galleryList = popup.querySelectorAll('.gallery__item');

const synhCardAndModal = (id) => {
  let like;
  document.querySelectorAll('.results__item').forEach(element => {
    if (element.getAttribute('data-id') === id) {
      like = element.querySelector(".product__favourite");
    }
  });

  like.classList.contains("fav-add--active") ? like.classList.remove("fav-add--active") : like.classList.add("fav-add--active");
};

const onPopupFavAddClick = (evt) => {
  onCardListFavoriteClick(evt);
  synhCardAndModal(evt.currentTarget.closest('.js-data-wrap').getAttribute('data-id'))
};

const getPhotoList = (list, name) => {
  let result = '';
  for (let i = 1; i < list.length; i++) {
    result += `
    <li class="gallery__item">
      <img src="${list[i]}" width="124" height="80" alt="${name}">
    </li>`;
  }
  return result;
}


const getPopupElement = (data) => {
  return `
    <div class = "popup__inner">
      <button class="popup__close" type="button" aria-label="Закрыть">
        <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M0.292893 0.292893C0.683418 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L8 6.58579L14.2929 0.292893C14.6834 -0.0976311 15.3166 -0.0976311 15.7071 0.292893C16.0976 0.683418 16.0976 1.31658 15.7071 1.70711L9.41421 8L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L8 9.41421L1.70711 15.7071C1.31658 16.0976 0.683418 16.0976 0.292893 15.7071C-0.0976311 15.3166 -0.0976311 14.6834 0.292893 14.2929L6.58579 8L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683418 0.292893 0.292893Z"/>
        </svg>
      </button>
      <h3 class="popup__title">${data.name}</h3>
      <div class="popup__columns">
        <div class="popup__left">
          <div class="popup__gallery gallery js-data-wrap" data-id = "${data.id}">
            <button class="gallery__favourite fav-add ${checkFavoriteCard(data)}">
              <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3 7C3 13 10 16.5 11 17C12 16.5 19 13 19 7C19 4.79086 17.2091 3 15 3C12 3 11 5 11 5C11 5 10 3 7 3C4.79086 3 3 4.79086 3 7Z" stroke="white" stroke-width="2" stroke-linejoin="round"/>
              </svg>
            </button>
            <div class="gallery__main-pic">
              <img src="${data.photos[0]}" width="520" height="340" alt="${data.name}">
            </div>
            <ul class="gallery__list">
              <li class="gallery__item gallery__item--active">
                <img src="${data.photos[0]}" width="124" height="80" alt="${data.name}">
              </li>
              ${getPhotoList(data.photos, data.name)}
            </ul>
          </div>
          <div class="popup__description">
            <h3>Описание Достопримечательности</h3>
            <p>${data.description}</p>
          </div>
        </div>
        <div class="popup__right">
          <div class="popup__map">
            <div class='map' id='map'></div>
          </div>
          <div class="popup__address">${data.address.city}, ${data.address.street}, ${data.address.building}</div>
        </div>
      </div>
    </div>`;

}

const setActivePicture = (picture) => {
  const popupPhotoList = popup.querySelectorAll('.gallery__item');
  for (const photo of popupPhotoList) {
    photo.classList.remove('gallery__item--active');
  }
  picture.currentTarget.classList.add('gallery__item--active');
}

const swapMainPhoto = (evt) => {
  const mainPhoto = popup.querySelector('.gallery__main-pic').querySelector('img');
  mainPhoto.src = evt.target.src;
  setActivePicture(evt);
}

export const openPopup = (cardData) => {
  clearHTMLItem(popup);
  popup.insertAdjacentHTML('afterBegin', getPopupElement(cardData));
  initMap(cardData.coordinates[0], cardData.coordinates[1])
  popup.classList.add('popup--active');
  popupFavoriteBtn = popup.querySelector('button.fav-add');
  popupCloseBtn = popup.querySelector('.popup__close');
  galleryList = popup.querySelectorAll('.gallery__item');
  initPopupEventListener();
}

const closePopup = () => {
  popup.classList.remove('popup--active');
  removePopupEventListener();
}

const popupBtnCloseClick = (evt) => {
  evt.preventDefault();
  closePopup();
}

const popupPressEsc = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault()
    closePopup();
  }
}

const overlayPopupClick = (evt) => {
  evt.preventDefault();
  if (evt.target.classList.contains('popup')) {
    closePopup();
  }
}

const initPopupEventListener = () => {
  galleryList.forEach(item => {
    item.addEventListener('click', swapMainPhoto)
  });
  popupCloseBtn.addEventListener('click', popupBtnCloseClick);
  document.addEventListener('keydown', popupPressEsc);
  popup.addEventListener('click', overlayPopupClick);
  popupFavoriteBtn.addEventListener('click', onPopupFavAddClick);
}

const removePopupEventListener = () => {
  galleryList.forEach(item => {
    item.removeEventListener('click', swapMainPhoto)
  });
  popupCloseBtn.removeEventListener('click', popupBtnCloseClick);
  document.removeEventListener('keydown', popupPressEsc);
  popup.removeEventListener('click', overlayPopupClick);
  popupFavoriteBtn.removeEventListener('click', onPopupFavAddClick);
}