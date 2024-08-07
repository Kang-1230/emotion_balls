# 🔮감정구슬 - emotion_balls

기획 : 감정에 따라서 영화를 추천해주는 서비스를 제공하는 사이트
구현 기능 
 - 메인 페이지 : 감정(장르별)리스트, 이모지 클릭 시 해당 섹션으로 이동, 위로 가기 버튼 클릭 시 최상단으로 이동, 버튼 클릭시 해당 섹션으로 이동
 - 상세 페이지 : 영화별 감정 버튼 클릭 시 배경 동그라미 커지는 효과, 북마크

<메인 페이지 장르별 정렬 기능> 

-api로 데이터 가져오기 -> fetch 페이지 만들어서 영화 데이터 추가하기 -> Promise.all 함수를 사용해서 fetch로 가져온 promise 객체를 한번에 처리, flat 하나의 배열로 만들기 -> 장르 데이터 추출해서 배열로 만들기 -> 장르에 있는 배열 중, 특정 id가 포함된 배열을 추출하여 필터링 -> querySelector로 class 지정하여 안에 moviecard 추가, 데이터 추가 -> 장르별로 함수 실행

```//Promise.all 함수를 사용해서 fetch로 가져온 promise 객체를 한번에 처리, flat으로 하나의 배열로 만들기
async function fetchData() {
    const fetchMovies = async (page) => {
        const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=${page}`, options);
        const data = await response.json();
        return data.results;
    };
    const moviePromises = Array.from({ length: 10 }, (_, i) => {
        return fetchMovies(i + 1);
    });
    const results = await Promise.all(moviePromises);
    const mergeMovies = results.flat();
```
 어려웠던 점 : 0부터 시작해야 한다는 점이 너무 부담이 되었고 어떻게 할 줄 몰랐다. 튜터분들과 팀원분들의 도움으로 배운 내용들을 어떻게 코드에 녹여내야 하는지 알게 되고 점점 발전했다.

<북마크 기능> : 영화 정보가 들어있는 객체를 배열에 넣었다 뺐다하고 그 배열을 로컬스토리지에 저장하고 불러오는 원리로 동작

API에서 받아온 데이터에서 Query String으로 받아온 영화 아이디에 해당하는 영화를 찾아 불러온다 -> 그 영화가 현재 북마크에 있으면 북마크 버튼을 색칠해준다 -> 북마크 버튼을 누르면 로컬스토리지에 저장돼있는 북마크리스트에 현재 정보를 추가하거나 뺀다 (만약 북마크 배열이 빈 배열이면 로컬스토리지에서 북마크리스트 자체를 삭제한다)
```
//장르가 아래의 배열로 주어졌을 때
const genres = [{ 28: "액션" }, { 12: "모험" },..., { 37: "서부극" }]

