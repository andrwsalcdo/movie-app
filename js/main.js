/*
 * When document loads this function attaches a
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
 * @param: {string} SearchText - input text in #searchForm.
 */
function getAllMovies(searchText) {
      axios.get('https://www.omdbapi.com/?s=' + searchText)
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
 * @param: {string} id - the imdbID of the movie.
 */
function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

/*
 * Function retrives movie data via axios & OMDB api.
 * displays data from the id associated with movieSelected()
 * displays movie info on movie.html
 */
function getMovie() {
    let movieId = sessionStorage.getItem('movieId');

    axios.get('https://www.omdbapi.com/?i=' + movieId)
      .then((response) => {
          console.log(response);
          let movie = response.data;

          let output = `
                <div class="row">
                  <div class="col-md-4">
                      <img src="${movie.Poster}" class="thumbnail">
                  </div>
                  <div class="col-md-8">
                      <h2>${movie.Title}</h2>
                      <ul class="list-group">
                          <li class="list-group-item"> <strong>Genre:</strong> ${movie.Genre}</li>
                          <li class="list-group-item"> <strong>Released:</strong> ${movie.Released}</li>
                          <li class="list-group-item"> <strong>Rated:</strong> ${movie.Rated}</li>
                          <li class="list-group-item"> <strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                          <li class="list-group-item"> <strong>Actors:</strong> ${movie.Actors}</li>
                          <li class="list-group-item"> <strong>Director:</strong> ${movie.Director}</li>
                          <li class="list-group-item"> <strong>Runtime:</strong> ${movie.Runtime}</li>
                      </ul>
                  </div>
                </div>
                <div class="row">
                  <div class="well">
                    <h3>Plot</h3>
                    ${movie.Plot}
                    <hr>
                    <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
                    <a href="index.html" class="btn btn-info">Go back to Search</a>
                  </div>
                </div>
          `;

          $('#movie').html(output);
      })
      .catch((error) => {
          console.log("No imdb info");
      });
}
