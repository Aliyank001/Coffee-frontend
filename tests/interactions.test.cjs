const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const {JSDOM,VirtualConsole}=require('jsdom');
const root=path.resolve(__dirname,'..');
function page(file='index.html',search='',storage={},origin){
 const errors=[],console=new VirtualConsole();console.on('jsdomError',err=>{if(!err.message.includes('navigation to another Document'))errors.push(err.message);});
 const dom=new JSDOM(fs.readFileSync(path.join(root,file),'utf8'),{url:(origin||(file.startsWith('owner-tools/')?'http://127.0.0.1:4175/':'https://cafe.example/'))+file+search,runScripts:'outside-only',virtualConsole:console});const w=dom.window;
 w.matchMedia=()=>({matches:false,addEventListener(){}});
 w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};w.HTMLDialogElement.prototype.close=function(){this.open=false;this.dispatchEvent(new w.Event('close'));};
 w.print=()=>{w.printed=true;};
 for(const [key,value] of Object.entries(storage))w.localStorage.setItem(key,value);
 for(const script of ['vendor/qrcode.js','data.js',file.startsWith('owner-tools/')?'owner-tools/owner-qr.js':'script.js'])w.eval(fs.readFileSync(path.join(root,script),'utf8'));
 return {w,doc:w.document,errors,close:()=>w.close()};
}
const click=(p,selector)=>{const el=p.doc.querySelector(selector);assert.ok(el,'Missing control '+selector);el.click();};
const input=(p,selector,value)=>{const el=p.doc.querySelector(selector);el.value=value;el.dispatchEvent(new p.w.Event('input',{bubbles:true}));};
const change=(p,selector,value)=>{const el=p.doc.querySelector(selector);el.value=value;el.dispatchEvent(new p.w.Event('change',{bubbles:true}));};
const submit=(p,selector)=>p.doc.querySelector(selector).dispatchEvent(new p.w.Event('submit',{bubbles:true,cancelable:true}));
test('menu filters, searches and resets empty state',()=>{const p=page();assert.equal(p.doc.querySelectorAll('.product-card').length,11);click(p,'[data-filter="cold"]');assert.equal(p.doc.querySelectorAll('.product-card').length,5);input(p,'#menu-search','no-such-coffee');assert.equal(p.doc.querySelectorAll('.product-card').length,0);assert.equal(p.doc.querySelector('#menu-empty').hidden,false);click(p,'#reset-search');assert.equal(p.doc.querySelectorAll('.product-card').length,11);assert.deepEqual(p.errors,[]);p.close();});
test('bag supports quantities, removal, persistence and an empty checkout',()=>{const p=page();assert.equal(p.doc.querySelector('#checkout').disabled,true);click(p,'[data-add="caramel"]');click(p,'[data-add="caramel"]');click(p,'[data-cart]');assert.equal(p.doc.querySelector('#cart-dialog').open,true);assert.match(p.doc.querySelector('#cart-totals').textContent,/1,365/);click(p,'[data-qty="caramel"][data-delta="-1"]');assert.equal(JSON.parse(p.w.localStorage.getItem('aroma.v2.cart'))[0].qty,1);click(p,'[data-remove="caramel"]');assert.equal(p.doc.querySelector('#checkout').disabled,true);assert.equal(p.doc.querySelector('[data-count]').textContent,'0');click(p,'[data-close-cart]');assert.equal(p.doc.querySelector('#cart-dialog').open,false);assert.deepEqual(p.errors,[]);p.close();});
test('table QR context is carried into an order and receipt; duplicate checkout is blocked',()=>{const p=page('index.html','?table=7#menu');assert.equal(p.doc.querySelector('#table').value,'7');click(p,'[data-add="caramel"]');click(p,'[data-add="croissant"]');input(p,'#order-notes','<script>bad()</script>');click(p,'#checkout');click(p,'#checkout');const records=JSON.parse(p.w.localStorage.getItem('aroma.v2.orders'));assert.equal(records.length,1);assert.equal(records[0].table,7);assert.equal(records[0].total,1124);assert.equal(p.w.localStorage.getItem('aroma.v2.cart'),'[]');const b=page('billing.html','?order='+records[0].id,{'aroma.v2.orders':JSON.stringify(records)});assert.match(b.doc.querySelector('.receipt').textContent,/Table 7/);assert.match(b.doc.querySelector('.receipt-note').textContent,/<script>bad\(\)<\/script>/);assert.equal(b.doc.querySelector('.receipt script'),null);assert.ok(b.doc.querySelector('#receipt-qr svg'));assert.equal(b.doc.querySelector('#print-receipt').disabled,false);click(b,'#print-receipt');assert.equal(b.w.printed,true);assert.deepEqual(b.errors,[]);p.close();b.close();});
test('cart restores after reload and takeaway hides table requirement',()=>{const p=page('index.html','',{'aroma.v2.cart':JSON.stringify([{id:'vanilla',qty:3}])});assert.equal(p.doc.querySelector('[data-count]').textContent,'3');change(p,'#service','takeaway');assert.equal(p.doc.querySelector('#table-label').hidden,true);assert.equal(p.doc.querySelector('#table').required,false);click(p,'#checkout');const order=JSON.parse(p.w.localStorage.getItem('aroma.v2.orders'))[0];assert.equal(order.table,null);assert.equal(order.service,'takeaway');p.close();});
test('QR studio generates table SVGs and disables exports for unapplied changes',()=>{const p=page('owner-tools/qr.html');assert.ok(p.doc.querySelector('#studio-qr svg'));change(p,'#qr-type','table');input(p,'#qr-table','9');assert.equal(p.doc.querySelector('#download-qr').disabled,true);input(p,'#site-url','https://mycafe.example/cafe/');submit(p,'#qr-form');assert.equal(p.doc.querySelector('#test-qr').href,'https://mycafe.example/cafe/?table=9#menu');assert.match(p.doc.querySelector('#qr-caption').textContent,/TABLE 9/);assert.equal(p.doc.querySelector('#download-qr').disabled,false);input(p,'#qr-table','100');submit(p,'#qr-form');assert.equal(p.doc.querySelector('#download-qr').disabled,true);assert.match(p.doc.querySelector('#qr-status').textContent,/1 to 99/);assert.deepEqual(p.errors,[]);p.close();});
test('missing order shows empty state and sample receipt does not enter history',()=>{const p=page('billing.html','?order=AR-MISSING');assert.match(p.doc.querySelector('#billing-status').textContent,/not found/);assert.equal(p.doc.querySelector('#print-receipt').disabled,true);click(p,'#load-sample');assert.match(p.doc.querySelector('.receipt').textContent,/SAMPLE/);assert.equal(p.w.localStorage.getItem('aroma.v2.orders'),null);assert.ok(p.doc.querySelector('#receipt-qr svg'));assert.deepEqual(p.errors,[]);p.close();});
test('malformed browser data does not crash menu or billing',()=>{for(const file of ['index.html','billing.html']){const p=page(file,'',{'aroma.v2.cart':'{bad','aroma.v2.orders':'{}','aroma.v2.preferences':'null','aroma.v2.site-url':'"javascript:evil()"'});assert.deepEqual(p.errors,[]);assert.equal(p.doc.querySelectorAll('h1').length,1);p.close();}});
test('contact demo saves locally and makes no sent-message claim',()=>{const p=page();input(p,'#contact-form [name="name"]','Demo Guest');input(p,'#contact-form [name="email"]','guest@example.com');input(p,'#contact-form [name="message"]','A very thoughtful coffee experience.');submit(p,'#contact-form');assert.equal(JSON.parse(p.w.localStorage.getItem('aroma.v2.messages')).length,1);assert.match(p.doc.querySelector('#contact-status').textContent,/has not been emailed/);assert.deepEqual(p.errors,[]);p.close();});

