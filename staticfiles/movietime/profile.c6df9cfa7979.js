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
    var today = new Date().toLocaleDateString();
    var mdate = movie.SelectedDate; 
    var moviedate = new Date(mdate).toLocaleDateString()
    // console.log(today);
    // console.log(new Date(moviedate).toLocaleDateString());
    // console.log(dateInPast);
    // console.log(moviedate<today);
    if(moviedate == today){
        var now = new Date().toString().slice(16,25)
        // console.log(now);
        // console.log(movie.SelectedTime);
        if(now >= movie.SelectedTime){
            dateInPast = true;
            // console.log(now);
            // console.log(movie.SelectedTime);
            // console.log(now>movie.SelectedTime);
        }
    }
    else if(moviedate < today){
        dateInPast = true;
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