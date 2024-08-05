export const activeHeader = async () => {
    const header = document.querySelector(".header");
    const hamburgerBtn = document.querySelector(".hamburger-btn");

    hamburgerBtn.addEventListener("click", () => {
        header.classList.toggle("menu-on");
    });
};

export const moveSearchResults = async () => {
    const headerSearchInput = document.querySelector("#header-search-input");
    const headerSearchBtn = document.querySelector("#header-search-btn");

    // 엔터키 이벤트
    headerSearchInput.addEventListener("keydown", (event) => {
        let headerSearchInputValue = headerSearchInput.value;

        // input에 값이 있으면
        if (event.keyCode === 13 && headerSearchInputValue !== "") {
            // 발생한 이벤트에 대한 브라우저의 기본 동작(새로고침)을 막습니다.
            event.preventDefault();
            window.location.href = `/pages/search-results.html`;

            // 검색어 로컬 스토리지에 저장
            localStorage.setItem("searchWord", JSON.stringify(headerSearchInputValue));
        } else if (event.keyCode === 13 && headerSearchInputValue === "") {
            alert("영화 제목을 입력해주세요");
        }
    });

    // 버튼 클릭 이벤트
    headerSearchBtn.addEventListener("click", () => {
        let headerSearchInputValue = headerSearchInput.value;

        // input에 값이 있으면
        if (headerSearchInputValue !== "") {
            window.location.href = `/pages/search-results.html`;

            // 검색어 로컬 스토리지에 저장
            localStorage.setItem("searchWord", JSON.stringify(headerSearchInputValue));
        } else {
            alert("영화 제목을 입력해주세요");
        }
    });

    // input 포커스
    headerSearchInput.focus();
};