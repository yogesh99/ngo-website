/* 

Web Development by Yogesh S.Waradkar
Project : NGO-Website.
File Name : script.js
All the functionality of the Website is in this js file. 
Date : 16-09-2025
*/

// Reveal content funtionality
document.addEventListener("DOMContentLoaded", () => {
  const reveals = document.querySelectorAll(".reveal");
  function revealOnScroll() {
    const windowHeight = window.innerHeight;
    reveals.forEach((el) => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 100) el.classList.add("active");
    });
  }
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();
});

// Mobile Menu functionality
function openMenu() {
  document.getElementById("mobileMenu").style.width = "100%";
}
function closeMenu() {
  document.getElementById("mobileMenu").style.width = "0";
}

// Donation form functionality
document
  .getElementById("donationForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const type = document.getElementById("type").value;
    const amount = document.getElementById("amount").value;

    // Simple validation check
    if (!name || !email || !type) {
      document.getElementById("formMessage").style.color = "orange";
      document.getElementById("formMessage").innerText =
        "⚠️ Please fill all fields.";
      return;
    }

    // Show success message
    document.getElementById("formMessage").style.color = "white";
    document.getElementById(
      "formMessage"
    ).innerText = `✅ Thank you ${name}! We will contact you soon.`;

    // Clear form
    e.target.reset();
  });

// Counter animation
const counters = document.querySelectorAll(".counter");
const speed = 200; // smaller = faster
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const updateCount = () => {
          const target = +counter.getAttribute("data-target");
          const count = +counter.innerText;
          const increment = Math.ceil(target / speed);
          if (count < target) {
            counter.innerText = count + increment;
            setTimeout(updateCount, 30);
          } else {
            counter.innerText = target;
          }
        };
        updateCount();
        counterObserver.unobserve(counter);
      }
    });
  },
  { threshold: 0.5 }
);

counters.forEach((counter) => {
  counterObserver.observe(counter);
});

// Donation tier auto-fill
document.querySelectorAll(".tier-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.getElementById("amount").value = btn.dataset.amount;
  });
});

// Success Stories Carousel
const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children);
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
let currentIndex = 0;

function updateCarousel() {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateCarousel();
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateCarousel();
});

// Auto-play every 6 seconds
setInterval(() => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateCarousel();
}, 6000);

// PWA functionality - Register Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/ngo-website/service-worker.js")
      .then((reg) => console.log("Service Worker registered:", reg.scope))
      .catch((err) => console.log("SW registration failed:", err));
  });
}

// Adding Manual install as app button
let deferredPrompt;
const installBtn = document.getElementById("installAppBtn");

// Listen for the install prompt event
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  // Show the button
  installBtn.style.display = "block";
});

// Handle the button click
installBtn.addEventListener("click", () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then((choice) => {
      console.log("User choice:", choice.outcome);

      if (choice.outcome === "accepted") {
        console.log("PWA installed");
        installBtn.style.display = "none"; // Hide button after install
      }

      deferredPrompt = null;
    });
  }
});

// Hide the button if already installed
window.addEventListener("appinstalled", () => {
  console.log("PWA was installed");
  installBtn.style.display = "none";
});

// Back to top Button functionality
const backToTop = document.getElementById("backToTop");

window.onscroll = function () {
  if (
    document.body.scrollTop > 200 ||
    document.documentElement.scrollTop > 200
  ) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
};

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
