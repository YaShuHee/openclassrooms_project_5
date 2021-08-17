/* Constants */
const apiUrl = "http://localhost:8000/api/v1/";
const numberOfFilmsByGenre = 20;
const visibleSlides = 7;
const genresToDisplay = {
    "best-films" : "",
    "adventure": "Adventure",
    "animation": "Animation",
    "action": "Action"
};
// /!\ Because of this next line, this script needs to be loaded at the end of html loading. /!\
const mainContainer = document.getElementById("main-container");



// CLASSES
class Carrousel {
    /**
     *
     * @param {HTMLElement} div
     */
    constructor(div) {
        this.root = div;
        let children = [].slice.call(this.root.children);
        // create the frame (overflow: hidden)
        this.frame = document.createElement("div");
        this.frame.className = "carrousel__frame";
        this.root.appendChild(this.frame);
        // create the items container (translateX)
        this.container = document.createElement("div");
        this.container.className = "carrousel__container";
        this.frame.appendChild(this.container);
        // fill the container with items
        for (const child of children) {
            this.container.appendChild(child);
        }
        this.createNavigation();
    }

    createNavigation() {
        this.previous = document.createElement("div");
        this.next = document.createElement("div");
        this.previous.className = "carrousel__scroll-button carrousel__previous-button";
        this.next.className = "carrousel__scroll-button carrousel__next-button";
        this.root.prepend(this.previous);
        this.root.appendChild(this.next);
        this.previous.addEventListener("click", () => {this.onPrevious();});
        this.next.addEventListener("click", () => {this.onNext();});
    }

    onPrevious() {
        this.container.style.transition = "none";
        this.container.style.transform = "translate3d(-14.29%, 0, 0)";
        this.container.prepend(this.container.lastChild);
        this.container.offsetHeight; // force repaint
        this.container.style.transition = "";
        this.container.style.transform = "translate3d(0, 0, 0)";
    }

    onNext() {
        this.container.style.transition = "";
        this.container.style.transform = "translate3d(-14.29%, 0, 0)";
        this.event = this.container.addEventListener("transitionend", () => {
            this.container.appendChild(this.container.firstChild);
            this.container.style.transition = "none";
            this.container.style.transform = "translate3d(0, 0, 0)";
        }, {once: true})
    }

    goToItem(number, animation=true) {
        this.activeItem = number;
        if (animation === false) {
            this.container.style.transition = "none";
        }
        this.updateView();
        if (animation === false) {
            this.container.style.transition = "";
        }
    }

    updateView() {
        console.log(this.activeItem);
        this.container.style.transform = "translateX(" + 14.29 * this.activeItem + "%)";
    }
}


// FUNCTIONS
// Utils
function isNotEmpty(object) {
    /**
     *  Check if an object or a JSON isn't empty. */
    if (Object.keys(object).length !== 0) {return true;}
    else {return false;}
}


// Html tag creation
function createHtmlTag(parent, tagType, classes="", id="") {
    /**
     *  Create an html tag. */
    let tag = document.createElement(tagType);
    if (classes !== "") {
        tag.className = classes;
    }
    if (id !== "") {
        tag.id = id;
    }
    parent.appendChild(tag);
    return tag;
}


function createDivTag(parent, classes="", id="") {
    /**
     *  Create a div html tag. */
    let div = createHtmlTag(parent, "div", classes, id);
    return div;
}


function createSectionTag(parent, classes="", id="") {
    /**
     *  Create a section html tag. */
    let section = createHtmlTag(parent, "section", classes, id);
    return section;
}


function createPTag(parent, content, classes="", id="") {
    /**
     *  Create a p html tag. */
    let p = createHtmlTag(parent, "p", classes, id);
    p.textContent = content;
    return p;
}


function createH1Tag(parent, content, classes="", id="") {
    /**
     *  Create an h1 html tag. */
    let h1 = createHtmlTag(parent, "h1", classes, id);
    h1.textContent = content;
    return h1;
}


function createH2Tag(parent, content, classes="", id="") {
    /**
     *  Create an h2 html tag. */
    let h2 = createHtmlTag(parent, "h2", classes, id);
    h2.textContent = content;
    return h2;
}


function createH3Tag(parent, content, classes="", id="") {
    /**
     *  Create an h3 html tag. */
    let h3 = createHtmlTag(parent, "h3", classes, id);
    h3.textContent = content;
    return h3;
}


function createH4Tag(parent, content, classes="", id="") {
    /**
     *  Create an h4 html tag. */
    let h4 = createHtmlTag(parent, "h4", classes, id);
    h4.textContent = content;
    return h4;
}


function createImgTag(parent, src, classes="", id="") {
    /**
     *  Create an img html tag. */
    let img = createHtmlTag(parent, "img", classes, id);
    img.src = src;
    return img;
}


