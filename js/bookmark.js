// 주소값 가져오기
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

// 북마크 버튼 위치
const activeBtn = document.querySelector(".bmkBtn");
const btnImg = document.querySelector("#bmk-off");

async function pageLoad() {
    try {
        const URL = (num) => `https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=${num}`;
        const URLs = [URL(1), URL(2), URL(3), URL(4), URL(5), URL(6), URL(7), URL(8), URL(9), URL(10)]; // url 하나하나가 맵핑된 배열

        //
        async function fetchData(url) {
            // const rensponse = fetch(url).then((response) => response.json());

            // fetch(url).then(function (res) {
            //     return res.json();
            // });

            // const response = await fetch(url).then(function (res) {
            //     res.json().then(function (최종변환값) {
            //         console.log("TEMP => ", 최종변환값)
            //         return 최종변환값; // 20개를 잘 받아왔음
            //     })
            // });

            const response = await fetch(url);
            const data = await response.json();
            return data;
        }

        async function fetchAllMovies(urls) {
            try {
                const response1 = await fetchData(urls[0]);
                const response2 = await fetchData(urls[1]);
                const response3 = await fetchData(urls[2]);

                // console.log(response1)
                // console.log(response2)
                // console.log(response3)
                
                return [...response1.results, ...response2.results, ...response3.results];

                // const promises = urls.map((url) => fetchData(url).result);

                // const promises = urls.map(function (url) {
                //     return fetchData(url).result;
                // });
                // const results = await Promise.all(promises);
                // return results;
            } catch (error) {
                console.log(error);
            }
        }

        // 함수의 호출 1
        const mergeMovies = await fetchAllMovies(URLs);
        console.log(mergeMovies);

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

        //현재 영화 정보 객체화
        const currentMovieInfo = {
            id: `${findMovie.id}`,
            image: `${findMovie.poster_path}`,
            title: `${findMovie.title}`,
            genre: `${genre}`,
            releaseDate: `${findMovie.release_date}`,
            overview: `${findMovie.overview}`,
            voteAverage: `${findMovie.vote_average}`,
        };

        //현재 북마크 정보 동기화
        let currentBmkList;
        const syncList = () => {
            let savedList = JSON.parse(window.localStorage.getItem("bmk"));
            if (savedList === null) {
                return (currentBmkList = []);
            } else {
                return (currentBmkList = savedList);
            }
        };
        syncList();

        //북마크 여부 확인
        const whetherBmk = () => {
            if (currentBmkList === null) {
                return false;
            } else {
                return currentBmkList.some((alreadyBmk) => alreadyBmk.id === currentMovieInfo.id);
            }
        };
        // console.log(currentBmkList[0].id);

        //이미 활성화되어있는 북마크 표시하기
        const bmkCheck = () => {
            if (whetherBmk() === true) {
                btnImg.setAttribute("id", "bmk-on");
            }
        };
        bmkCheck();

        //북마크리스트 업데이트
        const bmkUpdate = (newBmkList) => {
            const strNewList = JSON.stringify(newBmkList);
            window.localStorage.removeItem("bmk");
            window.localStorage.setItem("bmk", strNewList);
        };

        //현재 영화 북마크에 저장
        const saveBmk = () => {
            try {
                // makeEmptyArr();
                currentBmkList.push(currentMovieInfo);
                bmkUpdate(currentBmkList);
                btnImg.setAttribute("id", "bmk-on");
            } catch {
                alert("북마크가 실패했습니다.");
            }
        };
        // window.localStorage.removeItem("bmk");

        //현재 영화 북마크에서 제거
        const removeBmk = () => {
            try {
                const filterBmk = currentBmkList.filter(
                    (bookmarked) => bookmarked.id !== currentMovieInfo.id
                    // function (bookmarked) {
                    // return bookmarked.id !== currentMovieInfo.id;
                    // }
                );
                const emptyCheck = () => (filterBmk.length === 0 ? window.localStorage.removeItem("bmk") : bmkUpdate(filterBmk));
                emptyCheck(filterBmk);
                btnImg.setAttribute("id", "bmk-off");
            } catch {
                alert("북마크 제거가 실패했습니다.");
            }
        };
        //북마크 토글
        const bmkToggle = () => {
            if (whetherBmk() === true) {
                removeBmk();
            } else {
                saveBmk();
            }
            syncList();
        };
        // (whetherBmk()===true ? removeBmk() : saveBmk());
        activeBtn.addEventListener("click", bmkToggle);
    } catch (error) {
        console.log(error);
    }
}
pageLoad();
