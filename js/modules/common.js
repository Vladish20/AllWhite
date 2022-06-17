"use strict"

const DEMOUNCE_TIME = 500;



export const adapter = (cards) => {
    const cardsList = []
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        cardsList.push({
            id: `card_${i}`,
            favorite: false,
            name: card.name,
            description: card.description,
            price: card.price,
            coordinates: card.coordinates,
            address: {
                city: card.address.city,
                street: card.address.street,
                building: card.address.building,
            },
            photos: card.photos,
            filters: {
                type: card.filters.type,
                city: card.filters.city
            },
        })
    }
    return cardsList;
};

export const clearHTMLItem = item => {
    item.innerHTML = "";
}

export const checkFavoriteCard = (card) => {
    return card.favorite ? " fav-add--active" : "";
}

export const getCardContentData = (list, id) => list.find(item => item.id === id);

export const debouncing = (func) => {
  let timeout;
  return function () {
    const funcSteps = () => { func.apply(this, arguments) }
    clearTimeout(timeout);
    timeout = setTimeout(funcSteps, DEMOUNCE_TIME);
  };
};