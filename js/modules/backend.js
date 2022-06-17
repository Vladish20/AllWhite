"use strict"

const SERVER_URL = "bd.json";

export const getResponse = (onLoad, onError) => {
  fetch(SERVER_URL)
    .then(respons => respons.json())
    .then(data => { onLoad(data) })
    .catch(err => onError(err))
};