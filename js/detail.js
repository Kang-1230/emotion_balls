fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1")
    .then((response) => response.json())
    .then(data => {
        console.log(data)
    })
  .then((data) => {
    const movies = data.results;
    const movieContainer = document.getElementById("movie-container");
    movies.forEach((movie) => {
      const card = createMovieCard(movie);
      movieContainer.appendChild(card);
    });
  })
  .catch((error) => console.error("Error:", error));
