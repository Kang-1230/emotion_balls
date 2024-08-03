import { createReview } from "./review.js";

// 본인의 API 키를 넣어주셔야 합니다.
const API_KEY = "5c8a9b1eb3226789d2118422302ef310";
const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

fetch(URL)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        const movies = data.results;
        //forEach로 배열을 돌면서 title 찍어내기
        movies.forEach((movie) => {
            const innerCard = document.getElementById("movie-card-happy");
            const cardImg = document.createElement("img");
            cardImg.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>${movie.overview}</p>
            <span>Rating: ${movie.vote_average}</span>
            `;
            innerCard.appendChild(cardImg);
        });
        //movie-card-happy id를 지정하는 함수 생성
        //innerCard에 이미지 생성하기
        //이미지 url을 넣기
        //cardImg를 innerCard의 자식 요소로 넣기
    })
    .catch((error) => console.error("Error:", error));
