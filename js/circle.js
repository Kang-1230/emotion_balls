// Firebase 초기화 및 Firestore 설정
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getFirestore, doc, updateDoc, increment, getDoc } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAA2KKPve5sNyVRN7y3LxxNVjgEyfp_LwU",
    authDomain: "emotionball-fdf1c.firebaseapp.com",
    projectId: "emotionball-fdf1c",
    storageBucket: "emotionball-fdf1c.appspot.com",
    messagingSenderId: "1069268417676",
    appId: "1:1069268417676:web:d810dfcfe006264d480fa9",
    measurementId: "G-17NQQBMDGH",
};

const app = initializeApp(firebaseConfig); // Firebase 애플리케이션 초기화
const db = getFirestore(app); // Firebase 인스턴스 가져오기
//URL 파라미터로부터 movideId 추출
const urlSearch = new URLSearchParams(location.search);
const getUrlMovieId = urlSearch.get("movieId");
const washingtonRef = doc(db, "emotionball", getUrlMovieId);

// 원 크기를 업데이트
function updateCircleSize(circle, clickCount) {
    const newSize = 100 + clickCount; // 기본 크기에서 클릭당 크기 증가
    circle.style.width = `${newSize}px`;
    circle.style.height = `${newSize}px`;
}

// 버튼 클릭을 처리( 버튼클릭시 카운트 증가 -> firestore 문서의 해당 필드값을 증가 -> 원 크기 업데이트, span 요소의 텍스트를 업데이트하여 클릭 수가 보이도록 함.
async function handleClick(counter, span, circle, field) {
    counter++;
    span.innerText = `${counter}`;
    try {
        await updateDoc(washingtonRef, {
            [field]: increment(5),
        });

        const docSnap = await getDoc(washingtonRef);
        if (docSnap.exists()) {
            const updatedCount = docSnap.data()[field];
            updateCircleSize(circle, updatedCount);
        }
    } catch (error) {
        console.error(error);
    } finally {
        return counter;
    }
}

// 버튼과 카운터 초기화-> DOM이 로드된 후 각 버튼과 해당 카운터, 원요소들을 초기화하고, Firestore에서 현재 값을 가져와 초기값을 설정한다.
document.addEventListener("DOMContentLoaded", async () => {
    const buttonHappy = document.getElementById("button-happy");
    const spanHappy = document.getElementById("span-happy");
    const circle1 = document.getElementById("circle1");

    const buttonSad = document.getElementById("button-sad");
    const spanSad = document.getElementById("span-sad");
    const circle2 = document.getElementById("circle2");

    const buttonAngry = document.getElementById("button-angry");
    const spanAngry = document.getElementById("span-angry");
    const circle3 = document.getElementById("circle3");

    const buttonAnxiety = document.getElementById("button-anxiety");
    const spanAnxiety = document.getElementById("span-anxiety");
    const circle4 = document.getElementById("circle4");

    const buttonCold = document.getElementById("button-cold");
    const spanCold = document.getElementById("span-cold");
    const circle5 = document.getElementById("circle5");

    let cnt1 = 0;
    let cnt2 = 0;
    let cnt3 = 0;
    let cnt4 = 0;
    let cnt5 = 0;

    const docSnap = await getDoc(washingtonRef);
    if (docSnap.exists()) {
        cnt1 = docSnap.data().happy / 5;
        spanHappy.innerText = `${cnt1}`;
        updateCircleSize(circle1, docSnap.data().happy);

        cnt2 = docSnap.data().sad / 5;
        spanSad.innerText = `${cnt2}`;
        updateCircleSize(circle2, docSnap.data().sad);

        cnt3 = docSnap.data().angry / 5;
        spanAngry.innerText = `${cnt3}`;
        updateCircleSize(circle3, docSnap.data().angry);

        cnt4 = docSnap.data().anxiety / 5;
        spanAnxiety.innerText = `${cnt4}`;
        updateCircleSize(circle4, docSnap.data().anxiety);

        cnt5 = docSnap.data().cold / 5;
        spanCold.innerText = `${cnt5}`;
        updateCircleSize(circle5, docSnap.data().cold);
    }
    // 버튼 클릭시 handleClick 함수 실행
    buttonHappy.addEventListener("click", async () => {
        cnt1 = await handleClick(cnt1, spanHappy, circle1, "happy");
    });

    buttonSad.addEventListener("click", async () => {
        cnt2 = await handleClick(cnt2, spanSad, circle2, "sad");
    });

    buttonAngry.addEventListener("click", async () => {
        cnt3 = await handleClick(cnt3, spanAngry, circle3, "angry");
    });

    buttonAnxiety.addEventListener("click", async () => {
        cnt4 = await handleClick(cnt4, spanAnxiety, circle4, "anxiety");
    });

    buttonCold.addEventListener("click", async () => {
        cnt5 = await handleClick(cnt5, spanCold, circle5, "cold");
    });
});
