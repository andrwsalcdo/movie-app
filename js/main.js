/* When document loads this function attaches a
 * click event handler when the form is submitted.
 * Grabs the searchText value. runs getAllMovies();
 * and prevent the submitting of a form to a file.
 */
$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getAllMovies(searchText);
        e.preventDefault();
    });
});

/*
 * Uses the value of searchText to retrieve movies from
 * the OMDB API usng Axios.
 * param: {string} SearchText - input text in #searchForm.
 */
function getAllMovies(searchText) {
      axios.get('http://www.omdbapi.com/?s=' + searchText)
        .then((response) => {
            console.log(response);
            let movies = response.data.Search; //array of movie data
            let output = '';
            $.each(movies, (index, movie) => {
                output += `
                    <div class="col-md-3">
                      <div class="well text-center">
                        <img src="${movie.Poster}">
                        <h5>${movie.Title}</h5>
                        <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Info</a>
                      </div>
                    </div>
                `;
            });

            $('#movies').html(output);
        })
        .catch((error) => {
            console.log("There is an error");
        });
}
/*
 * When movie is clicked on, the movie takes in the imdbID and passes
 * the API data to movie.html via local session storage.
*/
function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false; 
}



function getMovie() {

}
