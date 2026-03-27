// DARK MODE
const toggleBtn = document.getElementById("theme-toggle");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleBtn.textContent =
    document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// SCROLL REVEAL
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const trigger = window.innerHeight * 0.85;

  reveals.forEach((el) => {
    const top = el.getBoundingClientRect().top;

    if (top < trigger) {
      el.classList.add("show");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll); // 🔥 important

// PARALLAX EFFECT 🔥
const parallax = document.getElementById("parallax");

document.addEventListener("mousemove", (e) => {
  let x = (window.innerWidth / 2 - e.pageX) / 25;
  let y = (window.innerHeight / 2 - e.pageY) / 25;

  parallax.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
});

// SCROLL REVEAL FOR INDUSTRY ITEMS
const items = document.querySelectorAll(".industry-item");

window.addEventListener("scroll", () => {
  items.forEach((item, index) => {
    const top = item.getBoundingClientRect().top;

    if (top < window.innerHeight - 50) {
      setTimeout(() => {
        item.classList.add("show");
      }, index * 150); // delay effect
    }
  });
});
const texts = [
  "Precision Sealing Solutions",
  "High Performance Seal Kits",
  "Built for Extreme Conditions",
  "Trusted Industrial Quality",
  "Advanced Sealing Technology"
];

let index = 0;
const badgeText = document.getElementById("badge-text");

setInterval(() => {

  // Fade out
  badgeText.style.opacity = "0";
  badgeText.style.transform = "translateY(10px)";

  setTimeout(() => {
    index = (index + 1) % texts.length;
    badgeText.textContent = texts[index];

    // Fade in
    badgeText.style.opacity = "1";
    badgeText.style.transform = "translateY(0)";
  }, 400);

}, 2500);

/* ================= PARALLAX EFFECT ================= */
const form = document.querySelector(".location-form");

form.addEventListener("mousemove", (e) => {
  const rect = form.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const rotateX = ((y / rect.height) - 0.5) * 10;
  const rotateY = ((x / rect.width) - 0.5) * -10;

  form.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

form.addEventListener("mouseleave", () => {
  form.style.transform = "rotateX(0) rotateY(0)";
});

/* ================= BUTTON RIPPLE ================= */
const button = document.querySelector(".location-form button");

button.addEventListener("click", function(e) {
  const circle = document.createElement("span");
  const diameter = Math.max(this.clientWidth, this.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${e.clientX - this.offsetLeft - radius}px`;
  circle.style.top = `${e.clientY - this.offsetTop - radius}px`;

  this.appendChild(circle);

  setTimeout(() => circle.remove(), 600);
});

/* ================= LIVE VALIDATION ================= */
const inputs = document.querySelectorAll(".input-box input, .input-box textarea");

inputs.forEach(input => {
  input.addEventListener("input", () => {
    const parent = input.parentElement;

    if (input.value.trim() === "") {
      parent.classList.add("error");
      parent.classList.remove("success");
    } else {
      parent.classList.add("success");
      parent.classList.remove("error");
    }
  });
});

