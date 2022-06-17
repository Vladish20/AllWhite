'use strict'

import { renderCards } from './render-cards.js'

const form = document.querySelector('.filter__form');
let filterData = [];
export let filterDataCopy = [];


const checkCardType = (cardType, pametnik, arhiteckura, komplex) => {
    if (pametnik || arhiteckura || komplex) {
        switch (cardType) {
            case "pametnik":
                return pametnik

            case "arhiteckura":
                return arhiteckura

            case "komplex":
                return komplex
        }
    }
    else return true;
}

const checkCardRooms = (cardSity, brest, gomel, grodno, vitebsck, minsk, mogilev) => {
    if (brest || gomel || grodno || vitebsck || minsk || mogilev) {
        switch (cardSity) {
            case "brest":
                return brest

            case "gomel":
                return gomel

            case "grodno":
                return grodno

            case "vitebsck":
                return vitebsck
    
            case "minsk":
                return minsk
    
            case "mogilev":
                return mogilev
        }
    }
    else return true;
}

const getFiltersData = () => {
    const { pametnik, arhiteckura, komplex, brest, gomel, grodno, vitebsck, minsk, mogilev } = form;
    const values = {
        pametnik: pametnik.checked,
        arhiteckura: arhiteckura.checked,
        komplex: komplex.checked,
        brest: brest.checked,
        gomel: gomel.checked,
        grodno: grodno.checked,
        vitebsck: vitebsck.checked,
        minsk: minsk.checked,
        mogilev: mogilev.checked,
    }

    return values;
}

const filtredCardsList = (evt) => {
    evt.preventDefault();
    const filteredFormData = getFiltersData();
    const filteredData = filterData.filter(card => (
        checkCardType(card.filters.type, filteredFormData.pametnik, filteredFormData.arhiteckura, filteredFormData.komplex) &&
        checkCardRooms(card.filters.city, filteredFormData.brest, filteredFormData.gomel, filteredFormData.grodno, filteredFormData.vitebsck, filteredFormData.minsk, filteredFormData.mogilev))
    );
    filterDataCopy = filteredData;
    renderCards(filteredData);
};


const initListener = () => {
    form.addEventListener('submit', filtredCardsList);
};

export const initFilters = (cardsData) => {
    filterData = cardsData;
    filterDataCopy = filterData.slice();
    initListener();
};
