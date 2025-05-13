// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add active class to current navigation item
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    const header = document.querySelector('header');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 0) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Form handling
    const form = document.getElementById('prediction-form');
    if (!form) return;

    const steps = form.querySelectorAll('.form-step');
    const nextButtons = form.querySelectorAll('.next-step');
    const prevButtons = form.querySelectorAll('.prev-step');
    const rangeInputs = form.querySelectorAll('input[type="range"]');

    // Update range value displays
    rangeInputs.forEach(input => {
        const valueDisplay = input.nextElementSibling;
        input.addEventListener('input', () => {
            valueDisplay.textContent = input.value;
        });
    });

    // Next button click handler
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            const currentStep = button.closest('.form-step');
            const nextStep = currentStep.nextElementSibling;

            // Validate current step
            const inputs = currentStep.querySelectorAll('input, select');
            let isValid = true;

            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });

            if (!isValid) return;

            // Move to next step
            currentStep.classList.remove('active');
            nextStep.classList.add('active');
        });
    });

    // Previous button click handler
    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            const currentStep = button.closest('.form-step');
            const prevStep = currentStep.previousElementSibling;

            currentStep.classList.remove('active');
            prevStep.classList.add('active');
        });
    });

    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Collect all form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('http://localhost:3031/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();

            // Handle the prediction result
            alert(`Prediction Result: ${result.prediction}`);

            // Reset form and go back to first step
            form.reset();
            steps.forEach((step, index) => {
                step.classList.toggle('active', index === 0);
            });

        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while submitting the form. Please try again.');
        }
    });
});

// Theme switching functionality
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or use system preference
const currentTheme = localStorage.getItem('theme') ||
    (prefersDarkScheme.matches ? 'dark' : 'light');

// Set initial theme
document.documentElement.setAttribute('data-theme', currentTheme);

// Theme toggle click handler
themeToggle.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Header scroll effect
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        header.classList.remove('scrolled');
        return;
    }

    if (currentScroll > lastScroll) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
}); 