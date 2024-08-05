//happy click
let cnt1 = 0;
const buttonHappy = document.getElementById("buttonHappy");
const spanHappy = document.getElementById("spanHappy");

function happyClickCounter() {
    cnt1 += 1;
    spanHappy.innerText = `happy Click: ${cnt1}`;
    console.log(cnt1);

    db.collection("clickCounts").doc("happyClick").set({
        count: cnt1,
    });

    updateCircleSize(circle1, cnt1);
}

buttonHappy.addEventListener("click", happyClickCounter);

document.addEventListener("DOMContentLoaded", (event) => {
    db.collection("clickCounts")
        .doc("happyClick")
        .get()
        .then((doc) => {
            if (doc.exists) {
                cnt1 = doc.data().count;
                spanHappy.innerText = `happy Click: ${cnt1}`;
                updateCircleSize(circle1, cnt1);
            }
        });
});

//sad click
let cnt2 = 0;
const buttonSad = document.getElementById("buttonSad");
const spanSad = document.getElementById("spanSad");

function sadClickCounter() {
    cnt2 += 1;
    spanSad.innerText = `sad Click: ${cnt2}`;
    console.log(cnt2);

    db.collection("clickCounts").doc("sadClick").set({
        count: cnt2,
    });

    updateCircleSize(circle2, cnt2);
}

buttonSad.addEventListener("click", sadClickCounter);

document.addEventListener("DOMContentLoaded", (event) => {
    db.collection("clickCounts")
        .doc("sadClick")
        .get()
        .then((doc) => {
            if (doc.exists) {
                cnt2 = doc.data().count;
                spanSad.innerText = `sad Click: ${cnt2}`;
                updateCircleSize(circle2, cnt2);
            }
        });
});

//angry click
let cnt3 = 0;
const buttonAngry = document.getElementById("buttonAngry");
const spanAngry = document.getElementById("spanAngry");

function angryClickCounter() {
    cnt3 += 1;
    spanAngry.innerText = `angry Click: ${cnt3}`;
    console.log(cnt3);

    db.collection("clickCounts").doc("angryClick").set({
        count: cnt3,
    });

    updateCircleSize(circle3, cnt3);
}

buttonAngry.addEventListener("click", angryClickCounter);

document.addEventListener("DOMContentLoaded", (event) => {
    db.collection("clickCounts")
        .doc("angryClick")
        .get()
        .then((doc) => {
            if (doc.exists) {
                cnt3 = doc.data().count;
                spanAngry.innerText = `angry Click: ${cnt3}`;
                updateCircleSize(circle3, cnt3);
            }
        });
});

//anxiety click
let cnt4 = 0;
const buttonAnxiety = document.getElementById("buttonAnxiety");
const spanAnxiety = document.getElementById("spanAnxiety");

function anxietyClickCounter() {
    cnt4 += 1;
    spanAnxiety.innerText = `anxiety Click: ${cnt4}`;
    console.log(cnt4);

    db.collection("clickCounts").doc("anxietyClick").set({
        count: cnt4,
    });

    updateCircleSize(circle4, cnt4);
}

buttonAnxiety.addEventListener("click", anxietyClickCounter);

document.addEventListener("DOMContentLoaded", (event) => {
    db.collection("clickCounts")
        .doc("anxietyClick")
        .get()
        .then((doc) => {
            if (doc.exists) {
                cnt4 = doc.data().count;
                spanAnxiety.innerText = `anxiety Click: ${cnt4}`;
                updateCircleSize(circle4, cnt4);
            }
        });
});

// coldClick 관련 코드
let cnt5 = 0;
const buttonCold = document.getElementById("buttonCold");
const spanCold = document.getElementById("spanCold");

function coldClickCounter() {
    cnt5 += 1;
    spanCold.innerText = `cold Click: ${cnt5}`;
    console.log(cnt5);

    db.collection("clickCounts").doc("coldClick").set({
        count: cnt5,
    });

    updateCircleSize(circle5, cnt5);
}

buttonCold.addEventListener("click", coldClickCounter);

document.addEventListener("DOMContentLoaded", (event) => {
    db.collection("clickCounts")
        .doc("coldClick")
        .get()
        .then((doc) => {
            if (doc.exists) {
                cnt5 = doc.data().count;
                spanCold.innerText = `cold Click: ${cnt5}`;
                updateCircleSize(circle5, cnt5);
            }
        });
});
