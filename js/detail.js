// 주소값 가져오기
const hrefName = encodeURI(window.location.href);
const parameters = hrefName.slice(hrefName.indexOf("?") + 1, hrefName.length);
const movieId = Number(parameters.split("=")[1]);
if (movieId == undefined) movieId = 0;

//API 가져오기
const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZGI0NDkyODNjN2I0MzZlYTExYjg1Zjg1YTRjNTEwNiIsIm5iZiI6MTcyMjYxNDE2MC4wMjk0NDIsInN1YiI6IjY2YTMxOTQ3ZGVmMjYyMGNlM2UxMTM0YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kKSBpyjCkiPzv-ksjiTVC7KIG5U6OPMK1e1uaSVgt04",
    },
};

const API_KEY = "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&append_to_response=images&include_image_language=en,null";

//장르
const genres = [{ 28: "Action" }, { 12: "Adventure" }, { 16: "Animation" }, { 35: "Comedy" }, { 80: "Crime" }, { 99: "Documentary" }, { 18: "Drama" }, { 10751: "Family" }, { 14: "Fantasy" }, { 36: "History" }, { 27: "Horror" }, { 10402: "Music" }, { 9648: "Mystery" }, { 10749: "Romance" }, { 878: "Science Fiction" }, { 10770: "TV Movie" }, { 53: "Thriller" }, { 10752: "War" }, { 37: "Western" }];

async function pageLoad() {
    try {
        const response = await fetch(API_KEY, options);
        const data = await response.json();
        const movies = data.results;
        //주소값과 같은 id찾아내기
        const findMovie = movies.find((movie) => {
            return movieId === movie.id;
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

        const movieImg = document.querySelector("#movie-img");
        movieImg.setAttribute("src", `https://image.tmdb.org/t/p/w500${findMovie.poster_path}`);

        const movieText = document.querySelector("#main-text");
        movieText.innerHTML = `<span id="movie-name">
                            <h1>${findMovie.title}</h1>
                        </span>
                        <span id="genre-box">
                            <span id="genre"><small>${genre}</small></span>
                            <span><small>${findMovie.release_date}</small></span>
                        </span>
                        <span id="summary">${findMovie.overview}</span>`;
    } catch (error) {
        console.log(error);
        alert("잘 되다가 왜 그러냐 ㅠㅠ");
    }
}
pageLoad();