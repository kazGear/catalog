const FILTER = document.querySelector("#backFilter");
const PARENT_WINDOW = document.querySelector("body");
const MODAL_WINDOW = document.querySelector("#characterWindow");

const calcBirthDay = () => {
    const BIRTH_DAY = new Date("1987/08/23");
    const TODAY = new Date();

    const THIS_YEAR_BIRTH_DAY = new Date(
        TODAY.getFullYear(),
        BIRTH_DAY.getMonth() - 1,
        BIRTH_DAY.getDate()
    );

    // おおまかに年齢を算出
    let age = TODAY.getFullYear() - BIRTH_DAY.getFullYear();

    // 調整
    if (TODAY < THIS_YEAR_BIRTH_DAY) age--;

    const DOM_AGE = document.querySelector("#age");
    DOM_AGE.textContent = age;
};

const openWindow = () => {
    const BUTTON = document.querySelector("#characterButton");

    BUTTON.addEventListener("click", () => {
        FILTER.style.display = "block";
        MODAL_WINDOW.style.display = "block";
        PARENT_WINDOW.style.overflow = "hidden";
    });
};

const closeWindow = () => {
    const BUTTON = document.querySelector("#characterCloseButton");

    BUTTON.addEventListener("click", () => {
        FILTER.style.display = "none";
        MODAL_WINDOW.style.display = "none";
        PARENT_WINDOW.style.overflow = "scroll";
    });
};

const textDecoration = () => {
    const DECO_LEFT = "【";
    const DECO_RIGHT = "】";
    const TEXTS = document.querySelectorAll(".decoration");

    TEXTS.forEach((text) => {
        text.innerText = DECO_LEFT + text.innerText + DECO_RIGHT;
    });
};