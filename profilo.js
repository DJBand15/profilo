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

// ---------- CONTACT FORM ----------
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const formSubmitBtn = document.getElementById("formSubmitBtn");

if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        formSubmitBtn.disabled = true;
        formSubmitBtn.textContent = "Sending...";
        formStatus.textContent = "";
        formStatus.style.color = "#6e6e6e";

        const formData = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: formData,
                headers: { "Accept": "application/json" }
            });

            if (response.ok) {
                formStatus.textContent = "Thanks! Your message has been sent — I'll get back to you soon.";
                formStatus.style.color = "rgb(8, 236, 198)";
                contactForm.reset();
            } else {
                throw new Error("Form submission failed");
            }
        } catch (err) {
            formStatus.textContent = "Something went wrong. Please email me directly instead.";
            formStatus.style.color = "#ff6b6b";
        } finally {
            formSubmitBtn.disabled = false;
            formSubmitBtn.textContent = "Send Message";
        }
    });
}

// ---------- PROFILE PICTURE FALLBACK ----------
const profilePic = document.getElementById("profilePic");
const profileWrap = profilePic ? profilePic.closest(".profile-pic-wrap") : null;

if (profilePic && profileWrap) {
    profilePic.addEventListener("error", () => {
        profileWrap.classList.add("no-image");
    });
}