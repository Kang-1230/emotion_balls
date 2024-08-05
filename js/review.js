const reviewForm = document.querySelector("#review-form");
const reviewInputName = document.querySelector("#review-input-name");
const reviewInputPassword = document.querySelector("#review-input-password");
const reviewTextareaWrite = document.querySelector("#review-textarea-write");
const reviewItems = document.querySelector("#review-items");

// 주소값 가져오기
const urlSearch = new URLSearchParams(location.search);
const getUrlMovieId = urlSearch.get("movieId");

// 오늘 날짜 가져오기
let today = new Date();
let year = today.getFullYear();
let month = ("0" + (today.getMonth() + 1)).slice(-2);
let day = ("0" + today.getDate()).slice(-2);
let date = year + "-" + month + "-" + day;

const createReview = async () => {
    // 기존 리뷰 가져오기
    loadReviews();

    // 리뷰 등록 submit
    reviewForm.addEventListener("submit", (event) => {
        // 발생한 이벤트에 대한 브라우저의 기본 동작(새로고침)을 막습니다.
        event.preventDefault();

        // 이름, 비번, 리뷰 내용
        let name = reviewInputName.value;
        let password = reviewInputPassword.value;
        let text = reviewTextareaWrite.value;

        // 리뷰 객체 생성
        let reviewObj = {
            name: name,
            password: password,
            text: text,
            movieId: getUrlMovieId,
            reviewId: genRandomString(12),
            date: date,
        };

        // 기존 리뷰 배열 가져오기
        let reviews = getReviews();

        // 기존 리뷰 배열에 새로운 리뷰 추가
        reviews.push(reviewObj);

        // 추가된 리뷰 배열 로컬 스토리지에 저장 - localStorage에는 문자열만 저장되므로 객체, 배열을 JSON 문자열로 변환
        localStorage.setItem("reviews", JSON.stringify(reviews));

        // 리뷰 목록 다시 불러오기
        loadReviews();

        // 폼 초기화
        reviewForm.reset();
    });
};
createReview();

// 임의의 문자열
function genRandomString(length) {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    const charLength = chars.length;
    let result = "";

    for (var i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * charLength));
    }
    return result;
}

// 로컬 스토리지에서 댓글 배열 가져오기
function getReviews() {
    let reviews = localStorage.getItem("reviews");

    return reviews ? JSON.parse(reviews) : [];
}

// 리뷰 목록 불러오기
async function loadReviews() {
    let reviews = getReviews();
    // li 초기화
    reviewItems.innerHTML = "";

    reviews.forEach((review) => {
        // 해당 movieId값을 가지고있는 리뷰만 보여주기
        if (getUrlMovieId === review.movieId) {
            let item = createReviewItem(review);
            reviewItems.appendChild(item);
        }
    });
}

// 리뷰 목록 생성 및 등록
function createReviewItem(review) {
    let reviews = getReviews();
    let item = document.createElement("li");

    item.className = "review-item";
    item.innerHTML = `
        <div class="review-top">
            <div class="review-info">
                <div class="review-writer">${review.name}</div>
                <div class="review-date">${review.date}</div>
            </div>
            <div class="review-btns">
                <button class="review-edit"><span class="material-symbols-rounded"> edit </span></button>
                <button class="review-del"><span class="material-symbols-rounded"> delete </span></button>
            </div>
        </div>

        <div class="review-txt">${review.text}</div>
    `;
    // 해당 아이템은 이 시점부터 click 이벤트를 가지고 있습니다. 즉, 이 카드를 DOM 에 붙여넣어도 이벤트가 작동을 합니다.
    const reviewEdit = item.querySelector(".review-edit");
    const reviewDel = item.querySelector(".review-del");

    // 리뷰 수정
    reviewEdit.addEventListener("click", () => editReviewItem(reviews, review, item));

    // 리뷰 삭제
    reviewDel.addEventListener("click", () => delReviewItem(reviews, review, item));

    return item;
}

// 리뷰 수정
function editReviewItem(reviews, review, item) {
    let itemTextareaWrap = document.createElement("div");
    let itemReviewTxt = item.querySelector(".review-txt");
    let itemReviewTxtValue = itemReviewTxt.innerHTML;

    itemTextareaWrap.className = "review-textarea-wrap";
    itemTextareaWrap.innerHTML = `
        <textarea type="text" class="review-textarea" placeholder="리뷰 내용을 입력해주세요">${itemReviewTxtValue}</textarea>
        <div class="review-edit-btns">
            <button type="button" class="review-cancel">취소</button>
            <button type="submit" class="review-edit-submit">수정</button>
        </div>
    `;

    // 리뷰텍스트가 보이면. 즉, textarea가 안보일때
    if (itemReviewTxt.getAttribute("style") !== "display: none;") {
        // 비밀번호 확인
        let passwordTry = prompt("비밀번호를 입력해주세요.");
        if (passwordTry === review.password) {
            item.appendChild(itemTextareaWrap);
            itemReviewTxt.style.display = "none";

            let reviewEditSubmit = item.querySelector(".review-edit-submit");
            let reviewCancel = item.querySelector(".review-cancel");
            // 리뷰 수정 확인버튼 클릭시
            reviewEditSubmit.addEventListener("click", () => {
                let itemTextarea = item.querySelector(".review-textarea");
                let itemTextareaValue = itemTextarea.value;
                let clickReviewIdIndex = reviews.findIndex((i) => i.reviewId === review.reviewId);

                // 리뷰텍스트가 안 보이면. 즉, textarea가 보일때
                if (itemReviewTxt.getAttribute("style") !== "display: block;") {
                    itemReviewTxt.style.display = "block";
                    itemReviewTxt.innerHTML = itemTextareaValue;
                    itemTextareaWrap.remove();
                }
                if (clickReviewIdIndex >= 0) {
                    reviews[clickReviewIdIndex].text = itemTextareaValue;
                }
                localStorage.setItem("reviews", JSON.stringify(reviews));
            });

            // 리뷰 수정 취소버튼 클릭시
            reviewCancel.addEventListener("click", () => {
                if (itemReviewTxt.getAttribute("style") !== "display: block;") {
                    itemReviewTxt.style.display = "block";
                    itemTextareaWrap.remove();
                }
            });
        } else if (passwordTry !== null) {
            alert("비밀번호가 틀렸습니다.");
        }
    }
}

// 리뷰 삭제
function delReviewItem(reviews, review, item) {
    let clickReviewIdIndex = reviews.findIndex((i) => i.reviewId === review.reviewId);

    // 비밀번호 확인
    let passwordTry = prompt("비밀번호를 입력해주세요.");
    if (passwordTry === review.password && clickReviewIdIndex >= 0) {
        if (confirm("정말 삭제하시겠습니까?") === true) {
            reviews.splice(clickReviewIdIndex, 1);
            localStorage.setItem("reviews", JSON.stringify(reviews));
            item.remove();
        } else {
            return false;
        }
    } else if (passwordTry !== null) {
        alert("비밀번호가 틀렸습니다.");
    }
}
