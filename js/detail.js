const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZGI0NDkyODNjN2I0MzZlYTExYjg1Zjg1YTRjNTEwNiIsIm5iZiI6MTcyMjYxNDE2MC4wMjk0NDIsInN1YiI6IjY2YTMxOTQ3ZGVmMjYyMGNlM2UxMTM0YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kKSBpyjCkiPzv-ksjiTVC7KIG5U6OPMK1e1uaSVgt04",
    },
};

const API_KEY = "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&append_to_response=images&include_image_language=en,null";

async function testPrint() {
    try {
        const response = await fetch(API_KEY, options);
        const data = await response.json();
        const movies = data.results;
        console.log(movies);
    } catch (error) {
        console.log(error);
        alert("TMDB 일 똑바로 안하냐?");
    }
}

testPrint();
// const movieDetail = createElement("div").innerText = `
const movieDetail = createElement("div");
movieDetail.innerText = `
<img id="movie-img" src="${이미지}"
                    alt="${영화제목}" />
                <span id="main-text">
                    <span id="movie-name">
                        <h3>${영화제목}</h3>
                    </span>
                    <span id="genre">
                        <span><small>${장르}</small></span>
                        <span><small>${개봉일자}</small></span>
                    </span>
                    <span id="summary">${내용}</span>
                    `;

document.querySelector("#detail-container").appendChild(movieDetail);