//현재 영화의 장르 아이디가 임의의 개수로 주어질 때 반복문을 통해 배열속의 각 객체에 접근하여 장르 아이디와 객체의 아이디를 비교하여 일치하는 것의 값을 모아 값, 값으로 나타내는 함수
const genreId = findMovie.genre_ids;
let genreArr = [];
for (let i = 0; i < genres.length; i++) {
    let foundId = genreId.find((key) => key in genres[i]);
    if (foundId !== undefined) {
        genreArr.push(Object.values(genres[i]));
    }
}
const toString = function (inputArr) {
    switch (inputArr.length) {
        case 1:
            return String(inputArr[0]);
        default:
            let genre = inputArr[0];
            let i = 1;
            while (i < inputArr.length) {
                genre += `, ${inputArr[i]}`;
                i++;
            }
            return genre;
    }
};
const genre = toString(genreArr);
```

어려웠던 점 : 어떻게 JS로 CSS파일을 변경하여 북마크 버튼을 색칠해야할 지 감을 못 잡고 헤매다가 버튼 태그의 아이디를 바꾸는 방법으로 구현 할 수 있다는 것을 알게되었고 잘 해결했다.

<즐겨찾기 페이지>
로컬스토리지에 저장돼있는 리스트를 불러와서 저장돼있는 영화정보들을 이용해 나열한다
만약 북마크리스트가 없으면 북마크에 저장한 영화가 없다고 알려준다

<상세페이지 감정버튼 기능> : 각 영화별로 느꼈던 감정을 클릭하면, 클릭 횟수에 따라 원이 커지며 다른 사람들도 이 영화를 보고 어떤 감정을 느꼈는지 명시적으로 눈에 볼 수 있다.

배경이 되는 원, 버튼을 제작하기 -> 버튼을 클릭 시 그 횟수를 카운트하고 이를 숫자로 나타내기 -> 클릭한 횟수를 파이어베이스에 넣기 -> 파이어베이스에서 자료를 불러와 원의 사이즈를 키우기 -> 새로고침 시 마지막으로 저장된 클릭 횟수를 불러오기 -> 불러온 횟수에 따라 숫자와 원의 크기를 변경한채로 시작하기

기획 : 감정에 따라서 영화를 추천해주는 서비스를 제공하는 사이트구현 기능

-   메인 페이지 : 감정(장르별)리스트, 이모지 클릭 시 해당 섹션으로 이동, 위로 가기 버튼 클릭 시 최상단으로 이동, 버튼 클릭시 해당 섹션으로 이동
-   상세 페이지 : 영화별 감정 버튼 클릭 시 배경 동그라미 커지는 효과,

1. 메인 페이지 장르별 정렬 기능 -api로 데이터 가져오기 -> fetch 페이지 만들어서 영화 데이터 추가하기 -> Promise.all 함수를 사용해서 fetch로 가져온 promise 객체를 한번에 처리, flat 하나의 배열로 만들기 -> 장르 데이터 추출해서 배열로 만들기 -> genres에 있는 배열 중, romance, musical이 포함된 id를 추출 ->





- 메인 섹션 스크롤
1. 버튼 클릭시 data-emotion를 가져와 어떤 감정섹션으로 이동해야할지 확인 후 해당 감정섹션으로 이동
2. 모바일 일땐 모바일 헤더높이를 제외한 위치로 이동하고 pc일땐 pc헤더 높이를 제외한 위치로 이동

- 검색결과 페이지
1. input에 값이 있을 때 동작, 없으면 알림창이 보여짐
2. 대소문자 구분없이 검색을 위해 검색어를 소문자로 변환
3. 엔터나 버튼 클릭시(검색시) 검색어를 로컬 스토리지에 저장
4. 검색결과 페이지로 이동
5. 로컬 스토리지에서 검색어 가져오기
6. 검색어를 페이지 제목에 넣음
7. TMDB API 데이터 가져옴(fetch 사용)
8. 검색결과 리스트 보여주기
9. 검색 결과 없을 시 피드백
10. 이미지 없을 시 이미지 아이콘 보여줌

- 리뷰 리스트
1. Query String으로 주소값 가져와서 MovieId 추출
2. 저장되어있던 리뷰 목록 불러오기 이때, 해당 movieId값을 가지고있는 리뷰만 보여줌
3. 작성자 이름, 비밀번호, 리뷰 내용을 모두 입력시 리뷰 생성
4. 리뷰 객체 생성시 리뷰 id를 임의의 문자열로 생성
5. 로컬 스토리지에서 기존 리뷰 배열 가져오고 기존 리뷰 배열에 새로운 리뷰 추가
6. 추가된 리뷰 배열 로컬 스토리지에 저장 - localStorage에는 문자열만 저장되므로 객체, 배열을 JSON 문자열로 변환
7. 리뷰 목록 다시 불러오기
8. 폼 초기화

- 리뷰 수정
1. 수정 버튼 클릭시 내용 영역에 textarea 생성
2. 비밀번호를 확인하고 동일할때 수정 가능
3. 비밀번호 틀렸을 시 알림
4. 수정확인 버튼을 누르면 리뷰 내용을 수정한 내용으로 변경 해주고 변경된 내용을 로컬스토리지에 저장
5. 수정취소 버튼을 누르면 기존내용으로 초기화

``` javascript
// 리뷰 삭제
function delReviewItem(reviews, review, item) {
    let clickReviewIdIndex = reviews.findIndex((i) => i.reviewId === review.reviewId);

    // 비밀번호 확인
    let passwordTry = prompt("비밀번호를 입력해주세요.");
    if (passwordTry === review.password && clickReviewIdIndex >= 0) {
        // 한 번 더 삭제 확인
        if (confirm("정말 삭제하시겠습니까?") === true) {
            // localStorage에서 삭제
            reviews.splice(clickReviewIdIndex, 1);
            localStorage.setItem("reviews", JSON.stringify(reviews));
            // 리뷰 목록에서 삭제
            item.remove();
        } else {
            return false;
        }
    } else if (passwordTry !== null) {
        alert("비밀번호가 틀렸습니다.");
    }
}
```
삭제 버튼 클릭 시 바로 삭제하지 않고 한 번 더 삭제 확인 기능을 제공해 사용자가 실수로 삭제하는 것을 방지했습니다.

### 어려웠던 점
- 리뷰 작업을 하며 로컬스토리지와 API를 모두 염두에 두며 작업한다는 것이 제일 어려웠습니다.
- 헤더에서 검색 시 검색 결과 페이지로 이동되는데 다른 페이지로 이동 시 검색어를 어떻게 처리해야 할지 고민이 많았습니다.

- 리뷰 삭제
1. 삭제버튼 클릭시 비밀번호 확인
2. 정말 삭제하겠냐는 알림창으로 다시 한번 확인
3. 확인 클릭시 리뷰 목록과 로컬스토리지에서 삭제
