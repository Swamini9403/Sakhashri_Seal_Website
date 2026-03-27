// ================= SCROLL REVEAL =================
window.addEventListener("scroll", () => {
  document.querySelectorAll(".reveal").forEach(el => {
    let top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add("show");
    }
  });
});


// ================= SOUND SETUP =================
const typingSound = new Audio("../assets/sounds/lappykeysound.mp3");
typingSound.volume = 0.15;
typingSound.loop = true; // ✅ continuous sound

typingSound.load();

// 🔓 unlock audio on first click
document.body.addEventListener("click", () => {
  typingSound.play().then(() => {
    typingSound.pause();
    typingSound.currentTime = 0;
  }).catch(() => {});
}, { once: true });


// ================= FAQ FUNCTION =================
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
  const question = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");
  const icon = item.querySelector(".faq-icon");

  const originalText = answer.textContent.trim();
  answer.textContent = "";

  question.addEventListener("click", () => {

    const isActive = item.classList.contains("active");

    // CLOSE ALL
    faqItems.forEach(i => {
      i.classList.remove("active");
      i.querySelector(".faq-icon").textContent = "+";
      i.querySelector(".faq-answer").textContent = "";
    });

    // OPEN CLICKED
    if (!isActive) {
      item.classList.add("active");
      icon.textContent = "×";

      typeEffect(answer, originalText);
    }

  });
});


// ================= PERFECT SYNC TYPING =================
function typeEffect(element, text) {
  let i = 0;

  // 🔊 START SOUND IMMEDIATELY
  typingSound.currentTime = 0;
  typingSound.play().catch(() => {});

  function typing() {
    if (i < text.length) {

      const char = text.charAt(i);
      element.textContent += char;
      i++;

      // ⏱️ HUMAN TYPING SPEED
      let speed = 25;

      if (char === " ") speed = 60;
      if (char === ",") speed = 90;
      if (char === ".") speed = 140;

      setTimeout(typing, speed);

    } else {
      // 🛑 STOP SOUND WHEN DONE
      typingSound.pause();
      typingSound.currentTime = 0;
    }
  }

  typing();
}


// ================= CUSTOM CURSOR =================
const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {
  if (cursor) {
    cursor.style.top = e.clientY + "px";
    cursor.style.left = e.clientX + "px";
  }
});

// hover effect
document.querySelectorAll("a, button, .faq-question").forEach(el => {
  el.addEventListener("mouseenter", () => {
    if (cursor) cursor.classList.add("hover");
  });

  el.addEventListener("mouseleave", () => {
    if (cursor) cursor.classList.remove("hover");
  });
});

function toggleTheme(){
  document.body.classList.toggle("dark");

  const icon = document.getElementById("themeIcon");

  if(document.body.classList.contains("dark")){
    icon.innerText = "☀️";
    localStorage.setItem("theme","dark");
  }else{
    icon.innerText = "🌙";
    localStorage.setItem("theme","light");
  }
}

/* LOAD SAVED THEME */
window.onload = function(){
  const savedTheme = localStorage.getItem("theme");

  if(savedTheme === "dark"){
    document.body.classList.add("dark");
    document.getElementById("themeIcon").innerText = "☀️";
  }
};