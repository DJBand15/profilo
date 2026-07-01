const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {

    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";

    const textElements = document.querySelectorAll(
        "h1, h2, h3, p, h6, a"
    );

    textElements.forEach(el => {

const rect = el.getBoundingClientRect();

const near =
    e.clientX >= rect.left - 50 &&
    e.clientX <= rect.right + 50 &&
    e.clientY >= rect.top - 50 &&
    e.clientY <= rect.bottom + 50;

if (near) {
    el.classList.add("glow-text");

    if (el.tagName === "H6") {
        el.style.opacity = 1;
    }

} else {
    el.classList.remove("glow-text");

    if (el.tagName === "H6") {
        el.style.opacity = 0.2;
    }
}
    });

});
