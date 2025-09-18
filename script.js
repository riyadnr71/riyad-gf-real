// ---------- Cards Navigation ----------
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

// ---------- Particles ----------
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random()*5 + 2;
    this.speedX = Math.random()*2 -1;
    this.speedY = Math.random()*2 -1;
    this.color = `rgba(255,255,255,${Math.random()})`;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if(this.x>canvas.width) this.x=0;
    if(this.x<0) this.x=canvas.width;
    if(this.y>canvas.height) this.y=0;
    if(this.y<0) this.y=canvas.height;
  }
  draw(){
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
    ctx.fillStyle=this.color;
    ctx.fill();
  }
}

const particlesArray=[];
for(let i=0;i<100;i++) particlesArray.push(new Particle());
function animateParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particlesArray.forEach(p=>{p.update(); p.draw();});
  requestAnimationFrame(animateParticles);
}
animateParticles();
window.addEventListener('resize',()=>{canvas.width=window.innerWidth; canvas.height=window.innerHeight;});

// ---------- Flying Items ----------
const flyContainer = document.getElementById('flyContainer');
const popupOverlay = document.getElementById('popupOverlay');
const popupText = document.getElementById('popupText');
const popupImage = document.getElementById('popupImage');
const cancelBtn = document.getElementById('cancelBtn');
const flyInput = document.getElementById('flyInput');
const flyAddBtn = document.getElementById('flyAddBtn');

function addFlyItem(content){
  const item = document.createElement('div');
  item.classList.add('fly-item');

  // Detect if it's image URL
  if(content.match(/\.(jpeg|jpg|gif|png)$/i)){
    item.innerHTML = `<img src="${content}">`;
  } else {
    item.innerText = content;
  }

  item.style.left = Math.random() * window.innerWidth + 'px';
  item.style.top = Math.random() * window.innerHeight + 'px';
  item.speedX = (Math.random() -0.5)*2;
  item.speedY = (Math.random() -0.5)*2;

  item.addEventListener('click', e=>{
    e.stopPropagation();
    item.classList.add('boom');
    popupText.innerText = "কি সুন্দর উঠতিছিলো। দিলা তো নষ্ট করে!";
    if(item.querySelector('img')){
      popupImage.src = item.querySelector('img').src;
      popupImage.style.display='block';
    } else {
      popupImage.style.display='none';
    }
    popupOverlay.style.display='flex';
  });

  flyContainer.appendChild(item);
}

// Default flying items
addFlyItem("💖 Riyad 💖");
addFlyItem("😍 Meghla 😍");
addFlyItem("✨ Riyad+Meghla ✨");
addFlyItem('./back/tools.png');
addFlyItem('./back/letter-r.png');
addFlyItem('./back/rm.png');
addFlyItem('./back/fly1.png');


// Animate flying
function animateFlyItems(){
  const flyItems=document.querySelectorAll('.fly-item');
  flyItems.forEach(item=>{
    if(!item.classList.contains('boom')){
      let x=parseFloat(item.style.left);
      let y=parseFloat(item.style.top);
      x+=item.speedX;
      y+=item.speedY;
      if(x>window.innerWidth) x=0;
      if(x<0) x=window.innerWidth;
      if(y>window.innerHeight) y=0;
      if(y<0) y=window.innerHeight;
      item.style.left=x+'px';
      item.style.top=y+'px';
    }
  });
  requestAnimationFrame(animateFlyItems);
}
animateFlyItems();

// Cancel popup
cancelBtn.addEventListener('click', ()=>{
  popupOverlay.style.display='none';
  const flyItems=document.querySelectorAll('.fly-item');
  flyItems.forEach(item=>item.classList.remove('boom'));
});

// Add flying from input
flyAddBtn.addEventListener('click', ()=>{
  const val=flyInput.value.trim();
  if(val) addFlyItem(val);
  flyInput.value='';
});
flyInput.addEventListener('keypress', e=>{
  if(e.key==='Enter') flyAddBtn.click();
});
