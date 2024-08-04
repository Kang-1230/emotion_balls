//북마크 내역 가져오기
const bmkList = JSON.parse(window.localStorage.getItem("bmk"));

const movieList = document.querySelector("#container")

window.onload = () => {
    if (bmkList === null) {
        const empty = document.querySelector('#contents');
        empty.innerHTML = "<h1>북마크한 영화가 없습니다</h1>";
    } else {
        try {
            bmkList.forEach((data) => {
                // const movie = createElement("div").innerText = `
                const movie = createElement("li");
                //카드가져오기
                movie.innerHTML = `
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
