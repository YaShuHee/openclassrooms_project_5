/* Constants */
const apiUrl = "http://localhost:8000/api/v1/";
const numberOfElementsToDisplay = 10;
const genresToDisplay = {
    "Meilleurs films" : "",
    "Aventure": "Adventure",
    "Animation": "Animation",
    "Action": "Action"
};


// FUNCTIONS
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


function fetchFilmsList(genreUrl) {
    /* Fetch the best films from a genre. */
    let endpoint = `${apiUrl}titles?sort_by=-imdb_score&genre=${genreUrl}`;
    return fetchData(endpoint);
}


function createBestFilmSection(bestFilm) {
    /* Create the html for the best film. */
    console.log(bestFilm);
}


function createGenreSection(genreName, films) {
    /* Create the html for a genre section. */
    console.log(genreName, films);
}


function treatGenreSection(genreName, genreUrl) {
    /* Treat the genre section. Use the promise to call the function that will create the html.
    It will also shift the best film from the "best films" category and call a function to create the top section. */
    filmsPromise = fetchFilmsList(genreUrl);
    filmsPromise.then(function(response) {
        films = response["results"]
        if (genreUrl === "") {
            let bestFilm = films.shift();
            createBestFilmSection(bestFilm);
        }
        createGenreSection(genreName, films);
    });
}


// Main function
function createPageContent() {
    /* Create the page content. It will call "treatGenreSection" function for each film genre. */
    for (const [genreName, genreUrl] of Object.entries(genresToDisplay)) {
        treatGenreSection(genreName, genreUrl);
    }
}


// EXECUTION
window.onload = createPageContent();