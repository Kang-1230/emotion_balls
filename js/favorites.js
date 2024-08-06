//북마크 내역 가져오기
const bmkList = JSON.parse(window.localStorage.getItem("bmk"));

const movieList = document.querySelector("#favorites");

const pageLoad = () => {
    if (bmkList === null) {
        // const emptyContainer = document.querySelector("#favorites-container");
        // const emptyAlert = document.createElement("h1");
        let emptyAlert = document.createElement("div");
        emptyAlert.className = "no-results";
        emptyAlert.innerHTML = "북마크 한 영화가 없습니다.";
        movieList.before(emptyAlert);
    } else {
        try {
            bmkList.forEach((data) => {
                const movie = document.createElement("li");
                movie.className = "movie-card";
                movie.innerHTML = `
                <a href="/emotion_balls/pages/detail.html?movieId=${data.id}" class="movie-card-inner">
                    <div class="movie-card-img" style="background-image:url(https://image.tmdb.org/t/p/w500${data.image})"></div>
                    <div class="movie-card-con">
                        <div class="movie-card-tit">${data.title}</div>
                        <div class="movie-card-info">
                            <div class="movie-card-rating">
                                <span class="material-symbols-rounded"> kid_star </span>
                                ${data.voteAverage}
                            </div>
                            <span class="movie-card-date">${data.releaseDate}</span>
                        </div>
                        <div class="movie-card-txt">${data.overview}</div>
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
