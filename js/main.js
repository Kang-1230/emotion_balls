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

    console.log("mergeMovies => ", mergeMovies); // 확인완료!

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

    // 1) romance, musical 장르의 id를 가져옴
    // 로직1 : genres에 있는 배열 중, romance, musical이 포함된 id를 추출
    const genresSearch = function (selectGenres) {
        const romanceGenres = genres.filter(function (genre) {
            return genre.name === selectGenres;
        });
        return romanceGenres;
    };

    console.log(genresSearch("Romance"));

    // 2) 1)에서 찾은 장르 id와 일치하는 영화 목록(영화의 genre_ids가 1)에서 뽑은 id를 포함하는지)을 mergeMovies에서 필터링
    const genreArr = function (genre) {
        const genreList = mergeMovies.filter(function (movie) {
            return movie.genre_ids.includes(genre[0].Id);
        });
        return genreList;
    };

    console.log("genreArr => ", genreArr(genresSearch("Romance")));

    const cardMaker = await function (genre, classselect) {
        const innerCard = document.querySelector(`.movielist-section-${classselect}`);
        genre.forEach((movie) => {
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
    };

    cardMaker(genreArr(genresSearch("Comedy")), "sad");
    cardMaker(genreArr(genresSearch("War")), "angry");
    cardMaker(genreArr(genresSearch("Documentary")), "anxiety");
    cardMaker(genreArr(genresSearch("Romance")), "happy");
    cardMaker(genreArr(genresSearch("Animation")), "cold");

    
}

fetchData()
    .then(() => {
        const sectionMoveBtn = document.querySelectorAll(".moveBtn");
        const scrollTopBtn = document.getElementById("scroll-btn");

        const targetSection = document.querySelectorAll(".movie-card");
        console.log(targetSection)
        const happyTop = targetSection[3].offsetTop;
        const sadTop = targetSection[7].offsetTop;
        const angryTop = targetSection[5].offsetTop;
        const anxietyTop = targetSection[13].offsetTop;
        const coldTop = targetSection[2].offsetTop;
        const pageTop = document.getElementById("wrap").offsetTop;

        const happyScroll = () => window.scroll({ top: happyTop, behavior: "smooth" });
        const sadScroll = () => window.scroll({ top: sadTop, behavior: "smooth" });
        const angryScroll = () => window.scroll({ top: angryTop, behavior: "smooth" });
        const anxietyScroll = () => window.scroll({ top: anxietyTop, behavior: "smooth" });
        const coldScroll = () => window.scroll({ top: coldTop, behavior: "smooth" });
        const scrollTop = () => window.scroll({ top: pageTop, behavior: "smooth" });

        sectionMoveBtn[0].addEventListener("click",  happyScroll);
        sectionMoveBtn[1].addEventListener("click",  sadScroll);
        sectionMoveBtn[2].addEventListener("click",  angryScroll);
        sectionMoveBtn[3].addEventListener("click",  anxietyScroll);
        sectionMoveBtn[4].addEventListener("click",  coldScroll);
        scrollTopBtn.addEventListener("click", scrollTop);
    })
    .catch((error) => console.error("Error:", error));
