export const activeHeader = async () => {
    const header = document.querySelector(".header");
    const hamburgerBtn = document.querySelector(".hamburger-btn");

    hamburgerBtn.addEventListener("click", () => {
        header.classList.toggle("menu-on");
    });
};
