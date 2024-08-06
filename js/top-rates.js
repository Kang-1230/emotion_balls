const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YzhhOWIxZWIzMjI2Nzg5ZDIxMTg0MjIzMDJlZjMxMCIsIm5iZiI6MTcyMjgyMjUxNS43OTU3MTgsInN1YiI6IjY2YTIyNzBlZmQwMTEzNTljNTZlODYwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fj-y0rpCMgfuKXVOEhrznAfL7prb5qJu8xo6mw_1e14",
    },
};

fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", options)
    .then((response) => response.json())
    .then((response) => {
        console.log(response);

        response.results.sort(function (a, b) {
            return b.vote_average - a.vote_average;
        });
        console.log(response);

        const innerCard = document.querySelector(`.container-top`);
        response.results.forEach((movie) => {
            const cardImg = document.createElement("li");
            cardImg.className = "movie-card";
            cardImg.innerHTML = `
        <a href="/pages/detail.html?movieId=${movie.id}" class="movie-card-inner">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                ${movie.vote_average}<br></br>${movie.overview}
            </div>
        </a>`;
            innerCard.appendChild(cardImg);
        });
    });

// .catch((err) => console.error(err));
