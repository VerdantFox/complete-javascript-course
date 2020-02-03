import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResult = () => {
    elements.searchResList.innerHTML = '';
};

// 'Pasta with tomato and spinish'
/* 
acc: 0 / acc + curr.length = 5 / newTitle = ['pasta]
*/

const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);

        // return the result;
        return `${newTitle.join(' ')} ...`;
    }
    return title;
}

const renderRecipie = recipie => {
    const markup = `
    <li>
        <a class="results__link results__link--active" href="#${recipie.recipie_id}">
            <figure class="results__fig">
                <img src="${recipie.image_url}" alt="${recipie.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(recipie.title)}</h4>
                <p class="results__author">${recipie.publisher}</p>
            </div>
        </a>
    </li>
    `;
    elements.searchResList.insertAdjacentHTML("beforeend", markup);
};

// type: 'preve' or 'next'
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${(type === 'prev' ? page - 1 : page + 1)}>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${(type === 'prev' ? 'left' : 'right')}"></use>
        </svg>
        <span>Page ${(type === 'prev' ? page - 1 : page + 1)}</span>
    </button>
`;

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);
    let button;

    if (page === 1 && pages > 1) {
        /// Only button for next page
        button = createButton(page, 'next');
    } else if (page < pages) {
        // Display both buttons
        button = `
        ${createButton(page, 'prev')}
        ${createButton(page, 'next')}
        `;
    } 
    else if (page === pages && pages > 1) {
        // Only button for prev page
        button = createButton(page, 'prev');
    }

    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipies, page = 1, resPerPage = 10) => {
    // render results of current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    recipies.slice(start, end).forEach(renderRecipie);

    // render pagination buttons
    renderButtons(page, recipies.length, resPerPage);
}; 