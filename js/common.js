import { activeHeader, moveSearchResults } from "./header.js";

// 헤더
activeHeader();
moveSearchResults();

//스크롤 버튼 지정
const scrollTopBtn = document.getElementById("scroll-btn");

//스크롤 타겟 지정
const pageTop = document.getElementById("wrap").offsetTop;

//스크롤 실행
const scrollTop = () => window.scroll({ top: pageTop, behavior: "smooth" });
scrollTopBtn.addEventListener("click", scrollTop);
