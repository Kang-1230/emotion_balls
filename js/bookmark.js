// 북마크 버튼 위치
const activeBtn = document.querySelector(".bmkBtn");
const btnImg = document.querySelector("#bmk-off");

//현재 영화 정보 객체
const movieInfo = {
    id: `${id}`,
    image: `${이미지}`,
    title: `${제목}`,
    genre: `${장르}`,
    releaseDate: `${개봉일자}`,
    summary: `${내용}`,
};

//현재 북마크 정보 배열
const currentBmkList = JSON.parse(window.localStorage.getItem("bmk"));

//북마크 여부 확인
const whetherBmk = currentBmkList.some(
    (alreadyBmk) => alreadyBmk.id === movieInfo.id
    // function (alreadyBmk) {
    //     return alreadyBmk.id === movieInfo.id;
    // }
);

//이미 활성화되어있는 북마크 표시하기
window.onload = () => (whetherBmk ? btnImg.setAttribute("id", "bmk-on") : null);
// {
//     if (whetherBmk) {
//         btnImg.setAttribute("id", "bmk-on");
//     }
// }

//북마크리스트 업데이트
const bmkUpdate = (newBmkList) => {
    const strNewList = JSON.stringify(newBmkList);
    window.localStorage.removeItem("bmk");
    window.localStorage.setItem("bmk", strNewList);
};

//현재 영화 북마크에 저장
const saveBmk = async () => {
    try {
        const addList = currentBmkList.push(movieInfo);
        await bmkUpdate(addList);
        btnImg.setAttribute("id", "bmk-on");
    } catch {
        alert("북마크가 실패했습니다.");
    }
};

//현재 영화 북마크에서 제거
const removeBmk = async () => {
    try {
        const filterBmk = currentBmkList.filter(
            (bookmarked) => bookmarked.id !== movieInfo.id
            // function (bookmarked) {
            // return bookmarked.id !== movieInfo.id;
            // }
        );
        await bmkUpdate(filterBmk);
        btnImg.setAttribute("id", "bmk-off");
    } catch {
        alert("북마크 제거가 실패했습니다.");
    }
};

//북마크 토글
const bmkToggle = () => (whetherBmk ? removeBmk() : saveBmk());

activeBtn.addEventListener("click", bmkToggle);

export default bmkToggle;
