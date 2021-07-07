const apiUrl = "http://localhost:8000/api/v1/"


class FilmDiv {
    constructor(parent, object) {
        console.log("Création d'un FilmDiv.");
        console.log(object);
        this.parent = parent;
        // title
        this.title = document.createElement("p");
        this.title.textContent = object["title"]
        this.title.classList.add("title");
        this.parent.appendChild(this.title);
        // image
        this.image = document.createElement("img");
        this.image.src = object["image_url"]
        this.image.classList.add("image");
        this.parent.appendChild(this.image);
        // genres
        this.genres = [];
        for (let genre of object["genres"]) {
            this.genres.push(document.createElement("p"));
            let lastEltRange = this.genres.length - 1;
            this.genres[lastEltRange].textContent = genre;
            this.genres[lastEltRange].classList.add("genre");
            this.parent.appendChild(this.genres[lastEltRange]);
        }
        // date published
        this.datePublished = document.createElement("p");
        this.datePublished.textContent = object["date_published"]
        this.datePublished.classList.add("date_published");
        this.parent.appendChild(this.datePublished);
        // rated
        this.rated = document.createElement("p");
        this.rated.textContent = object["rated"]
        this.rated.classList.add("rated");
        this.parent.appendChild(this.rated);
        // imdb score
        this.imdbScore = document.createElement("p");
        this.imdbScore.textContent = object["imdb_score"]
        this.imdbScore.classList.add("imdb_score");
        this.parent.appendChild(this.imdbScore);
        // directors
        this.directors = [];
        for (let director of object["directors"]) {
            this.directors.push(document.createElement("p"));
            let lastEltRange = this.directors.length - 1;
            this.directors[lastEltRange].textContent = director;
            this.directors[lastEltRange].classList.add("director");
            this.parent.appendChild(this.directors[lastEltRange]);
        }
        // actors
        this.actors = [];
        for (let actor of object["actors"]) {
            this.actors.push(document.createElement("p"));
            let lastEltRange = this.actors.length - 1;
            this.actors[lastEltRange].textContent = actor;
            this.actors[lastEltRange].classList.add("actor");
            this.parent.appendChild(this.actors[lastEltRange]);
        }
        // duration
        this.duration = document.createElement("p");
        this.duration.textContent = object["duration"]
        this.duration.classList.add("duration");
        this.parent.appendChild(this.duration);
        // countries
        this.countries = [];
        for (let country of object["countries"]) {
            this.countries.push(document.createElement("p"));
            let lastEltRange = this.countries.length - 1;
            this.countries[lastEltRange].textContent = country;
            this.countries[lastEltRange].classList.add("country");
            this.parent.appendChild(this.countries[lastEltRange]);
        }
        // box office
        this.boxOfficeResult = document.createElement("p");
        this.boxOfficeResult.textContent = false; //need to calculate it
        this.boxOfficeResult.classList.add("box_office_result");
        this.parent.appendChild(this.boxOfficeResult);
        // description
        this.description = document.createElement("p");
        this.description.textContent = object["description"];
        this.description.classList.add("description");
        this.parent.appendChild(this.description);
    }
}


function getFilmJson(filmId) {
    let parent = document.getElementById("film-container");

    fetch(`${apiUrl}titles/${filmId}`)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
        })
        .then(function (value) {
            return new FilmDiv(parent, value);
        })
        .catch(function (error) {
            console.log(error);
            // return new FilmDiv(parent, {});
        });
}


window.onload = function() {
    let filmDiv = getFilmJson(2101);
}