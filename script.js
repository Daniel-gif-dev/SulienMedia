// Wait for the page to fully load
document.addEventListener("DOMContentLoaded", function () {

    // ===== 1. SCROLL TO CONTACT =====
    function scrollToContact() {
        const target = document.getElementById("contact");
        if (!target) return;
        const targetPosition = target.offsetTop;
        const startPosition = window.scrollY || window.pageYOffset;
        const distance = targetPosition - startPosition;

        let startTime = null;
        const duration = 800; // ⬅️ Increase this for slower scroll (in ms)

        function animationScroll(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;

            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);

            if (timeElapsed < duration) {
                requestAnimationFrame(animationScroll);
            }
        }

        // Easing function (makes it smooth, not robotic)
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animationScroll);
    }

    // Expose to window so onclick="scrollToContact()" works
    window.scrollToContact = scrollToContact;


    // ===== 2. SEND MESSAGE (FRONTEND ONLY) =====
    window.sendMessage = function () {
        const name = document.querySelector('input[type="text"]').value;
        const email = document.querySelector('input[type="email"]').value;
        const message = document.querySelector('textarea').value;
        const status = document.getElementById("status");

        // Simple validation
        if (name === "" || email === "" || message === "") {
            status.textContent = "Ensure all Fields are Filled Please.";
            status.style.color = "#f43f5e";
            return;
        }

        // Fake success message (since no backend yet)
        status.textContent = "Message sent Thank youuu! We'll get back to you.";
        status.style.color = "#10b981";

        // Clear inputs
        document.querySelector('input[type="text"]').value = "";
        document.querySelector('input[type="email"]').value = "";
        document.querySelector('textarea').value = "";
    };


    // ===== 3. NAVBAR ACTIVE LINK & STICKY HEADER ON SCROLL =====
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".pages a");
    const topbar = document.querySelector(".topbar");

    function handleScroll() {
        const scrollPosition = window.scrollY || window.pageYOffset;

        // Sticky Header class toggle
        if (topbar) {
            if (scrollPosition > 20) {
                topbar.classList.add("scrolled");
            } else {
                topbar.classList.remove("scrolled");
            }
        }

        // Active Link highlighting
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionId = section.getAttribute("id");
            if (sectionId && scrollPosition >= sectionTop - 180) {
                current = sectionId;
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");

            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger once on load to initialize


    // ===== 4. SIMPLE FADE-IN ANIMATION ON SCROLL =====
    const animElements = document.querySelectorAll(".card, .reveal");

    function revealElements() {
        const windowHeight = window.innerHeight;

        animElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;

            if (elTop < windowHeight - 50) {
                el.classList.add("show");
            }
        });
    }

    // Run once on load to animate elements already in the viewport
    revealElements();
    window.addEventListener("scroll", revealElements);
});
