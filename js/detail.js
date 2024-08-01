// 본인의 API 키를 넣어주셔야 합니다.
const API_KEY = "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

fetch(URL)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        // 이후 데이터 처리
    })
    .catch((error) => console.error("Error:", error));
