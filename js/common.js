import { activeHeader, moveSearchResults } from "./header.js";

// 헤더
activeHeader();
moveSearchResults();

//스크롤 버튼
const scrollBtn = document.getElementById("scroll-btn");
const target = document.getElementById("wrap").offsetTop;
const scrollTop = () => window.scroll({ top: target, behavior: "smooth" });

scrollBtn.addEventListener("click", scrollTop);
