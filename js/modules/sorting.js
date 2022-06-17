'use strict'

import { renderCards } from './render-cards.js';
import { debouncing } from './common.js';

const sortBtnList = document.querySelectorAll('.sorting__order-tab input[name=sorting-order]');
export let sortedDataCopy = [];


export const sortingBtnAddEventListeners = () => {
  sortBtnList.forEach(item => {
    item.addEventListener('change', debouncing((evt) => {
      sortedDataCopy = sortbyField(evt.target.value);
      renderCards(sortedDataCopy);
    }));
  })
}
