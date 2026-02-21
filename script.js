const texts = ["Full Stack Developer", "Problem Solver", "MERN Developer"];
let textIndex = 0,
  charIndex = 0,
  isDeleting = false;
const typing = document.querySelector(".typing");

function typeEffect() {
  const current = texts[textIndex];

  if (!isDeleting) typing.textContent = current.slice(0, charIndex++);
  else typing.textContent = current.slice(0, charIndex--);

  let speed = 100;

  if (!isDeleting && charIndex === current.length + 1) {
    speed = 1200;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
  }

  setTimeout(typeEffect, speed);
}
typeEffect();

const sections = document.querySelectorAll(".hidden");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  },
  { threshold: 0.2 },
);

sections.forEach((sec) => observer.observe(sec));

document.querySelectorAll(".fill").forEach((fill) => {
  new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting)
          entry.target.style.width = entry.target.dataset.width;
      });
    },
    { threshold: 0.5 },
  ).observe(fill);
});

const themeToggle = document.getElementById("theme-toggle");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
      themeToggle.textContent = "☀ Light Mode";
    } else {
      themeToggle.textContent = "🌙 Dark Mode";
    }
  });
}

const cursor = document.querySelector(".cursor");

if (cursor) {
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });
}

const tiltCard = document.querySelector(".tilt-card");
tiltCard.addEventListener("mousemove", (e) => {
  const rect = tiltCard.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  tiltCard.style.transform = `rotateX(${-(y - rect.height / 2) / 10}deg) rotateY(${(x - rect.width / 2) / 10}deg)`;
});
tiltCard.addEventListener("mouseleave", () => {
  tiltCard.style.transform = "rotateX(0) rotateY(0)";
});

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3;
    this.speedX = Math.random() - 0.5;
    this.speedY = Math.random() - 0.5;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
  draw() {
    ctx.fillStyle = "#00adb5";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

for (let i = 0; i < 100; i++) particles.push(new Particle());

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}
animate();

window.addEventListener("scroll", () => {
  const header = document.querySelector("header");

  if (window.scrollY > 50) {
    header.style.background = "rgba(0, 0, 0, 0.85)";
    header.style.backdropFilter = "blur(15px)";
  } else {
    header.style.background = "rgba(255, 255, 255, 0.08)";
    header.style.backdropFilter = "blur(12px)";
  }
});

// ===== Dropdown Menu Toggle =====
const menuBtn = document.getElementById("menu-btn");
const dropdown = document.getElementById("dropdown");

menuBtn.addEventListener("click", () => {
  dropdown.classList.toggle("active");
  menuBtn.classList.toggle("active"); // important
});

// Close menu after clicking link
document.querySelectorAll(".dropdown a").forEach((link) => {
  link.addEventListener("click", () => {
    dropdown.classList.remove("active");
    menuBtn.classList.remove("active"); // use remove, not toggle
  });
});
