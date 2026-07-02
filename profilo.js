// ---------- CURSOR GLOW EFFECT ----------
const glow = document.querySelector(".cursor-glow");
const textElements = document.querySelectorAll("h1, h2, h3, p, h6, a");

let mouseX = 0;
let mouseY = 0;
let ticking = false;

document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!ticking) {
        window.requestAnimationFrame(updateGlow);
        ticking = true;
    }
});

function updateGlow() {
    glow.style.left = mouseX + "px";
    glow.style.top = mouseY + "px";

    textElements.forEach(el => {
        const rect = el.getBoundingClientRect();

        const near =
            mouseX >= rect.left - 50 &&
            mouseX <= rect.right + 50 &&
            mouseY >= rect.top - 50 &&
            mouseY <= rect.bottom + 50;

        if (near) {
            el.classList.add("glow-text");
            if (el.tagName === "H6") el.style.opacity = 1;
        } else {
            el.classList.remove("glow-text");
            if (el.tagName === "H6") el.style.opacity = 0.2;
        }
    });

    ticking = false;
}

// ---------- PROFILE PICTURE FALLBACK ----------
// If profile.jpg (or whatever file the <img src> points to) can't be
// found, show the "DJ" initials circle instead so the page never looks broken.
const profilePic = document.getElementById("profilePic");
const profileWrap = profilePic ? profilePic.closest(".profile-pic-wrap") : null;

if (profilePic && profileWrap) {
    profilePic.addEventListener("error", () => {
        profileWrap.classList.add("no-image");
    });
}
