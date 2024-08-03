//북마크 내역 가져오기
const bmkList = JSON.parse(window.localStorage.getItem("bmk"));

const movieList = document.querySelector("#container")

window.onload = () => {
    if (bmkList === null) {
        const empty = createElement("div");
        empty.innerText = "<h2>북마크한 영화가 없습니다</h2>";
        movieList.appendChild(empty);
    } else {
        try {
            bmkList.forEach((data) => {
                // const movie = createElement("div").innerText = `
                const movie = createElement("span");
                //카드가져오기
                movie.innerText = `
        ${data.image}
        ${data.title}
        ${data.genre}
        ${data.releaseDate}
        ${data.summary}
        `;
        movieList.appendChild(movie);
            });
        } catch {
            alert("북마크한 목록을 불러오지 못했습니다.");
        }
    }
};
