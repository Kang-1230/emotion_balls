import { createReview } from "./review.js";

// 본인의 API 키를 넣어주셔야 합니다.
// const API_KEY = "5c8a9b1eb3226789d2118422302ef310";
// const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YzhhOWIxZWIzMjI2Nzg5ZDIxMTg0MjIzMDJlZjMxMCIsIm5iZiI6MTcyMjgyMjUxNS43OTU3MTgsInN1YiI6IjY2YTIyNzBlZmQwMTEzNTljNTZlODYwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fj-y0rpCMgfuKXVOEhrznAfL7prb5qJu8xo6mw_1e14",
    },
};

const URL = "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";

/** 삭제하세요 */

// async function fetchData() {
//     // Promise.all([]);

//     // 1번처리
//     const response1 = await fetch("https://api.themoviedb.org/3/account/21403078/favorite/movies?language=en-US&page=1&sort_by=created_at.asc");
//     const data1 = await response.json();

//     // 2번처리
//     const response2 = await fetch("https://api.themoviedb.org/3/account/21403078/favorite/movies?language=en-US&page=2&sort_by=created_at.asc");
//     const data2 = await response.json();

//     // ... 추가로 10개까지 처리하고

//     const movies1 = data1.results;
//     const movies2 = data2.results;
//     // ... 총 10번

//     const 합쳐진movies = [...movies1, ...movies2];
//     합쳐진movies.forEach(~~~~);
// }

// fetchData();

/** 삭제하세요 */

fetch(URL, options)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        const movies = data.results;

        //카드 생성하기
        movies.forEach((movie) => {
            const innerCard = document.querySelectorAll(".movielist-section-happy, .movielist-section-sad, .movielist-section-angry, .movielist-section-anxiety, .movielist-section-cold");
            for (let i = 0; i < innerCard.length; i++) {
                const cardImg = document.createElement("li");
                cardImg.className = "movie-card";
                cardImg.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}"><div class = movie-info>
            <h3>${movie.title}</h3>
            ${movie.vote_average}<br></br>${movie.overview}</div>`;

                innerCard[i].appendChild(cardImg);
            }

            //장르 가져오기
            const genres = [{ 28: "Action" }, { 12: "Adventure" }, { 16: "Animation" }, { 35: "Comedy" }, { 80: "Crime" }, { 99: "Documentary" }, { 18: "Drama" }, { 10751: "Family" }, { 14: "Fantasy" }, { 36: "History" }, { 27: "Horror" }, { 10402: "Music" }, { 9648: "Mystery" }, { 10749: "Romance" }, { 878: "Science Fiction" }, { 10770: "TV Movie" }, { 53: "Thriller" }, { 10752: "War" }, { 37: "Western" }];

            const genreId = movie.genre_ids;

            //장르id에 맞는 장르 배열로 가져오기
            let genreArr = [];
            for (let i = 0; i < genres.length; i++) {
                let foundId = genreId.find((key) => key in genres[i]);
                if (foundId === undefined) {
                    continue;
                } else {
                    genreArr.push(Object.values(genres[i]));
                }
            }
            //배열 문자열화
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

            //문자열화된 장르 romance, musical 장르 가진 영화들 뽑아내기
            const happyGenre = genre.includes("Romance");

            console.log(happyGenre);

            //inputGenre 함수 선언
            //감정 happy 섹션에 장르 romance, musical인 것 넣기
        });
    })
    .catch((error) => console.error("Error:", error));
