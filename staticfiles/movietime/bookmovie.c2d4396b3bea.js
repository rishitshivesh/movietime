const IMGPATH = "https://image.tmdb.org/t/p/w1280";
document.addEventListener('DOMContentLoaded',()=>{
    var date= new Date().toISOString()


    Date.prototype.toIsoString = function() {
        var tzo = -this.getTimezoneOffset(),
            dif = tzo >= 0 ? '+' : '-',
            pad = function(num) {
                var norm = Math.floor(Math.abs(num));
                return (norm < 10 ? '0' : '') + norm;
            };
        return this.getFullYear() +
            '-' + pad(this.getMonth() + 1) +
            '-' + pad(this.getDate()) +
            'T' + pad(this.getHours()) +
            ':' + pad(this.getMinutes()) +
            ':' + pad(this.getSeconds()) +
            dif + pad(tzo / 60) +
            ':' + pad(tzo % 60);
    }
    
    var dte = new Date();
    var dt = new Date(dte);
    dt.setDate(dte.getDate()+1);
    // console.log(dt.toIsoString());
    var nowdate = dt.toIsoString().slice(0,10);
    // console.log(date);
    // console.log(nowdate);
    document.getElementById('movie-time').min=nowdate;
    document.getElementById('movie-time').value=nowdate;
    // console.log(document.getElementById('movie-time').value);
    currentid = document.querySelector('.selectedmovie').dataset.movieid;

    getMovies(`https://api.themoviedb.org/3/movie/${currentid}?&api_key=820aac8b72e06febfb590dfaa08636ca`);

    async function getMovies(url) {
        const resp = await fetch(url);
        const respData = await resp.json();
        // console.log(respData);
        editPage(respData);
    }
    
});

function editPage(movie){
    if(movie.id){
    document.querySelector('img').src = IMGPATH+movie.poster_path;
    document.querySelector('.selectedmovie').innerHTML = movie.overview;
    document.querySelector('#moviename').innerHTML = movie.title;
    document.querySelector('#mtagline').innerHTML = movie.tagline;
    document.querySelector('#bookingmovie').value = movie.title;
    
    var movietime = document.querySelector('#movie-time').value;
    var timeslot = document.querySelector('#timeslot').value;

    document.querySelector('#bookmoviedetails').innerHTML = `Your Booking Details are:<br>
    Movie : ${movie.title}<br>
    Selected Date : ${movietime}<br>
    Selected Time : ${timeslot}
    
    `;}
    else if(movie.success == false ){
        console.log(`(${movie.status_code}) ${movie.status_message}`);
        document.querySelector('#bookpagemovie').innerHTML=`<h1>The Requested Page Cannot be found!!</h1>`;
    }
}