// Data extraction from API
function fetchData(endpoint) {
    /**
     *  Fetch and return data from an endpoint. */
    return fetch(endpoint)
        .then(function (response) {
            if (response.ok) {return response.json();}
            else {return {}}
        })
        .then(function (json) {
            if (isNotEmpty(json)) {return json;}
            else {return {};}
        })
        .catch(function (error) {
            console.log(error);
            return {};
        })
}


function fetchFilmsList(endpoint, size, films=[]) {
    /**
     *  Fetch the best films from a genre. */
    return fetchData(endpoint).then(function(response) {
        films = films.concat(response["results"]);
        if (films.length < size) {
            return fetchFilmsList(response["next"], size, films);
        } else if (films.length > size) {
            return films.slice(0, size);
        } else {
            return films;
        }
    });
}


function fetchFilmInfos(filmId) {
    /**
     *  Fetch a film informations. */
    let endpoint = `${apiUrl}titles/${filmId}`;
    return fetchData(endpoint);
}


function destroyFilmModal() {
    /**
     *  Destroy a film modal. */
    document.getElementsByClassName("modal-layer")[0].remove();
}


function createModalField(parent, name, elmt, classes="", id="") {
    let div = createDivTag(parent, classes, id);
    createH4Tag(div, name);
    createPTag(div, elmt);
}

function createModalMultiField(parent, name, list, classes="", id="") {
    let div = createDivTag(parent, classes, id);
    createH4Tag(div, name);
    for (const elmt of list) {
        createPTag(div, elmt);
    }
}


function createFilmModal(filmId) {
    /**
     *  Create the html for a film modal. */
    filmPromise = fetchFilmInfos(filmId);
    // create and add the modal layer to DOM
    let modalLayer = createDivTag(mainContainer, classes="modal-layer");
    let modal = createDivTag(modalLayer, classes="modal");
    let cross = createPTag(modal, "🗙", classes="modal__cross");
    cross.addEventListener("click", function () {destroyFilmModal();});
    let leftContainer = createDivTag(modal, "modal__left-div");
    let rightContainer = createDivTag(modal, "modal__right-div");
    // create the modal content
    filmPromise.then(function (film) {
        createImgTag(leftContainer, film["image_url"]);
        createH3Tag(leftContainer, film["title"]);
        createModalMultiField(rightContainer, "Catégories: ", film["genres"]);
        createModalField(rightContainer, "Durée", film["duration"]);
        createModalMultiField(rightContainer, "Réalisateurs: ", film["directors"]);
        createModalMultiField(rightContainer, "Acteurs: ", film["actors"]);
        createModalField(rightContainer, "Année de sortie: ", film["year"]);
        createModalMultiField(rightContainer, "Pays: ", film["countries"]);
        createModalField(rightContainer, "Score IMDB: ", film["imdb_score"]);
        createModalField(rightContainer, "Résumé: ", film["long_description"]);
    });
}


function fillBestFilmSection(bestFilm) {
    /**
     * Fill the html for the best film. */
    console.log(bestFilm);
    let left = document.getElementsByClassName("best-film__left")[0];
    let right = document.getElementsByClassName("best-film__right")[0];
    // left
    let img = createImgTag(left, bestFilm["image_url"]);
    // right
    let title = createH2Tag(right, bestFilm["title"], classes="best-film__right__title");
    let button = createImgTag(right, "assets/svg/info.svg", classes="best-film__right__info-button");
    // fetch resume
    filmPromise = fetchFilmInfos(bestFilm["id"]);
    filmPromise.then(function (film) {
        console.log(film);
        createPTag(right, film["long_description"], classes="best-film__right__film-resume");
    });
    button.addEventListener("click", () => {createFilmModal(bestFilm["id"]);});
}


function fillGenreSection(genreId, films) {
    /**
     *  Fill the html for a genre section. */
    // get the section
    let div = document.querySelector("#"+genreId+">div.carrousel");
    // create and bind img
    for (const film of films) {
        createImgTag(div, film["image_url"])
            .addEventListener("click", function(event) {
                console.log(film["id"], film);
                createFilmModal(film["id"]);
            });
    }
    new Carrousel(div);
}


function treatGenreSection(genreId, genreUrl) {
    /**
     *  Treat the genre section. Use the promise to call the function that will create the html.
    It will also shift the best film from the "best films" category and call a function to create the top section. */
    size = numberOfFilmsByGenre;
    if (genreUrl === "") {
        size++;
    }
    endpoint = `${apiUrl}titles?genre=${genreUrl}&sort_by=-imdb_score`;
    fetchFilmsList(endpoint, size)
        .then(function(films) {
            if (genreUrl === "") {
                let bestFilm = films.shift();
                fillBestFilmSection(bestFilm);
            }
            fillGenreSection(genreId, films);
        });
}


// Main function
function createPageContent() {
    /**
     *  Create the page content. It will call "treatGenreSection" function for each film genre. */
    for (const [genreId, genreUrl] of Object.entries(genresToDisplay)) {
        treatGenreSection(genreId, genreUrl);
    }
}


// EXECUTION
window.onload = createPageContent();