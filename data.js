/* Café website menu. Edit product names, prices and descriptions here. */
(function(root){
  'use strict';
  const products = [
    { id:'caramel',name:'Caramel Cloud Latte',category:'hot',price:650,image:'latte',tag:'THE HOUSE FAVOURITE',description:'Silky espresso, steamed milk, a golden caramel finish.' },
    { id:'cappuccino',name:'Classic Cappuccino',category:'hot',price:550,image:'cappuccino',tag:'A DAILY RITUAL',description:'A rich double shot under a cloud of velvety milk.' },
    { id:'vanilla',name:'Iced Vanilla Latte',category:'cold',price:680,image:'drink-flight',sprite:0,tag:'COOL & COMFORTING',description:'Espresso, real vanilla and cold milk over ice.' },
    { id:'croissant',name:'Butter Croissant',category:'bakery',price:420,image:'croissant',tag:'FRESH FROM THE OVEN',description:'Golden layers, a buttery centre. Your coffee’s plus one.' },
    { id:'espresso',name:'Double Espresso',category:'hot',price:380,image:'espresso',tag:'SMALL BUT MIGHTY',description:'Deep cocoa notes. A bright finish. Pure coffee.' },
    { id:'coldbrew',name:'Slow-Steeped Cold Brew',category:'cold',price:590,image:'coldbrew',tag:'TAKE IT SLOW',description:'Steeped for 16 hours for a smooth, mellow sip.' },
    { id:'brownie',name:'Dark Chocolate Brownie',category:'dessert',price:480,image:'brownie',tag:'A LITTLE INDULGENCE',description:'Fudgy dark chocolate with a delicate crackled top.' },
    { id:'darkmocha',name:'Iced Dark Cocoa',category:'cold',price:740,image:'drink-flight',sprite:1,tag:'DEEP. DARK. DELICIOUS.',description:'Dark cocoa, espresso and cold milk. Finished with chocolate cream.' },
    { id:'matcha',name:'Ceremonial Iced Matcha',category:'cold',price:790,image:'drink-flight',sprite:2,tag:'A GREENER KIND OF RITUAL',description:'Stone-ground matcha layered over milk and crystal-clear ice.' },
    { id:'citrus',name:'Sparkling Citrus Tea',category:'cold',price:620,image:'drink-flight',sprite:3,tag:'A LITTLE SUNSHINE',description:'Amber tea, fresh orange and a bright sparkle, served over ice.' },
    { id:'cake',name:'The Celebration Slice',category:'dessert',price:720,image:'cake',tag:'SAVE ROOM',description:'Soft layers, light frosting and a moment worth sharing.' }
  ];
  const labels={hot:'HOT COFFEE',cold:'ON ICE',bakery:'FRESH BAKES',dessert:'SOMETHING SWEET'};
  const money=value=>'Rs. '+Number(value).toLocaleString('en-PK');
  const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const api={products,labels,money,escape};
  root.Aroma=api;
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
