//로컬스토리지에 저장된 북마크 목록 가져오기
const bmkList = JSON.parse(window.localStorage.getItem("bookmark"));

const movieList = document.querySelector("#favorites");

const pageLoad = () => {
    //북마크에 아무 영화도 없으면 표시해주기
    if (bmkList === null) {
        let emptyAlert = document.createElement("div");
        emptyAlert.className = "no-results";
        emptyAlert.innerHTML = "북마크 한 영화가 없습니다.";
        movieList.before(emptyAlert);
    } else {
        try {
            //북마크에 있는 영화들 나열하기
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
