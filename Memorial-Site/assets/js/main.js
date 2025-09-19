// assets/js/main.js
document.addEventListener('DOMContentLoaded', function() {

  // --- Hero background loader (use data-bg attribute + cache-bust)
  document.querySelectorAll('.hero[data-bg]').forEach(function(el){
    var bg = el.dataset.bg || el.getAttribute('data-bg');
    if(bg){
      // add timestamp query to force fresh load when you replace images
      el.style.backgroundImage = 'url("' + bg + '?v=' + Date.now() + '")';
    }
  });

  // --- Core values reveal (IntersectionObserver)
  var observer = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        e.target.classList.add('in-view');
      }
    });
  }, {threshold: 0.25});

  document.querySelectorAll('.value').forEach(function(v){
    observer.observe(v);
  });

  // CSS animation class (simple fade in) via style injection if desired
  var style = document.createElement('style');
  style.textContent = '.value.in-view{animation: fadeUp .7s ease forwards; opacity:1; transform:none} .value{opacity:0; transform:translateY(8px)} @keyframes fadeUp{from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none}}';
  document.head.appendChild(style);

  // --- Gallery arrow buttons (if present)
  document.querySelectorAll('.gallery-controls').forEach(function(ctrl){
    var wrap = ctrl.previousElementSibling; // gallery-scroll sibling
    if(!wrap || !wrap.classList.contains('gallery-scroll')) return;
    var btnLeft = ctrl.querySelector('.g-left');
    var btnRight = ctrl.querySelector('.g-right');
    btnLeft && btnLeft.addEventListener('click', function(){ wrap.scrollBy({left:-260, behavior:'smooth'}); });
    btnRight && btnRight.addEventListener('click', function(){ wrap.scrollBy({left:260, behavior:'smooth'}); });
  });

  // --- Floating buttons visibility: hide on homepage if body has class 'is-home'
  var isHome = document.body.classList.contains('is-home');
  if(isHome){
    var floats = document.querySelectorAll('.floating-buttons, .back-fab');
    floats.forEach(function(f){ f.style.display = 'none'; });
  }

  // --- Smooth anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(e){
      var target = document.querySelector(a.getAttribute('href'));
      if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth', block:'start'}); }
    });
  });

});
