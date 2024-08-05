// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getFirestore, doc, updateDoc, increment, addDoc } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAA2KKPve5sNyVRN7y3LxxNVjgEyfp_LwU",
    authDomain: "emotionball-fdf1c.firebaseapp.com",
    projectId: "emotionball-fdf1c",
    storageBucket: "emotionball-fdf1c.appspot.com",
    messagingSenderId: "1069268417676",
    appId: "1:1069268417676:web:d810dfcfe006264d480fa9",
    measurementId: "G-17NQQBMDGH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
console.log(db);
const washingtonRef = doc(db, "emotionball", "test");

//happy click
let cnt1 = 0;
const buttonHappy = document.getElementById("buttonHappy");
async function happyClickCounter() {
    cnt1 += 1;
    spanHappy.innerText = `happy Click: ${cnt1}`;
    console.log(cnt1);

    await updateDoc(washingtonRef, {
        happy: increment(50),
    });

    // 업데이트된 값을 다시 가져와서 표시
    const docSnap = await getDoc(washingtonRef);
    if (docSnap.exists()) {
        const updatedCount = docSnap.data().happy;
        console.log(`Updated happy count: ${updatedCount}`);
    }
}

buttonHappy.addEventListener("click", happyClickCounter);

document.addEventListener("DOMContentLoaded", async (event) => {
    const docSnap = await getDoc(washingtonRef);
    if (docSnap.exists()) {
        cnt1 = docSnap.data().happy / 50; // 초기 값을 가져와서 클릭 수로 변환
        spanHappy.innerText = `happy Click: ${cnt1}`;
    }
});

//sad click
let cnt2 = 0;
const buttonSad = document.getElementById("buttonSad");
async function sadClickCounter() {
    cnt2 += 1;
    spanSad.innerText = `sad Click: ${cnt2}`;
    console.log(cnt2);

    await updateDoc(washingtonRef, {
        sad: increment(50),
    });

    // 업데이트된 값을 다시 가져와서 표시
    const docSnap = await getDoc(washingtonRef);
    if (docSnap.exists()) {
        const updatedCount = docSnap.data().sad;
        console.log(`Updated sad count: ${updatedCount}`);
    }
}

buttonSad.addEventListener("click", sadClickCounter);

document.addEventListener("DOMContentLoaded", async (event) => {
    const docSnap = await getDoc(washingtonRef);
    if (docSnap.exists()) {
        cnt2 = docSnap.data().sad / 50; // 초기 값을 가져와서 클릭 수로 변환
        spanSad.innerText = `sad Click: ${cnt2}`;
    }
});

//angry click
let cnt3 = 0;
const buttonAngry = document.getElementById("buttonAngry");
async function angryClickCounter() {
    cnt3 += 1;
    spanAngry.innerText = `angry Click: ${cnt3}`;
    console.log(cnt3);

    await updateDoc(washingtonRef, {
        angry: increment(50),
    });

    // 업데이트된 값을 다시 가져와서 표시
    const docSnap = await getDoc(washingtonRef);
    if (docSnap.exists()) {
        const updatedCount = docSnap.data().angry;
        console.log(`Updated angry count: ${updatedCount}`);
    }
}

buttonAngry.addEventListener("click", AngryClickCounter);

document.addEventListener("DOMContentLoaded", async (event) => {
    const docSnap = await getDoc(washingtonRef);
    if (docSnap.exists()) {
        cnt3 = docSnap.data().angry / 50; // 초기 값을 가져와서 클릭 수로 변환
        spanAngry.innerText = `angry Click: ${cnt3}`;
    }
});

//anxiety click
let cnt4 = 0;
const buttonAnxiety = document.getElementById("buttonAnxiety");
async function anxietyClickCounter() {
    cnt4 += 1;
    spanAnxiety.innerText = `anxiety Click: ${cnt4}`;
    console.log(cnt4);

    await updateDoc(washingtonRef, {
        anxiety: increment(50),
    });

    // 업데이트된 값을 다시 가져와서 표시
    const docSnap = await getDoc(washingtonRef);
    if (docSnap.exists()) {
        const updatedCount = docSnap.data().anxiety;
        console.log(`Updated anxiety count: ${updatedCount}`);
    }
}

buttonAnxiety.addEventListener("click", AnxietyClickCounter);

document.addEventListener("DOMContentLoaded", async (event) => {
    const docSnap = await getDoc(washingtonRef);
    if (docSnap.exists()) {
        cnt4 = docSnap.data().anxiety / 50; // 초기 값을 가져와서 클릭 수로 변환
        spanAnxiety.innerText = `anxiety Click: ${cnt4}`;
    }
});

await updateDoc(washingtonRef, {
    Cold: increment(50),
});

const circle1 = document.getElementById("circle1");
const circle2 = document.getElementById("circle2");
const circle3 = document.getElementById("circle3");
const circle4 = document.getElementById("circle4");
const circle5 = document.getElementById("circle5");

function updateCircleSize(circle, clickCount) {
    const newSize = 200 + clickCount * 10; // 기본 크기 200px에서 클릭당 10px 증가
    circle.style.width = `${newSize}px`;
    circle.style.height = `${newSize}px`;
}
