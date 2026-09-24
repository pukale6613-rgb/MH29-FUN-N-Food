const menu=document.querySelector('.menu-toggle');const links=document.querySelector('.nav-links');menu.addEventListener('click',()=>links.classList.toggle('open'));document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));document.getElementById('year').textContent=new Date().getFullYear();

/* MH29 live cinema listing */
(async function(){
  const list=document.getElementById('movie-list'), status=document.getElementById('movie-status'), badge=document.getElementById('movie-updated');
  if(!list||!status) return;
  const fallback=[
    {title:'Manjar',language:'Marathi'},{title:'Daayra',language:'Hindi'},
    {title:'Mirzapur: The Movie',language:'Hindi'},{title:'Hanuman Ansh',language:'Hindi'},
    {title:'VIBE',language:'Hindi'},{title:'Resident Evil',language:'Hindi'}
  ];
  try{
    const r=await fetch((window.MH29_CINEMA&&window.MH29_CINEMA.dataUrl)||'cinema-data.json',{cache:'no-store'});
    if(!r.ok) throw new Error('feed unavailable');
    const data=await r.json(); render(data.movies||fallback,data.updatedAt);
  }catch(e){render(fallback,null);status.textContent='Showing the latest saved listings. BookMyShow has the live showtimes and seat availability.';badge.textContent='Saved listing';}
  function render(movies,updatedAt){
    list.innerHTML=movies.map(m=>`<article class="movie-item"><div class="movie-icon">🎬</div><div><h4>${escapeHtml(m.title)}</h4><span>${escapeHtml(m.language||'Movie')}${m.showtimes&&m.showtimes.length?' · '+m.showtimes.join(' · '):''}</span></div></article>`).join('');
    if(updatedAt){const d=new Date(updatedAt);badge.textContent='Updated '+d.toLocaleDateString(undefined,{day:'numeric',month:'short'})+' '+d.toLocaleTimeString(undefined,{hour:'numeric',minute:'2-digit'});status.textContent=`${movies.length} current / recent titles.`;}
    else status.textContent=`${movies.length} current / recent titles listed.`;
  }
  function escapeHtml(v){return String(v).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;');}
})();
