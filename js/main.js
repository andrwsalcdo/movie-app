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
 * the OMDB API.
 * param: {string} SearchText - input text in #searchForm.
 */
function getAllMovies(searchText) {
      console.log(searchText);
}
