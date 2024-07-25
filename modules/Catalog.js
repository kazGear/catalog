const FILTER = document.querySelector("#backFilter");
const PARENT_WINDOW = document.querySelector("body");
const MODAL_WINDOW = document.querySelector("#characterWindow");

const calcBirthDay = () => {
    const birthDay = new Date("1987/08/23");
    const today = new Date();

    const thisYearBirthDay = new Date(
        today.getFullYear(),
        birthDay.getMonth(),
        birthDay.getDate()
    );

    // おおまかに年齢を算出
    let age = today.getFullYear() - birthDay.getFullYear();

    // 調整
    if (today < thisYearBirthDay) age--;

    const domAge = document.querySelector("#age");
    domAge.textContent = age;
};

const openWindow = () => {
    const button = document.querySelector("#characterButton");

    button.addEventListener("click", () => {
        FILTER.style.display = "block";
        MODAL_WINDOW.style.display = "block";
        PARENT_WINDOW.style.overflow = "hidden";
    });
};

const closeWindow = () => {
    const button = document.querySelector("#characterCloseButton");

    button.addEventListener("click", () => {
        FILTER.style.display = "none";
        MODAL_WINDOW.style.display = "none";
        PARENT_WINDOW.style.overflow = "scroll";
    });
};

const textDecoration = () => {
    const decoLeft = "【";
    const decoRight = "】";
    const texts = document.querySelectorAll(".decoration");

    texts.forEach((text) => {
        texts.innerText = decoLeft + text.innerText + decoRight;
    });
};