test('reference hero switches flavours, pauses rotation and orders the selected drink',()=>{
 const p=page();
 click(p,'[data-feature="2"]');
 assert.equal(p.doc.querySelector('.flavour-scene').dataset.flavour,'matcha');
 assert.match(p.doc.querySelector('#featured-title').textContent,/Matcha/);
 assert.equal(p.doc.querySelector('#featured-order').dataset.add,'matcha');
 assert.equal(p.doc.querySelector('#motion-toggle').getAttribute('aria-pressed'),'true');
 click(p,'#featured-order');
 assert.equal(p.doc.querySelector('#cart-dialog').open,true);
 const items=JSON.parse(p.w.localStorage.getItem('aroma.v2.cart'));
 assert.deepEqual(items,[{id:'matcha',qty:1}]);
 assert.ok(p.doc.querySelector('.cart-sprite .drink-art'));
 click(p,'[data-close-cart]');
 p.doc.querySelector('[data-feature="2"]').dispatchEvent(new p.w.KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true}));
 assert.equal(p.doc.querySelector('.flavour-scene').dataset.flavour,'citrus');
 assert.equal(p.doc.querySelector('#featured-order').dataset.add,'citrus');
 assert.deepEqual(p.errors,[]);p.close();
});

test('customers never see creator controls and legacy owner configuration cannot change receipt destination',()=>{
 const p=page('index.html','?table=5#menu',{'aroma.v2.site-url':'"https://wrong.example/"'});
 assert.equal(p.doc.querySelector('[href*="qr.html"]'),null);
 assert.equal(p.doc.querySelector('.digital-section'),null);
 assert.equal(p.doc.querySelector('#qr-form'),null);
 click(p,'[data-add="caramel"]');click(p,'#checkout');
 const order=JSON.parse(p.w.localStorage.getItem('aroma.v2.orders'))[0];
 assert.equal(order.menuBase,'https://cafe.example/index.html');assert.equal(order.table,5);
 assert.deepEqual(p.errors,[]);p.close();
});
test('owner tool refuses to run on a public hostname',()=>{
 const p=page('owner-tools/qr.html','',{},'https://public.example/');
 assert.match(p.doc.querySelector('main').textContent,/local only/);
 assert.equal(p.doc.querySelector('#qr-form'),null);
 assert.deepEqual(p.errors,[]);p.close();
});
