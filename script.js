// Cards navigation
const cards = document.querySelectorAll('.card');
let currentIndex = 0;
document.getElementById('nextBtn').addEventListener('click', () => {
  cards[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + 1) % cards.length;
  cards[currentIndex].classList.add('active');
});
document.getElementById('prevBtn').addEventListener('click', () => {
  cards[currentIndex].classList.remove('active');
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  cards[currentIndex].classList.add('active');
});

// Card image click animation
document.querySelectorAll('.card-image img').forEach(img => {
  img.addEventListener('click', () => {
    img.classList.add('animate');
    img.addEventListener('animationend', () => {
      img.classList.remove('animate');
    }, { once: true });
  });
});

// Particles background
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 5 + 2;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
    this.color = `rgba(255,255,255,${Math.random()})`;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > canvas.width) this.x = 0;
    if (this.x < 0) this.x = canvas.width;
    if (this.y > canvas.height) this.y = 0;
    if (this.y < 0) this.y = canvas.height;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}
const particlesArray = [];
for(let i=0;i<100;i++) particlesArray.push(new Particle());
function animateParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particlesArray.forEach(p=>{p.update(); p.draw();});
  requestAnimationFrame(animateParticles);
}
animateParticles();
window.addEventListener('resize',()=>{canvas.width=window.innerWidth; canvas.height=window.innerHeight;});

// Flying items dynamic
const flyContainer = document.getElementById('flyContainer');
const popupOverlay = document.getElementById('popupOverlay');
const popupText = document.getElementById('popupText');
const popupImage = document.getElementById('popupImage');
const cancelBtn = document.getElementById('cancelBtn');

function addFlyItem(content){
  const item = document.createElement('div');
  item.classList.add('fly-item');
  item.innerHTML = content; // text or <img>
  item.style.left = Math.random() * window.innerWidth + 'px';
  item.style.top = Math.random() * window.innerHeight + 'px';
  item.speedX = (Math.random() - 0.5) * 2;
  item.speedY = (Math.random() - 0.5) * 2;

  // Boom + popup on click
  item.addEventListener('click', (e)=>{
    e.stopPropagation();
    popupText.innerText = "💥 Boom! তুমি ক্লিক করেছো!";
    if(item.querySelector('img')){
      popupImage.src = item.querySelector('img').src;
      popupImage.style.display = 'block';
    } else {
      popupImage.style.display = 'none';
    }
    popupOverlay.style.display = 'flex';
  });

  flyContainer.appendChild(item);
}

// Default flying items
addFlyItem("💖 Riyad 💖");
addFlyItem("😍 Meghla 😍");
addFlyItem('<img src="./back/fly.png">');
addFlyItem("✨ Extra Text ✨");

// Animate flying items
function animateFlyItems() {
  const flyItems = document.querySelectorAll('.fly-item');
  flyItems.forEach(item => {
    let x = parseFloat(item.style.left);
    let y = parseFloat(item.style.top);
    x += item.speedX;
    y += item.speedY;
    if(x > window.innerWidth) x = 0;
    if(x < 0) x = window.innerWidth;
    if(y > window.innerHeight) y = 0;
    if(y < 0) y = window.innerHeight;
    item.style.left = x + 'px';
    item.style.top = y + 'px';
  });
  requestAnimationFrame(animateFlyItems);
}
animateFlyItems();

// Cancel button resets popup
cancelBtn.addEventListener('click', ()=>{
  popupOverlay.style.display = 'none';
});

// Add flying item from input
document.getElementById('addFlyBtn').addEventListener('click', ()=>{
  const input = document.getElementById('flyInput').value.trim();
  if(!input) return;
  if(input.startsWith("http")) {
    addFlyItem(`<img src="${input}" alt="Flying Image">`);
  } else {
    addFlyItem(input);
  }
  document.getElementById('flyInput').value = "";
});
