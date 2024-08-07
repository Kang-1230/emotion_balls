//쿼리스트링을 이용하여 영화id 가져오기
const hrefName = encodeURI(window.location.href);
const parameters = hrefName.slice(hrefName.indexOf("?") + 1, hrefName.length);
const movieId = Number(parameters.split("=")[1]);

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZGI0NDkyODNjN2I0MzZlYTExYjg1Zjg1YTRjNTEwNiIsIm5iZiI6MTcyMjYxNDE2MC4wMjk0NDIsInN1YiI6IjY2YTMxOTQ3ZGVmMjYyMGNlM2UxMTM0YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kKSBpyjCkiPzv-ksjiTVC7KIG5U6OPMK1e1uaSVgt04",
    },
};

//장르
const genres = [{ 28: "액션" }, { 12: "모험" }, { 16: "애니메이션" }, { 35: "코미디" }, { 80: "범죄" }, { 99: "다큐멘터리" }, { 18: "드라마" }, { 10751: "가족" }, { 14: "판타지" }, { 36: "역사" }, { 27: "호러" }, { 10402: "음악" }, { 9648: "미스테리" }, { 10749: "로맨스" }, { 878: "SF" }, { 10770: "TV 영화" }, { 53: "스릴러" }, { 10752: "전쟁" }, { 37: "서부극" }];

async function pageLoad() {
    //fetch 페이지 10개 만들어서 영화 개수 늘리기
    //Promise.all 함수를 사용해서 fetch로 가져온 promise 객체를 한번에 처리, flat으로 하나의 배열로 만들기
    try {
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

        //주소값과 같은 id찾아내기
        const findMovie = mergeMovies.find((mergeMovie) => {
            return movieId === mergeMovie.id;
        });

        //장르id에 맞는 장르 배열로 가져오기
        const genreId = findMovie.genre_ids;
        let genreArr = [];
        for (let i = 0; i < genres.length; i++) {
            let foundId = genreId.find((key) => key in genres[i]);
            foundId !== undefined ? genreArr.push(Object.values(genres[i])) : null;
        }

        //장르 배열을 문자열화
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

        //상세페이지 구성하기
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
