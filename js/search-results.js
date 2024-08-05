const headerSearchInput = document.querySelector("#header-search-input");
const searchResultsTit = document.querySelector(".search-results-tit strong");
const searchResultsItems = document.querySelector("#search-results-items");

export const createSearchResults = async () => {
    const movies = await fetchMovieDate();

    searchResultsTit.textContent = getSearchWord();

    // 검색결과 리스트
    movies.forEach((movie) => {
        let item = createSearchResultsItem(movie);
        searchResultsItems.appendChild(item);
    });
    function createSearchResultsItem(movie) {
        let item = document.createElement("li");
        item.className = "search-results-item";
        item.innerHTML = `
            <div>${movie.title}</div>
            <div>${movie.overview}</div>
        `;

        return item;
    }

    // 검색결과 없을시
    if (movies.length <= 0) {
        noResults();
    }
    function noResults() {
        let noItem = document.createElement("div");
        noItem.className = "no-results";
        noItem.textContent = "검색 결과가 없습니다.";

        searchResultsItems.before(noItem);
    }

    // input 포커스
    headerSearchInput.focus();
};
createSearchResults();

// 로컬 스토리지에서 검색어 가져오기
function getSearchWord() {
    let searchWord = localStorage.getItem("searchWord");

    return searchWord ? JSON.parse(searchWord) : "";
}

// TMDB API
async function fetchMovieDate() {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNGU1ODM2ZDQ0ZTllMjc2YTAzYjhiOWRhYzAyMTYxZSIsIm5iZiI6MTcyMjc1NTA1My44NDAzODgsInN1YiI6IjY2YTIzN2I5NTU3ZDEyMmU4NTE4ZWI5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JRWjgRNrkGahvLMsOkNF2zPFOxwRB5oVfyFipUPToi0",
        },
    };
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${getSearchWord()}&include_adult=false&language=ko-KR&page=1&append_to_response=images&include_image_language=ko`, options);
        const data = await response.json();
        return data.results;
    } catch (error) {
        throw error;
    }
}
