// 주소값 가져오기
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
const genres = [{ 28: "Action" }, { 12: "Adventure" }, { 16: "Animation" }, { 35: "Comedy" }, { 80: "Crime" }, { 99: "Documentary" }, { 18: "Drama" }, { 10751: "Family" }, { 14: "Fantasy" }, { 36: "History" }, { 27: "Horror" }, { 10402: "Music" }, { 9648: "Mystery" }, { 10749: "Romance" }, { 878: "Science Fiction" }, { 10770: "TV Movie" }, { 53: "Thriller" }, { 10752: "War" }, { 37: "Western" }];

// 북마크 버튼 지정
const activeBtn = document.querySelector(".bmk-btn");
const btnImg = document.querySelector("#bmk-off");

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
            if (foundId !== undefined) {
                genreArr.push(Object.values(genres[i]));
            }
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

        //현재 영화 정보 객체화
        class movieInfo {
            constructor(movie) {
                this.id = `${movie.id}`;
                this.image = `${movie.poster_path}`;
                this.title = `${movie.title}`;
                this.genre = genre;
                this.releaseDate = `${movie.release_date}`;
                this.overview = `${movie.overview}`;
                this.voteAverage = `${movie.vote_average}`;
            }
        }
        const currentMovieInfo = new movieInfo(findMovie);

        //현재 북마크 정보 동기화
        let currentBmkList;
        const syncList = () => {
            let savedList = JSON.parse(window.localStorage.getItem("bookmark"));
            return savedList === null ? (currentBmkList = []) : (currentBmkList = savedList);
        };
        syncList();

        //북마크 여부 확인
        const whetherBmk = () => {
            return currentBmkList === null ? false : currentBmkList.some((alreadyBmk) => alreadyBmk.id === currentMovieInfo.id);
        };

        //현재 영화가 이미 북마크에 있는 지 표시
        const bmkCheck = () => {
            whetherBmk() === true ? btnImg.setAttribute("id", "bmk-on") : null;
        };
        bmkCheck();

        //북마크리스트 업데이트
        const bmkUpdate = (newBmkList) => {
            const strNewList = JSON.stringify(newBmkList);
            window.localStorage.removeItem("bookmark");
            window.localStorage.setItem("bookmark", strNewList);
        };

        //현재 영화 북마크에 저장
        const saveBmk = () => {
            try {
                currentBmkList.push(currentMovieInfo);
                bmkUpdate(currentBmkList);
                btnImg.setAttribute("id", "bmk-on");
            } catch {
                alert("북마크가 실패했습니다.");
            }
        };

        //현재 영화 북마크에서 제거
        const removeBmk = () => {
            try {
                const filterBmk = currentBmkList.filter((bookmarked) => bookmarked.id !== currentMovieInfo.id);
                const emptyCheck = () => (filterBmk.length === 0 ? window.localStorage.removeItem("bookmark") : bmkUpdate(filterBmk));
                emptyCheck(filterBmk);
                btnImg.setAttribute("id", "bmk-off");
            } catch {
                alert("북마크 제거가 실패했습니다.");
            }
        };
        //북마크 버튼 토글
        const bmkToggle = () => {
            whetherBmk() === true ? removeBmk() : saveBmk();
            syncList();
        };
        activeBtn.addEventListener("click", bmkToggle);
    } catch (error) {
        console.log(error);
    }
}
pageLoad();
