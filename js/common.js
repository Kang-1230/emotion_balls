import { activeHeader, moveSearchResults } from "./header.js";

// 헤더
activeHeader();
moveSearchResults();

//스크롤 버튼 지정
const sectionMoveBtn = document.querySelectorAll(".moveBtn");
const scrollTopBtn = document.getElementById("scroll-btn");

//스크롤 타겟 지정
const targetSection = document.querySelectorAll(".category");
const activeScroll = (index) => window.scroll({ top: targetSection[index].offsetTop, behavior: "smooth" });

const happyScroll = () => activeScroll(0);
const sadScroll = () => activeScroll(1);
const angryScroll = () => activeScroll(2);
const anxietyScroll = () => activeScroll(3);
const coldScroll = () => activeScroll(4);
const pageTop = document.getElementById("wrap").offsetTop;

//스크롤 실행
const scrollTop = () => window.scroll({ top: pageTop, behavior: "smooth" });

sectionMoveBtn[0].addEventListener("click", happyScroll);
sectionMoveBtn[1].addEventListener("click", sadScroll);
sectionMoveBtn[2].addEventListener("click", angryScroll);
sectionMoveBtn[3].addEventListener("click", anxietyScroll);
sectionMoveBtn[4].addEventListener("click", coldScroll);
scrollTopBtn.addEventListener("click", scrollTop);
