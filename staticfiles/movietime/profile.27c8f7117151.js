var id = "";
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.editbutton').forEach(button => {
        button.onclick = () => {
            id = button.dataset.bookingid;
            getpost(id);
        };
    })
    document.querySelector('.cancelbutton').onclick = ()=>{
        console.log('Cancel Button Clicked')
        del(id);
    };
});

function getpost(id){
    fetch( `/mybookings/${id}`)
    .then((response) => response.json())
    .then((movie)=>{
        // console.log(movie);
        document.querySelector('#bookmoviedetails').innerHTML = `
        <img src="">
        <b>Movie</b> : <a href="movies/${movie.movieid}">${movie.moviename}</a><br>
        <b>Selected Date</b> : ${movie.SelectedDate}<br>
        <b>Selected Time</b> : ${movie.SelectedTime}
    `;  
    // if(movie.cancelled){
    //     document.querySelector('.cancelbutton').disabled= true;
    // }
    // else{
    //     document.querySelector('.cancelbutton').disabled= false;
    // }
    var dateInPast = false;
    var today = new Date().toISOString().slice(0,10);
    var moviedate = movie.SelectedDate; 
    // console.log(today);
    // console.log(moviedate);
    // console.log(dateInPast);
    // console.log(moviedate<today);
    if(moviedate<=today){
        var now = new Date().toString().slice(16,25)
        if(now>movie.SelectedTime){
            dateInPast = true;
            console.log(now);
            console.log(movie.SelectedTime);
            console.log(now>movie.SelectedTime);

        }
    }
    if(movie.cancelled || dateInPast){
        document.querySelector('#moviecancel').style.display= 'None';
        console.log(dateInPast);
    }
    else{
        document.querySelector('#moviecancel').style.display = 'Block';
    }
    });

}

function del(id){
    fetch( `/mybookings/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            delete: 'True',
        })
    })
    .then((response) => response.json())
    .then((movie)=>{
        console.log(movie);
        location.reload();
    });

}