/* Constants */
const apiUrl = "http://localhost:8000/api/v1/";
const numberOfElementsToDisplay = 10;
const genresToDisplay = {
    "Meilleurs films" : "",
    "Aventure": "Adventure"
};


/* Functions */
// Utils
function isNotEmpty(object) {
    /* Check if an object or a JSON isn't empty. */
    if (Object.keys(object).length !== 0) {return true;}
    else {return false;}
}

// Data extraction from API
function fetchData(endpoint) {
    /* Fetch and return data from an endpoint. */
    return fetch(endpoint)
        .then(function (response) {
            if (response.ok) {return response.json();}
            else {return {}}
        })
        .then(function(json) {
            if (isNotEmpty(json)) {return json;}
            else {return {};}
        })
        .catch(function (error) {
            console.log(error);
            return {};
        })
    }

function extractFilmJson(filmId){
    /* Extract and return a film JSON. */
    endpoint = `${apiUrl}titles/${filmId}`;
    return fetchData(endpoint);
}

function extractBestFilms(genreName) {
    /* Extract and return best films from a genre.
    If no genre is given, it returns best films all gender included. */
    //TODO: make this function recursive to explore pages and return the good number of elements
    endpoint = `${apiUrl}titles?sort_by=-imdb_score&genre=${genreName}`;
    return fetchData(endpoint);
}

function extractSortedFilms() {
    /* Extract and return an object containing all the films data. */
    let films = {};
    for (const [genreName, genreNameInApi] of Object.entries(genresToDisplay)) {
        films[genreName] = extractBestFilms(genreNameInApi);
    }
    return films;
}

// HTML generation from previously extracted data
function generateGenreSection(genreName, films) {
    console.log(genreName, films)
}

function generateMainContainerContent() {
    let sortedFilms = extractSortedFilms();
    for (const [genre, films] of Object.entries(sortedFilms)) {
        generateGenreSection(genre, films);
    }
}

/* Execution */
window.onload = function () {
    films = extractSortedFilms();
    console.log(films);
};
