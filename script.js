document.addEventListener('DOMContentLoaded', ()=>{

  // ---------- Cards ----------
  const cards = document.querySelectorAll('.card');
  let currentIndex = 0;
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  function showCard(index){
    cards.forEach(c=>c.classList.remove('active'));
    cards[index].classList.add('active');
  }

  nextBtn.addEventListener('click', ()=>{currentIndex=(currentIndex+1)%cards.length; showCard(currentIndex);});
  prevBtn.addEventListener('click', ()=>{currentIndex=(currentIndex-1+cards.length)%cards.length; showCard(currentIndex);});
  showCard(currentIndex);

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

    // Check if content is an image URL
    if(content.match(/\.(jpeg|jpg|gif|png)$/i) || content.startsWith('http')){
      item.innerHTML = `<img src="${content}">`;
    } else {
      item.innerText = content;
    }

    item.style.left = Math.random()*window.innerWidth+'px';
    item.style.top = Math.random()*window.innerHeight+'px';
    item.speedX = (Math.random()-0.5)*2;
    item.speedY = (Math.random()-0.5)*2;

    // Boom + popup on click
    item.addEventListener('click', e=>{
      e.stopPropagation();
      item.classList.add('boom');
      popupText.innerText = "এতই তোমার দেখার ইচ্ছে ! নাও বড় করে দিলাম 💗 " + (item.innerText);
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
  addFlyItem("./back/fly1.png");
  addFlyItem("./back/letter-r.png");
  addFlyItem("😍 I Love You  😍");

  function animateFlyItems(){
    const flyItems = document.querySelectorAll('.fly-item');
    flyItems.forEach(item=>{
      if(!item.classList.contains('boom')){
        let x = parseFloat(item.style.left);
        let y = parseFloat(item.style.top);
        x+=item.speedX; y+=item.speedY;
        if(x>window.innerWidth)x=0; if(x<0)x=window.innerWidth;
        if(y>window.innerHeight)y=0; if(y<0)y=window.innerHeight;
        item.style.left = x+'px'; item.style.top = y+'px';
      }
    });
    requestAnimationFrame(animateFlyItems);
  }
  animateFlyItems();

  cancelBtn.addEventListener('click', ()=>{
    popupOverlay.style.display='none';
    document.querySelectorAll('.fly-item').forEach(item=>item.classList.remove('boom'));
  });

  // Add flying item from input
  flyAddBtn.addEventListener('click', ()=>{
    const val = flyInput.value.trim();
    if(val) addFlyItem(val);
    flyInput.value='';
  });
  flyInput.addEventListener('keypress', e=>{if(e.key==='Enter') flyAddBtn.click();});
});
