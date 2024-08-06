// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getFirestore, doc, updateDoc, increment, getDoc } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

// Your web app's Firebase configuration
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

const washingtonRef = doc(db, "emotionball", "deadful");

// Helper function to update circle size
function updateCircleSize(circle, clickCount) {
    const newSize = 100 + clickCount; // 기본 크기에서 클릭당 크기 증가
    circle.style.width = `${newSize}px`;
    circle.style.height = `${newSize}px`;
}

// Helper function to handle button click
async function handleClick(circle, field) {
    await updateDoc(washingtonRef, {
        [field]: increment(5),
    });

    const docSnap = await getDoc(washingtonRef);
    if (docSnap.exists()) {
        const updatedCount = docSnap.data()[field];
        updateCircleSize(circle, updatedCount);
        console.log(`Updated ${field} count: ${updatedCount}`);
    }
}

// Initialize buttons and counters
document.addEventListener("DOMContentLoaded", async () => {
    const buttonHappy = document.getElementById("buttonHappy");
    const circle1 = document.getElementById("circle1");

    const buttonSad = document.getElementById("buttonSad");
    const circle2 = document.getElementById("circle2");

    const buttonAngry = document.getElementById("buttonAngry");
    const circle3 = document.getElementById("circle3");

    const buttonAnxiety = document.getElementById("buttonAnxiety");
    const circle4 = document.getElementById("circle4");

    const buttonCold = document.getElementById("buttonCold");
    const circle5 = document.getElementById("circle5");

    const docSnap = await getDoc(washingtonRef);
    if (docSnap.exists()) {
        updateCircleSize(circle1, docSnap.data().happy);
        updateCircleSize(circle2, docSnap.data().sad);
        updateCircleSize(circle3, docSnap.data().angry);
        updateCircleSize(circle4, docSnap.data().anxiety);
        updateCircleSize(circle5, docSnap.data().cold);
    }

    buttonHappy.addEventListener("click", () => {
        handleClick(circle1, "happy");
    });

    buttonSad.addEventListener("click", () => {
        handleClick(circle2, "sad");
    });

    buttonAngry.addEventListener("click", () => {
        handleClick(circle3, "angry");
    });

    buttonAnxiety.addEventListener("click", () => {
        handleClick(circle4, "anxiety");
    });

    buttonCold.addEventListener("click", () => {
        handleClick(circle5, "cold");
    });
});
