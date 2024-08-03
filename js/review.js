export const createReview = async () => {
    const reviewForm = document.querySelector("#review-form");
    const reviewInputName = document.querySelector("#review-input-name");
    const reviewInputPassword = document.querySelector("#review-input-password");
    const reviewTextareaWrite = document.querySelector("#review-textarea-write");
    const reviewItems = document.querySelector("#review-items");

    // 주소값 가져오기
    let herfName = encodeURI(window.location.href);
    let parameters = herfName.slice(herfName.indexOf("?") + 1, herfName.length);
    let valueMovieId = parameters.split("=")[1]; // movieId의 값
    if (valueMovieId == undefined) valueMovieId = 0;

    // 오늘 날짜 가져오기
    let today = new Date();
    let year = today.getFullYear();
    let month = ("0" + (today.getMonth() + 1)).slice(-2);
    let day = ("0" + today.getDate()).slice(-2);
    let date = year + "-" + month + "-" + day;

    // 기존 리뷰 가져오기
    window.onload = function () {
        loadReviews();
    };

    reviewForm.addEventListener("submit", (event) => {
        // 발생한 이벤트에 대한 브라우저의 기본 동작(새로고침)을 막습니다.
        event.preventDefault();

        // 이름, 비번, 리뷰 내용
        let name = reviewInputName.value;
        let password = reviewInputPassword.value;
        let text = reviewTextareaWrite.value;

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

        // 리뷰 객체 생성
        let reviewObj = {
            name: name,
            password: password,
            text: text,
            movieId: valueMovieId,
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

        // 개발 중 전체삭제
        // localStorage.clear();
    });

    // 로컬 스토리지에서 댓글 배열 가져오기
    function getReviews() {
        let reviews = localStorage.getItem("reviews");

        if (reviews) {
            return JSON.parse(reviews);
        } else {
            return [];
        }
    }

    // 리뷰 목록 불러오기
    function loadReviews() {
        let reviews = getReviews();
        // li 초기화
        reviewItems.innerHTML = "";

        reviews.forEach((review) => {
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
            reviewItems.appendChild(item);

            let reviewEdit = item.querySelector(".review-edit");
            let reviewDel = item.querySelector(".review-del");
            let clickIdIndex = reviews.findIndex((i) => i.reviewId === review.reviewId);

            // 리뷰 수정
            reviewEdit.addEventListener("click", () => {
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

                const passwordTry = prompt("비밀번호를 입력해주세요.");
                if (passwordTry === review.password) {
                    if (itemReviewTxt.getAttribute("style") !== "display: none;") {
                        item.appendChild(itemTextareaWrap);
                        itemReviewTxt.style.display = "none";

                        let reviewEditSubmit = item.querySelector(".review-edit-submit");
                        let reviewCancel = item.querySelector(".review-cancel");

                        // 리뷰 수정 확인
                        reviewEditSubmit.addEventListener("click", () => {
                            let itemTextarea = item.querySelector(".review-textarea");
                            let itemTextareaValue = itemTextarea.value;

                            if (itemReviewTxt.getAttribute("style") !== "display: block;") {
                                itemReviewTxt.style.display = "block";
                                itemReviewTxt.innerHTML = itemTextareaValue;
                                itemTextareaWrap.remove();
                            }
                            if (clickIdIndex >= 0) {
                                reviews[clickIdIndex].text = itemTextareaValue;
                            }
                            localStorage.setItem("reviews", JSON.stringify(reviews));
                        });

                        // 리뷰 수정 취소
                        reviewCancel.addEventListener("click", () => {
                            if (itemReviewTxt.getAttribute("style") !== "display: block;") {
                                itemReviewTxt.style.display = "block";
                                itemTextareaWrap.remove();
                            }
                        });
                    }
                } else {
                    alert("비밀번호가 틀렸습니다.");
                }
            });

            // 리뷰 삭제
            reviewDel.addEventListener("click", () => {
                if (clickIdIndex >= 0) {
                    if (confirm("정말 삭제하시겠습니까?") === true) {
                        reviews.splice(clickIdIndex, 1);
                        localStorage.setItem("reviews", JSON.stringify(reviews));
                        item.remove();
                    } else {
                        return false;
                    }
                }
            });
        });
    }
};
