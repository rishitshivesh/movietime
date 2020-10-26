const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=820aac8b72e06febfb590dfaa08636ca&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI ="https://api.themoviedb.org/3/search/movie?&api_key=820aac8b72e06febfb590dfaa08636ca&query=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const forms = document.getElementById("forms");
const searchs = document.getElementById("searchs");

//Using React Async/Await
getMovies(APIURL);

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    //console.log(respData);

    showMovies(respData.results);
}

function showMovies(movies) {
    // clear main
    main.innerHTML = "";

    movies.forEach((movie) => {
        const { poster_path, title, vote_average, overview, id, adult } = movie;

        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");
        movieEl.classList.add("mx-auto");
        var finalimage = "";
        if(movie.poster_path){
            finalimage = IMGPATH + movie.poster_path;
        }
        else{
            finalimage = "https://imgur.com/YpdkEY7.png";
        }
        movieEl.style.margin = '2%';
        if(adult) {
            movieEl.innerHTML = `
            <a href="movies/${id}">
                <img
                    src="${finalimage}"
                    alt="${title}"
                />
                <div class="movie-info">
                    <h3>${title}</h3>
                    <span class="red">A</span>
                    <span class="${getClassByRate(vote_average)}">${vote_average}</span>
                </div>
                <div class="overview">
                    <h3>Overview:</h3>
                    ${overview}
                </div>
                </a>
            `;
        
        }
        else{
            movieEl.innerHTML = `
            <a href="movies/${id}">
                <img src="${IMGPATH + poster_path}" alt="${title}"/>
                <div class="movie-info">
                    <h3>${title}</h3>
                    <span class="${getClassByRate(vote_average)}">${vote_average}</span>
                </div>
                <div class="overview">
                    <h3>Overview:</h3>
                    ${overview}
                </div>
                </a>
            `;
        }
        main.appendChild(movieEl);
    });
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);
        // search.value = "";
    }
});

forms.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = searchs.value;

    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);
        // searchs.value = "";
    }
});
