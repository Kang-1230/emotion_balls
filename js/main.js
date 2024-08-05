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

// const URL = "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";

async function fetchData() {
    const response1 = await fetch("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1", options);
    const data1 = await response1.json();

    console.log(data1);

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

    mergeMovies.forEach((movie) => {
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
        const happyGenre = genre.includes("Romance", "Musical")
        const filterhappyGenre = if(happyGenre === true){
            return 
        }
            
        };

        console.log(happyGenre);

        


        //happyGenre 함수 선언 :장르 romance, musical 뽑아내기
        //true 값을 가지는 genre들 리스트 만들기
        //리스트 영화 카드에 집어넣기
    });
}

fetchData().catch((error) => console.error("Error:", error));
