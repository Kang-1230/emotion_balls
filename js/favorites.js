//북마크 내역 가져오기
const bmkList = JSON.parse(window.localStorage.getItem("bmk"));

const movieList = document.querySelector("#favorites");

const pageLoad = () => {
    if (bmkList === null) {
        const emptyContainer = document.querySelector("#favorites-container");
        const emptyAlert = document.createElement('h1')
        emptyAlert.id = "empty-alert";
        emptyAlert.innerHTML = "북마크한 영화가 없습니다";
        emptyContainer.appendChild(emptyAlert)
    } else {
        try {
            bmkList.forEach((data) => {
                const movie = document.createElement("li");
                movie.className = "movie-card";
                movie.innerHTML = `
                <a href="/pages/detail.html?movieId=${movie.id}" class="movie-card-inner">
                <img src="https://image.tmdb.org/t/p/w500${data.image}" alt="${data.title}">
                <div class="movie-info">
                    <h3>${data.title}</h3>
                    ${data.voteAverage}<br></br>${data.overview}
                </div>
        </a>`;
                movieList.appendChild(movie);
            });
        } catch (error) {
            console.log(error);
            alert("북마크한 목록을 불러오지 못했습니다.");
        }
    }
};
pageLoad();