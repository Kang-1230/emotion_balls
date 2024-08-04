import { createReview } from "./review.js";

// 본인의 API 키를 넣어주셔야 합니다.
const API_KEY = "5c8a9b1eb3226789d2118422302ef310";
const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

fetch(URL)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        const movies = data.results;
        //for문으로 배열 다섯개 생성
        const movieContainer = document.getElementById("movie-container");

        //forEach로 배열을 돌면서 cardImg list 생성, 이미지 집어넣기
        movies.forEach((movie) => {
            const innerCard = document.querySelector(".movielist-section-happy");
            const cardImg = document.createElement("li");
            cardImg.className = "movie-card";
            cardImg.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}"><div class = movie-info>
            <h3>${movie.title}</h3>
            ${movie.vote_average}<br></br>${movie.overview}</div>`;

            innerCard.appendChild(cardImg);
        });
    })
    .catch((error) => console.error("Error:", error));
