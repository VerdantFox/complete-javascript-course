import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResult = () => {
    elements.searchResList.innerHTML = '';
};

const renderRecipie = recipie => {
    const markup = `
    <li>
        <a class="results__link results__link--active" href="#${recipie.recipie_id}">
            <figure class="results__fig">
                <img src="${recipie.image_url}" alt="${recipie.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${recipie.title}</h4>
                <p class="results__author">${recipie.publisher}</p>
            </div>
        </a>
    </li>
    `;
    elements.searchResList.insertAdjacentHTML("beforeend", markup);
};

export const renderResults = recipies => {
    recipies.forEach(renderRecipie);
}; 