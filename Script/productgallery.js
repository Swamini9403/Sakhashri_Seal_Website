// 🌙 DARK MODE
const toggle = document.getElementById("toggle");

toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  toggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});


// 🔊 CLICK SOUND
const clickSound = new Audio("../assets/sounds/click.mp3"); // add your sound file


// 🔍 SEARCH FILTER (NO BUG)
const search = document.getElementById("search");
const cards = document.querySelectorAll(".card");

search.addEventListener("keyup", () => {
  let value = search.value.toLowerCase();

  cards.forEach(card => {
    let text = card.innerText.toLowerCase();
    card.style.display = text.includes(value) ? "block" : "none";
  });
});


// 🎮 3D TILT EFFECT (PREMIUM)
cards.forEach(card => {

  card.addEventListener("mousemove", e => {
    let x = (e.offsetX / card.offsetWidth - 0.5) * 20;
    let y = (e.offsetY / card.offsetHeight - 0.5) * 20;

    card.style.transform = `rotateY(${x}deg) rotateX(${-y}deg) scale(1.05)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)";
  });

});


// 🚀 POPUP SYSTEM (APPLE STYLE)
const popup = document.createElement("div");
popup.classList.add("popup");

popup.innerHTML = `
  <span class="popup-close">&times;</span>
  <div class="popup-content">
    <img id="popup-img">
    <h3 id="popup-title"></h3>
    <p id="popup-desc"></p>
  </div>
`;

document.body.appendChild(popup);

const popupImg = document.getElementById("popup-img");
const popupTitle = document.getElementById("popup-title");
const popupDesc = document.getElementById("popup-desc");


// 🎯 SINGLE CLICK EVENT (NO CONFLICT)
cards.forEach(card => {

  card.addEventListener("click", (e) => {

    e.stopPropagation();

    // 🔊 PLAY SOUND
    clickSound.currentTime = 0;
    clickSound.play();

    // DATA
    const img = card.querySelector("img").src;
    const title = card.querySelector("h3").innerText;
    const desc = card.querySelector(".card-back").innerText;

    popupImg.src = img;
    popupTitle.innerText = title;
    popupDesc.innerText = desc;

    // 🎬 ANIMATION (THROW EFFECT)
    card.style.transform = "scale(1.2) rotate(5deg)";
    setTimeout(() => {
      card.style.transform = "scale(1)";
    }, 200);

    popup.classList.add("active");
  });

});


// ❌ CLOSE POPUP
popup.querySelector(".popup-close").onclick = () => {
  popup.classList.remove("active");
};

// CLICK OUTSIDE
popup.addEventListener("click", (e) => {
  if(e.target === popup){
    popup.classList.remove("active");
  }
});