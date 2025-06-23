// Set dark theme as default on page load
document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const themeToggle = document.querySelector(".theme-toggle i");

  // Apply dark theme by default
  body.setAttribute("data-theme", "dark");
  themeToggle.className = "fas fa-sun";

  // Optional: Save preference to localStorage
  localStorage.setItem("theme", "dark");
});

function toggleDarkMode() {
  const body = document.body;
  const themeToggle = document.querySelector(".theme-toggle i");

  if (body.hasAttribute("data-theme")) {
    body.removeAttribute("data-theme");
    themeToggle.className = "fas fa-moon";
    localStorage.setItem("theme", "light"); // Save light theme preference
  } else {
    body.setAttribute("data-theme", "dark");
    themeToggle.className = "fas fa-sun";
    localStorage.setItem("theme", "dark"); // Save dark theme preference
  }
}

// Rest of your existing code remains the same...
// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navbar Scroll Effect
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.background = "#1f2a38";
    navbar.style.backdropFilter = "blur(20px)";
  } else {
    navbar.style.background = "var(--bg-card)";
    navbar.style.backdropFilter = "blur(10px)";
  }
});

// Form Submission
function handleSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;

  // Show loading state
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;

  // Send data to Formspree
  fetch(form.action, {
    method: "POST",
    body: new FormData(form),
    headers: { Accept: "application/json" },
  })
    .then((response) => {
      if (response.ok) {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        form.reset();
      } else {
        throw new Error("Failed to send");
      }
    })
    .catch(() => {
      submitBtn.innerHTML = '<i class="fas fa-times"></i> Error!';
    })
    .finally(() => {
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });
}

// Attach the handler to your form
document
  .getElementById("contact-form")
  .addEventListener("submit", handleSubmit);
// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for animation
document
  .querySelectorAll(".skill-item, .project-card, .timeline-item")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
