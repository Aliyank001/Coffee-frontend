 'use strict';
(() => {
  const A=window.Aroma,$=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],e=A.escape;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  function visual(p,detail=false){
    if(Number.isInteger(p.sprite))return `<div class="product-sprite"><span class="drink-art" style="--drink-position:${p.sprite*100/3}%" role="img" aria-label="${e(p.name)}"></span></div>`;
    return `<img src="assets/${p.image}.webp" srcset="assets/${p.image}-360.webp 360w, assets/${p.image}.webp 600w" sizes="${detail?'(max-width:480px) calc(100vw - 56px), 320px':'(max-width:480px) 43vw, (max-width:800px) 43vw, (max-width:1100px) 28vw, 22vw'}" alt="${e(p.name)}" loading="lazy" decoding="async" width="${p.imageWidth}" height="${p.imageHeight}">`;
  }
  $$('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
  const menuToggle=$('.menu-toggle'),mobile=$('#mobile-menu');
  function closeNav(focus=false){if(!mobile)return;mobile.hidden=true;menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Open navigation');if(focus)menuToggle.focus();}
  menuToggle?.addEventListener('click',()=>{const open=mobile.hidden;mobile.hidden=!open;menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');if(open)mobile.querySelector('a').focus();});
  mobile?.addEventListener('click',event=>{if(event.target.closest('a'))closeNav();});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&mobile&&!mobile.hidden)closeNav(true);});
  document.addEventListener('click',event=>{if(mobile&&!mobile.hidden&&!mobile.contains(event.target)&&!menuToggle.contains(event.target))closeNav();});
  window.matchMedia('(min-width:801px)').addEventListener('change',event=>{if(event.matches)closeNav();});
  if('IntersectionObserver' in window){const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');io.unobserve(entry.target);}}),{threshold:.08});$$('.reveal').forEach(el=>io.observe(el));document.documentElement.classList.add('js-motion');const sections=$$('section[id]');const navIO=new IntersectionObserver(entries=>{for(const entry of entries)if(entry.isIntersecting){$$('.site-header nav a[href^="#"]').forEach(a=>{if(a.hash==='#'+entry.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}},{rootMargin:'-15% 0px -60% 0px'});sections.forEach(s=>navIO.observe(s));}


  let filter='all';
  function renderProducts(){
    const query=$('#menu-search').value.trim().toLowerCase();
    const products=A.products.filter(p=>(filter==='all'||p.category===filter)&&`${p.name} ${p.description} ${A.labels[p.category]}`.toLowerCase().includes(query));
    $('#product-grid').innerHTML=products.map((p,index)=>`<article class="product-card" style="animation-delay:${Math.min(index,5)*45}ms"><div class="product-image">${visual(p)}<span class="product-tag">${e(p.tag)}</span></div><p class="product-category">${A.labels[p.category]}</p><h3>${e(p.name)}</h3><p>${e(p.description)}</p><div class="product-bottom"><strong>${A.money(p.price)}</strong><button class="menu-details-button" data-view="${p.id}" aria-label="View ${e(p.name)} details">Details ↗</button></div></article>`).join('');
    $('#menu-empty').hidden=products.length>0;
    $('#menu-results').textContent=`${products.length} ${products.length===1?'favourite':'favourites'} to make your day`;
  }
  $$('[data-filter]').forEach(button=>button.addEventListener('click',()=>{filter=button.dataset.filter;$$('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});renderProducts();}));
  $$('[data-menu-category]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();$('#menu-search').value='';const button=$('[data-filter="'+link.dataset.menuCategory+'"]');button.click();$('#menu-list').scrollIntoView({behavior:reduced.matches?'auto':'smooth',block:'start'});button.focus({preventScroll:true});}));
  $('#menu-search').addEventListener('input',renderProducts);
  $('#reset-search').addEventListener('click',()=>{$('#menu-search').value='';$('[data-filter="all"]').click();$('#menu-search').focus();});
  $('#roast-filter').addEventListener('click',()=>{$('#menu-search').value='';$('[data-filter="hot"]').click();$('#menu-list').scrollIntoView({behavior:reduced.matches?'auto':'smooth',block:'start'});$('[data-filter="hot"]').focus({preventScroll:true});});
  const details=$('#menu-detail'),gallery=$('#gallery-dialog');let detailOpener;
  document.addEventListener('click',event=>{const button=event.target.closest('[data-view]');if(!button)return;const p=A.products.find(p=>p.id===button.dataset.view);if(!p)return;detailOpener=button;$('#detail-image').innerHTML=visual(p,true);$('#detail-category').textContent=A.labels[p.category];$('#detail-title').textContent=p.name;$('#detail-description').textContent=p.description;$('#detail-price').textContent=A.money(p.price);details.showModal();document.body.style.overflow='hidden';});
  $('#close-detail').addEventListener('click',()=>details.close());
  $('#detail-back').addEventListener('click',()=>details.close());
  details.addEventListener('close',()=>{document.body.style.overflow='';detailOpener?.focus();});
  [details,gallery].forEach(dialog=>dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}));
  $('#view-space').addEventListener('click',()=>{const image=$('#gallery-image');if(!image.getAttribute('src'))image.src=image.dataset.src;gallery.showModal();document.body.style.overflow='hidden';});
  $('#close-gallery').addEventListener('click',()=>gallery.close());
  gallery.addEventListener('close',()=>{document.body.style.overflow='';$('#view-space').focus();});
  renderProducts();
    const scene=$('.flavour-scene');
    if(scene){
      const flavours=[
        {id:'vanilla',theme:'latte',word:'Double Espresso',title:'Iced Latte',subtitle:'& Double Espresso',description:'Two shots of house espresso poured over chilled milk and crystal-clear ice. Silky, balanced, and gently sweet.',alt:'Iced latte with espresso, ice and cream'},
        {id:'darkmocha',theme:'cocoa',word:'Dark Cocoa',title:'Iced Chocolate',subtitle:'& Dark Cocoa',description:'Deep cocoa folded into cold milk and espresso, finished with chocolate cream. Rich, smooth, and a little indulgent.',alt:'Iced dark chocolate mocha with cocoa cream'},
        {id:'matcha',theme:'matcha',word:'Ceremonial Matcha',title:'Iced Matcha',subtitle:'& Ceremonial Green',description:'Stone-ground ceremonial matcha whisked into a rich, creamy green and layered over milk and ice. A softer kind of energy.',alt:'Green ceremonial matcha over milk and ice'},
        {id:'citrus',theme:'citrus',word:'Golden Citrus',title:'Sparkling Citrus',subtitle:'& Golden Hour',description:'Sun-ripened orange, freshly brewed amber tea, and a little sparkle. Bright, refreshing, and made for your slow afternoons.',alt:'Sparkling orange iced tea with fresh citrus and mint'}
      ];
      const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
      let selected=0,paused=reduced.matches,rotation,transitionTimer,frame;
      function pauseUI(){scene.dataset.paused=String(paused);const toggle=$('#motion-toggle');toggle.setAttribute('aria-pressed',String(paused));toggle.setAttribute('aria-label',paused?'Play automatic drink rotation':'Pause automatic drink rotation');toggle.innerHTML=paused?'▷ <span>Play</span>':'Ⅱ <span>Pause</span>';}
      function selectFlavour(index,manual=false){
        selected=(index+flavours.length)%flavours.length;const f=flavours[selected],product=A.products.find(p=>p.id===f.id);
        if(manual){paused=true;pauseUI();}
        scene.classList.remove('scene-changing');void scene.offsetWidth;scene.classList.add('scene-changing');
        scene.dataset.flavour=f.theme;$('#scene-word').textContent=f.word;
        $('#featured-title').innerHTML=e(f.title)+'<br><span>'+e(f.subtitle)+'</span>';
        $('#featured-description').textContent=f.description;$('#featured-price').textContent=A.money(product.price);
        $('#featured-detail').disabled=false;$('#featured-detail').dataset.view=f.id;$('#featured-detail').setAttribute('aria-label','View '+product.name);
        $('#featured-art').style.setProperty('--drink-position',(selected*100/3)+'%');$('#featured-art').setAttribute('aria-label',f.alt);
        $('#feature-counter').innerHTML=String(selected+1).padStart(2,'0')+' <span>/ 04</span>';
        $$('[data-feature]').forEach(b=>{const active=Number(b.dataset.feature)===selected;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
        clearTimeout(transitionTimer);transitionTimer=setTimeout(()=>scene.classList.remove('scene-changing'),850);
      }
      $$('[data-feature]').forEach(b=>b.addEventListener('click',()=>selectFlavour(Number(b.dataset.feature),true)));
      $('.flavour-picker').addEventListener('keydown',event=>{if(!['ArrowRight','ArrowLeft','Home','End'].includes(event.key))return;event.preventDefault();const index=event.key==='Home'?0:event.key==='End'?3:selected+(event.key==='ArrowRight'?1:-1);selectFlavour(index,true);$('[data-feature="'+selected+'"]').focus();});
      $('#motion-toggle').addEventListener('click',()=>{paused=!paused;pauseUI();});
      reduced.addEventListener('change',event=>{if(event.matches){paused=true;pauseUI();}});
      rotation=setInterval(()=>{if(!paused&&!document.hidden&&!details.open&&!gallery.open&&scene.getBoundingClientRect().bottom>0)selectFlavour(selected+1);},7000);
      if(window.matchMedia('(pointer:fine)').matches&&!reduced.matches){scene.addEventListener('pointermove',event=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{const rect=scene.getBoundingClientRect();scene.style.setProperty('--pointer-x',((event.clientX-rect.left)/rect.width-.5)*12+'px');scene.style.setProperty('--pointer-y',((event.clientY-rect.top)/rect.height-.5)*8+'px');});});scene.addEventListener('pointerleave',()=>{scene.style.setProperty('--pointer-x','0px');scene.style.setProperty('--pointer-y','0px');});}
      selectFlavour(0);pauseUI();
    }

  // Bean visual: assets/coffee-bean.webp; built-in image generation, then WebP compression.
  // Generation prompt: One single photorealistic roasted espresso coffee bean, isolated on a truly transparent alpha background. Entire bean visible, portrait oval shape, view from slightly above so the deep naturally curved central seam and one side are visible, rich warm dark brown roasted surface, small tactile pores, realistic curved ridges, beautiful warm caramel highlights from upper left and soft dark shading toward lower right. Macro luxury coffee product photography. Bean centered, fills 80 percent of the canvas with clear transparent margins, no shadow outside the bean, no ground plane, no text, no logo, no other beans, no extra props, no background. This is a small transparent cutout asset for a floating and spinning coffee-bean animation on a warm beige cafe webpage.
  // Layered coffee-showcase motion, local to the featured roast panel.
  const roast=$('.roast-spotlight'),roastToggle=$('#roast-motion-toggle');
  if(roast&&roastToggle){
    let inView=!('IntersectionObserver' in window),userPaused=false,pointerFrame;
    function updateRoastMotion(){
      const playing=inView&&!document.hidden&&!reduced.matches&&!userPaused&&!details.open&&!gallery.open;
      roast.dataset.animating=String(playing);
      roastToggle.disabled=reduced.matches;
      roastToggle.setAttribute('aria-pressed',String(userPaused||reduced.matches));
      roastToggle.setAttribute('aria-label',reduced.matches?'Coffee showcase motion disabled by your device preference':userPaused?'Play coffee showcase animation':'Pause coffee showcase animation');
      roastToggle.innerHTML='<span aria-hidden="true">'+(reduced.matches?'—':userPaused?'▷':'Ⅱ')+'</span>';
    }
    roastToggle.hidden=false;
    roastToggle.addEventListener('click',()=>{userPaused=!userPaused;updateRoastMotion();});
    if('IntersectionObserver' in window){const roastObserver=new IntersectionObserver(entries=>{inView=entries[0].isIntersecting;updateRoastMotion();},{threshold:.12});roastObserver.observe(roast);}
    document.addEventListener('visibilitychange',updateRoastMotion);
    reduced.addEventListener('change',updateRoastMotion);
    details.addEventListener('close',updateRoastMotion);gallery.addEventListener('close',updateRoastMotion);
    document.addEventListener('click',updateRoastMotion);
    if(window.matchMedia('(pointer:fine)').matches){
      roast.addEventListener('pointermove',event=>{if(reduced.matches||userPaused)return;cancelAnimationFrame(pointerFrame);pointerFrame=requestAnimationFrame(()=>{const rect=roast.getBoundingClientRect();roast.style.setProperty('--roast-tilt-x',((event.clientY-rect.top)/rect.height-.5)*-6+'deg');roast.style.setProperty('--roast-tilt-y',((event.clientX-rect.left)/rect.width-.5)*8+'deg');});});
      roast.addEventListener('pointerleave',()=>{cancelAnimationFrame(pointerFrame);roast.style.setProperty('--roast-tilt-x','0deg');roast.style.setProperty('--roast-tilt-y','0deg');});
    }
    updateRoastMotion();
  }
})();
