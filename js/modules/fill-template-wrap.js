'use strict'

const getTamplateTag = (tagText) => {
    const div = document.createElement('div');
    div.insertAdjacentHTML('beforeend', tagText);
    return div.firstElementChild;
}

export const fillHTMLTemplates = (wrapper, template) => {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(getTamplateTag(template));
    wrapper.appendChild(fragment);
}