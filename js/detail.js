// 주소에서 영화id 가져오기
const hrefName = encodeURI(window.location.href);
const parameters = hrefName.slice(hrefName.indexOf("?") + 1, hrefName.length);
const movieId = Number(parameters.split("=")[1]);

//API 가져오기
const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZGI0NDkyODNjN2I0MzZlYTExYjg1Zjg1YTRjNTEwNiIsIm5iZiI6MTcyMjYxNDE2MC4wMjk0NDIsInN1YiI6IjY2YTMxOTQ3ZGVmMjYyMGNlM2UxMTM0YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kKSBpyjCkiPzv-ksjiTVC7KIG5U6OPMK1e1uaSVgt04",
    },
};

//장르
const genres = [{ 28: "Action" }, { 12: "Adventure" }, { 16: "Animation" }, { 35: "Comedy" }, { 80: "Crime" }, { 99: "Documentary" }, { 18: "Drama" }, { 10751: "Family" }, { 14: "Fantasy" }, { 36: "History" }, { 27: "Horror" }, { 10402: "Music" }, { 9648: "Mystery" }, { 10749: "Romance" }, { 878: "Science Fiction" }, { 10770: "TV Movie" }, { 53: "Thriller" }, { 10752: "War" }, { 37: "Western" }];

async function pageLoad() {
    try {
        const URL = (num) => `https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=${num}`;

        const URLs = [URL(1), URL(2), URL(3), URL(4), URL(5), URL(6), URL(7), URL(8), URL(9), URL(10)];

        async function fetchData(url) {
            return fetch(url).then((response) => response.json());
        }
        async function fetchAllMovies(urls) {
            try {
                const promises = urls.map((url) => fetchData(url));
                const results = await Promise.all(promises);
                return results;
            } catch (error) {
                console.log(error);
            }
        }

        const mergeMovies = fetchAllMovies(URLs);

        //주소값과 같은 id찾아내기
        const findMovie = mergeMovies.find((mergeMovie) => {
            return movieId === mergeMovie.id;
        });

        //장르id에 맞는 장르 배열로 가져오기
        const genreId = findMovie.genre_ids;
        let genreArr = [];
        for (let i = 0; i < genres.length; i++) {
            let foundId = genreId.find((key) => key in genres[i]);
            if (foundId === undefined) {
                continue;
            } else {
                genreArr.push(Object.values(genres[i]));
            }
        }
        //장르 배열 문자열화
        const toString = function (inputArr) {
            switch (inputArr.length) {
                case 1:
                    return String(inputArr[0]);
                default:
                    let genre = inputArr[0];
                    let i = 1;
                    while (i < inputArr.length) {
                        genre += `, ${inputArr[i]}`;
                        i++;
                    }
                    return genre;
            }
        };
        const genre = toString(genreArr);

        const movieImgPosition = document.querySelector("#movie-img");
        movieImgPosition.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${findMovie.poster_path})`;

        const movieText = document.querySelector("#main-text");
        movieText.innerHTML = `
        <h2 id="movie-name">${findMovie.title}</h2>
        <div id="genre-box">
            <div class="genre-box-left">
                <span id="genre">${genre}</span>
            </div>
            <div class="genre-box-right">
                <div class="movie-rating">
                    <span class="material-symbols-rounded"> kid_star </span>
                    ${findMovie.vote_average}
                </div>
                <span>${findMovie.release_date}</span>
            </div>
        </div>
        <div id="summary">${findMovie.overview}</div>`;
    } catch (error) {
        console.log(error);
    }
}
pageLoad();
