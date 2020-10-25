const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=820aac8b72e06febfb590dfaa08636ca&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI ="https://api.themoviedb.org/3/search/movie?&api_key=820aac8b72e06febfb590dfaa08636ca&query=";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

//Using React Async/Await
getMovies(APIURL);

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    console.log(respData);

    showMovies(respData.results);
}


form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);
        search.value = "";
    }
});
