//API 이용하여 데이터 추가
const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YzhhOWIxZWIzMjI2Nzg5ZDIxMTg0MjIzMDJlZjMxMCIsIm5iZiI6MTcyMjgyMjUxNS43OTU3MTgsInN1YiI6IjY2YTIyNzBlZmQwMTEzNTljNTZlODYwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fj-y0rpCMgfuKXVOEhrznAfL7prb5qJu8xo6mw_1e14",
    },
};

fetch("https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1", options)
    .then((response) => response.json())
    .then((response) => {
        //영화 최신순으로 정렬
        response.results.sort(function (a, b) {
            return new Date(b.release_date) - new Date(a.release_date);
        });

        //영화 카드 추가
        const innerCard = document.querySelector(`.container-latest`);
        response.results.forEach((movie) => {
            const cardImg = document.createElement("li");
            cardImg.className = "movie-card";
            cardImg.innerHTML = `
            <a href="/pages/detail.html?movieId=${movie.id}" class="movie-card-inner">
                <div class="movie-card-img" style="background-image:url(https://image.tmdb.org/t/p/w500${movie.poster_path})"></div>
                <div class="movie-card-con">
                    <div class="movie-card-tit">${movie.title}</div>
                    <div class="movie-card-info">
                        <div class="movie-card-rating">
                            <span class="material-symbols-rounded"> kid_star </span>
                            ${movie.vote_average}
                        </div>
                        <span class="movie-card-date">${movie.release_date}</span>
                    </div>
                    <div class="movie-card-txt">${movie.overview}</div>
                </div>
            </a>`;
            innerCard.appendChild(cardImg);
        });
    })

    .catch((err) => console.error(err));
