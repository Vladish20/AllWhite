'use strict'

import { getResponse } from './modules/backend.js';
import { adapter, clearHTMLItem } from './modules/common.js';
import './modules/fill-template-wrap.js';
import { renderCards } from './modules/render-cards.js';
import './modules/popup.js';
import { initFavorite } from './modules/favorite-add.js';
import { initFilters } from './modules/filters.js';
import './modules/jquery.js';
import './modules/filters.js';

const COUNT_CARDS = 30;
let cardsData = [];

const onError = (errorMessage) => {
    const popup = document.querySelector('.popup');
    const errorTemplate = `
    <div class='popup__error-message'>
        <h2 class="popup__title">Ошибка загрузки данных</h2>
        <div class="popup__description">
            <p>Ошибка: <span>${errorMessage}</span>, проверьте адрес и попробуйте перезагрузить страницу</p>
        </div>
    </div>
    `;
    clearHTMLItem(popup);
    popup.insertAdjacentHTML('beforeend', errorTemplate);
    popup.classList.add('popup--active');

};

const initListeners = (cardsData) => {
    renderCards(cardsData);
    initFilters(cardsData);
    initFavorite(cardsData);
};

const onLoad = (data) => {
    cardsData = adapter(data.products);
    const cardsCount = Math.min(cardsData.length, COUNT_CARDS);
    const cards = cardsData.slice(0, cardsCount);
    initListeners(cards)
};

getResponse(onLoad, onError);