// Auto language switch
document.addEventListener("DOMContentLoaded", () => {
    const userLang = navigator.language || navigator.userLanguage;

    if (userLang.startsWith("ru") && location.pathname === "/") {
        window.location.href = "/index.ru.html";
    }
});
