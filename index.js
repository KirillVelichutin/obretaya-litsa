const showMore = document.getElementById('show-more');
const slides = document.getElementsByClassName("member-card");
const filmsList = document.getElementById('films-list');

const filmsStep = 3;
let visibleFilmsCount = filmsStep;

function areAllFilmsShown() {
    return visibleFilmsCount >= filmsData.length;
}

function createFilmItem(film) {
    const li = document.createElement('li');
    li.className = 'films-list-item';

    li.innerHTML = `
    <div class='film-poster-conteiner'>
        <img class='film-poster' src='${film.image}' alt='Постер фильма "${film.name}"' loading='lazy' decoding='async'>
    </div>
    <div class='films-list-text'>
        <p>${film.name}</p>
        <p>реж. ${film.producer}</p>
        <p>${film.description}</p>
    </div>
    `;

    return li;
}

function renderFilms() {
    const filmsToRender = filmsData.slice(0, visibleFilmsCount);

    filmsList.replaceChildren(...filmsToRender.map(createFilmItem));
    showMore.textContent = areAllFilmsShown() ? 'СКРЫТЬ ПОКАЗАННЫЕ' : 'СМОТРЕТЬ ЕЩЁ';
}


function checkWindowWidth() {
    if (window.innerWidth <= 550) {
        showSlides(slideIndex);
    } else {
        showAllSlides();
    }

    renderFilms();
};

const prev = document.getElementById('prev');
const next = document.getElementById('next');
let slideIndex = 1;

function changeSlides(n) {
    showSlides(slideIndex += n);
};

function showSlides(n) {
    if (n > slides.length) {slideIndex = 1};

    if (n < 1) {slideIndex = slides.length};

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    };

    slides[slideIndex - 1].style.display = "block";
};

function showAllSlides() {
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "block";
    };
};

function showMoreFilms() {
    if (areAllFilmsShown()) {
        visibleFilmsCount = filmsStep;
        filmsList.scrollIntoView({});
    } else {
        visibleFilmsCount += filmsStep;
    }

    renderFilms();
};

prev.addEventListener('click', () => changeSlides(-1));
next.addEventListener('click', () => changeSlides(1));
showMore.addEventListener('click', showMoreFilms);

checkWindowWidth();
window.addEventListener('resize', checkWindowWidth);
