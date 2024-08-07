//API로 데이터 가져오기
const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNGU1ODM2ZDQ0ZTllMjc2YTAzYjhiOWRhYzAyMTYxZSIsIm5iZiI6MTcyMjc1NTA1My44NDAzODgsInN1YiI6IjY2YTIzN2I5NTU3ZDEyMmU4NTE4ZWI5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JRWjgRNrkGahvLMsOkNF2zPFOxwRB5oVfyFipUPToi0",
    },
};

//fetch 페이지 10개 만들어서 영화 개수 늘리기
//Promise.all 함수를 사용해서 fetch로 가져온 promise 객체를 한번에 처리, flat으로 하나의 배열로 만들기
async function fetchData() {
    const fetchMovies = async (page) => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=${page}`, options);
        const data = await response.json();
        return data.results;
    };
    const moviePromises = Array.from({ length: 10 }, (_, i) => {
        return fetchMovies(i + 1);
    });
    const results = await Promise.all(moviePromises);
    const mergeMovies = results.flat();

    const genres = [
        { Id: 28, name: "Action" },
        { Id: 12, name: "Adventure" },
        { Id: 16, name: "Animation" },
        { Id: 35, name: "Comedy" },
        { Id: 80, name: "Crime" },
        { Id: 99, name: "Documentary" },
        { Id: 18, name: "Drama" },
        { Id: 10751, name: "Family" },
        { Id: 14, name: "Fantasy" },
        { Id: 36, name: "History" },
        { Id: 27, name: "Horror" },
        { Id: 10402, name: "Music" },
        { Id: 9648, name: "Mystery" },
        { Id: 10749, name: "Romance" },
        { Id: 878, name: "Science Fiction" },
        { Id: 10770, name: "TV Movie" },
        { Id: 53, name: "Thriller" },
        { Id: 10752, name: "War" },
        { Id: 37, name: "Western" },
    ];

    // genres에 있는 배열 중, romance, musical이 포함된 id를 추출
    const genresSearch = function (selectGenres) {
        const romanceGenres = genres.filter(function (genre) {
            return genre.name === selectGenres;
        });
        return romanceGenres;
    };

    // 위에서 찾은 장르 id와 일치하는 영화 목록(영화의 genre_ids가 1)에서 뽑은 id를 포함하는지)을 mergeMovies에서 필터링
    const genreArr = function (genre) {
        const genreList = mergeMovies.filter(function (movie) {
            return movie.genre_ids.includes(genre[0].Id);
        });
        return genreList;
    };

    //querySelector로 class 지정하여 안에 moviecard 추가, 데이터 추가
    const cardMaker = function (genre, classselect) {
        const innerCard = document.querySelector(`.movielist-section-${classselect}`);
        genre.forEach((movie) => {
            const cardImg = document.createElement("li");
            cardImg.className = "movie-card";
            cardImg.innerHTML = `
            <a href="/emotion_balls/pages/detail.html?movieId=${movie.id}" class="movie-card-inner">
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
    };

    //장르별로 함수 실행
    cardMaker(genreArr(genresSearch("Romance")), "happy");
    cardMaker(genreArr(genresSearch("Comedy")), "sad");
    cardMaker(genreArr(genresSearch("War")), "angry");
    cardMaker(genreArr(genresSearch("Documentary")), "anxiety");
    cardMaker(genreArr(genresSearch("Romance")), "happy");
    cardMaker(genreArr(genresSearch("Animation")), "cold");
}
fetchData().catch((error) => console.log("Error:", error));

window.onload = function () {
    // 섹션 스크롤
    const moveBtn = document.querySelectorAll(".move-btn");
    moveBtn.forEach((element) => {
        element.addEventListener("click", () => {
            let emotion = element.getAttribute("data-emotion");
            let emotionSection = document.querySelectorAll(`#movie-card-section-${emotion}`);
            emotionSection.forEach((element) => {
                // 헤더 높이를 제외하고 이동
                const desktop = window.matchMedia("(min-width: 992px)").matches;
                if (desktop) {
                    window.scroll({ top: element.offsetTop - 100, behavior: "smooth" });
                } else {
                    window.scroll({ top: element.offsetTop - 60, behavior: "smooth" });
                }
            });
        });
    });
};
