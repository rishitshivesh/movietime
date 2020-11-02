const currentid = window.location.href.split('/')[4];    
const APIURL ="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=820aac8b72e06febfb590dfaa08636ca&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";

//document.addEventListener('DOMContentLoaded',()=>{
    getMovies(`https://api.themoviedb.org/3/movie/${currentid}?&api_key=820aac8b72e06febfb590dfaa08636ca`);

    async function getMovies(url) {
        const resp = await fetch(url);
        const respData = await resp.json();
        // console.log(respData);
        showMovie(respData);
    }

//});

function showMovie(movie){
    const body = document.querySelector('#mainbody');
    const text = document.querySelector('.maintext');
    document.querySelector('body').style.background='#22254b';
    if (movie.id){
    document.querySelector('title').innerText=`MovieTime | ${movie.title}`;
    var genres = "";
    var languages ="";
    movie.genres.forEach((genre)=>{
        if (genres===""){
            var temp = genre.name;
        }
        else{
            var temp = ', ' + genre.name;
        }
        genres += temp;
    });
    movie.spoken_languages.forEach((lang)=>{
        if (languages===""){
            var temp = lang.name;
        }
        else{
            var temp = ', ' + lang.name;
        }
        languages += temp;
    });
    var finalpath="";
    if(movie.backdrop_path){
        finalpath = movie.backdrop_path;
    }
    else{
        finalpath = movie.poster_path;
    }
    //console.log(movie.spoken_languages);
    //body.style.background = `url(${IMGPATH + movie.backdrop_path}) no-repeat center fixed`;
    // body.style.filter= 'blur(8px)';
    // text.style.backdrop="grayscale(0.5) opacity(0.8)";
    text.innerHTML = `
    
    <h1 style="color:auto; text-align:center;font-family: 'Dancing Script', cursive;">${movie.title}</h1>
    <center><i style="text-align:center;">${movie.tagline}</i></center>
    <hr>
    <img src="${IMGPATH + finalpath}" width="100%">
    <span><b>Genres</b>: ${genres}</span><br>
    <b>Release date</b>: ${movie.release_date}<br>
    <b>Status</b>: ${movie.status}<br>
    <b>Runtime</b>: ${movie.runtime} minutes<br>
    <b>Spoken Languages</b>: ${languages}<br>
    <hr> <p style="font-size:large;">${movie.overview}</p><hr>
    <b>IMDB</b>: <a href="https://www.imdb.com/title/${movie.imdb_id}" target="_blank"><i class='bx bxl-imdb' style="font-size:larger;"></i></a>
    
    `; 
}

    else if(movie.success == false ){
        console.log(`(${movie.status_code}) ${movie.status_message}`);
        text.innerHTML=`<h1>The Requested Page Cannot be found!!</h1>`;
        document.getElementById('booknow').style.display = 'None';
    }
}
