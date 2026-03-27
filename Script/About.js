gsap.registerPlugin(ScrollTrigger);

// HERO
gsap.from(".hero h1",{y:50,opacity:0,duration:1});

// ABOUT
gsap.from(".about-text",{
  scrollTrigger:".about-diagonal",
  x:-100,
  opacity:0,
  duration:1
});

gsap.from(".about-images img",{
  scrollTrigger:".about-diagonal",
  scale:0,
  opacity:0,
  stagger:0.3
});

// ✅ FIXED CARDS ANIMATION
gsap.fromTo(".info-card",
{
  y:50,
  opacity:0
},
{
  y:0,
  opacity:1,
  duration:1,
  stagger:0.2,
  ease:"power2.out",
  scrollTrigger:{
    trigger:".info-block",
    start:"top 85%"
  }
});

// CERT
gsap.from(".cert-vertical",{
  scrollTrigger:".certifications",
  y:80,
  opacity:0,
  stagger:0.2
});

// DARK MODE
function toggleTheme(){
  document.body.classList.toggle("dark");
  document.getElementById("themeIcon").innerText =
    document.body.classList.contains("dark") ? "☀️" : "🌙";
}

// 💎 3D TILT EFFECT
document.querySelectorAll(".feature").forEach(card => {

  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = -(y - rect.height/2) / 10;
    const rotateY = (x - rect.width/2) / 10;

    card.style.transform =
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.08)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0) scale(1)";
  });

});

gsap.from(".tech-orbit",{
  scrollTrigger:".about-diagonal",
  scale:0.5,
  opacity:0,
  duration:1.2
});
gsap.from(".about-details-text",{
  scrollTrigger:".about-details",
  x:-80,
  opacity:0,
  duration:1
});

gsap.from(".about-details-img",{
  scrollTrigger:".about-details",
  x:80,
  opacity:0,
  duration:1
});