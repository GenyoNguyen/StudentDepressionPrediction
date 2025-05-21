// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Fix: Only enable smooth scroll for in-page anchors (href starts with #)
    // document.querySelectorAll("nav a").forEach((anchor) => {
    //     anchor.addEventListener("click", function (e) {
    //         const href = this.getAttribute("href");
    //         console.log(href);
    //         if (href && href.startsWith("#")) {
    //             e.preventDefault();
    //             const targetId = href.substring(1);
    //             const targetElement = document.getElementById(targetId);
    //             if (targetElement) {
    //                 targetElement.scrollIntoView({
    //                     behavior: "smooth",
    //                     block: "start",
    //                 });
    //             }
    //         }
    //         // If not an in-page anchor, let browser handle navigation (no custom effect)
    //     });
    // });

    // Add active class to current navigation item
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav a");

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute("id");
            }
        });

        // navLinks.forEach((link) => {
        //     link.classList.remove("active");
        //     if (link.getAttribute("href").substring(1) === current) {
        //         link.classList.add("active");
        //     }
        // });
    });

    const header = document.querySelector("header");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 0) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // Form handling
    const form = document.getElementById("prediction-form");
    if (!form) return;

    const steps = form.querySelectorAll(".form-step");
    const nextButtons = form.querySelectorAll(".next-step");
    const prevButtons = form.querySelectorAll(".prev-step");
    const rangeInputs = form.querySelectorAll('input[type="range"]');

    // Update range value displays
    rangeInputs.forEach((input) => {
        const valueDisplay = input.nextElementSibling;
        input.addEventListener("input", () => {
            valueDisplay.textContent = input.value;
        });
    });

    // Next button click handler
    nextButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const currentStep = button.closest(".form-step");
            const nextStep = currentStep.nextElementSibling;

            // Validate current step
            const inputs = currentStep.querySelectorAll("input, select");
            let isValid = true;

            inputs.forEach((input) => {
                if (input.hasAttribute("required") && !input.value) {
                    isValid = false;
                    input.classList.add("error");
                } else {
                    input.classList.remove("error");
                }
            });

            if (!isValid) return;

            // Move to next step
            currentStep.classList.remove("active");
            nextStep.classList.add("active");
        });
    });

    // Previous button click handler
    prevButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const currentStep = button.closest(".form-step");
            const prevStep = currentStep.previousElementSibling;

            currentStep.classList.remove("active");
            prevStep.classList.add("active");
        });
    });

    // Form submission
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Collect all form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch("https://28b4-171-253-176-84.ngrok-free.app/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const result = await response.json();

            // Show modal with result
            const modal = document.getElementById('result-modal');
            const modalMessage = modal.querySelector('.modal-message');
            const positiveIcon = modal.querySelector('.positive-icon');
            const negativeIcon = modal.querySelector('.negative-icon');

            console.log(result);
            // Set message and icon based on prediction
            if (result.prediction) {
                modalMessage.textContent = "Based on the provided information, there is a risk of depression.";
                positiveIcon.style.display = 'none';
                negativeIcon.style.display = 'block';
            } else {
                modalMessage.textContent = "Based on the provided information, there is no significant risk of depression.";
                positiveIcon.style.display = 'block';
                negativeIcon.style.display = 'none';
            }

            // Show modal
            modal.classList.add('active');

            // Handle modal close
            const closeButton = modal.querySelector('.modal-close');
            closeButton.onclick = () => {
                modal.classList.remove('active');
            };

            // Close modal when clicking outside
            modal.onclick = (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            };

        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while submitting the form. Please try again.');
        }
    });
});

// Theme switching functionality
const themeToggle = document.getElementById("theme-toggle");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

// Check for saved theme preference or use system preference
const currentTheme =
    localStorage.getItem("theme") ||
    (prefersDarkScheme.matches ? "dark" : "light");

// Set initial theme
document.documentElement.setAttribute("data-theme", currentTheme);

// Theme toggle click handler
themeToggle.addEventListener("click", () => {
    const newTheme =
        document.documentElement.getAttribute("data-theme") === "light"
            ? "dark"
            : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
});

// Header scroll effect
const header = document.querySelector("header");
let lastScroll = 0;

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        header.classList.remove("scrolled");
        return;
    }

    if (currentScroll > lastScroll) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

    lastScroll = currentScroll;
});

// Sidebar Navigation
const menuToggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');
const overlay = document.querySelector('.overlay');

function toggleSidebar() {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
}

menuToggle.addEventListener('click', toggleSidebar);
overlay.addEventListener('click', toggleSidebar);

// Close sidebar when clicking a link
const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (sidebar.classList.contains('active')) {
            toggleSidebar();
        }
    });
});
