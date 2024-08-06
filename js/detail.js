// 주소에서 영화id 가져오기
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

//장르
const genres = [{ 28: "Action" }, { 12: "Adventure" }, { 16: "Animation" }, { 35: "Comedy" }, { 80: "Crime" }, { 99: "Documentary" }, { 18: "Drama" }, { 10751: "Family" }, { 14: "Fantasy" }, { 36: "History" }, { 27: "Horror" }, { 10402: "Music" }, { 9648: "Mystery" }, { 10749: "Romance" }, { 878: "Science Fiction" }, { 10770: "TV Movie" }, { 53: "Thriller" }, { 10752: "War" }, { 37: "Western" }];

async function pageLoad() {
    try {
        const response1 = await fetch("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1", options);
        const data1 = await response1.json();

        const response2 = await fetch("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=2", options);
        const data2 = await response2.json();

        const response3 = await fetch("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=3", options);
        const data3 = await response3.json();

        const response4 = await fetch("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=4", options);
        const data4 = await response4.json();

        const response5 = await fetch("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=5", options);
        const data5 = await response5.json();

        const response6 = await fetch("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=6", options);
        const data6 = await response6.json();

        const response7 = await fetch("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=7", options);
        const data7 = await response7.json();

        const response8 = await fetch("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=8", options);
        const data8 = await response8.json();

        const response9 = await fetch("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=9", options);
        const data9 = await response9.json();

        const response10 = await fetch("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=10", options);
        const data10 = await response10.json();

        const movies1 = data1.results;
        const movies2 = data2.results;
        const movies3 = data3.results;
        const movies4 = data4.results;
        const movies5 = data5.results;
        const movies6 = data6.results;
        const movies7 = data7.results;
        const movies8 = data8.results;
        const movies9 = data9.results;
        const movies10 = data10.results;

        const mergeMovies = [...movies1, ...movies2, ...movies3, ...movies4, ...movies5, ...movies6, ...movies7, ...movies8, ...movies9, ...movies10];

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
        // alert("잘 되다가 왜 그러냐 ㅠㅠ");
    }
}
pageLoad();