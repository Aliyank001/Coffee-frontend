const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const A=require('../data.js');
test('billing uses integer PKR and rounds the illustrative tax once',()=>{
 assert.deepEqual(A.totals([{id:'caramel',qty:2},{id:'croissant',qty:1}]),{subtotal:1720,tax:86,total:1806});
 assert.deepEqual(A.totals([]),{subtotal:0,tax:0,total:0});
 assert.deepEqual(A.totals([{id:'coldbrew',qty:1}]),{subtotal:590,tax:30,total:620});
});
test('cart restores only catalog items and bounds quantities',()=>{
 assert.deepEqual(A.cleanCart([{id:'caramel',qty:18},{id:'caramel',qty:8},{id:'unknown',qty:2},{id:'cake',qty:-1},null,{id:'vanilla',qty:'2'}]),[{id:'caramel',qty:20}]);
 assert.deepEqual(A.cleanCart({}),[]);
});
test('menu URL preserves subdirectory, removes old queries and carries table',()=>{
 assert.equal(A.menuUrl('https://example.com/cafe/index.html?order=secret#old',7),'https://example.com/cafe/index.html?table=7#menu');
 assert.equal(A.menuUrl('https://example.com/cafe/'),'https://example.com/cafe/#menu');
 assert.throws(()=>A.menuUrl('javascript:alert(1)'));
 assert.throws(()=>A.menuUrl('https://user:pass@example.com'));
 for(const value of [0,100,1.5,'abc'])assert.throws(()=>A.menuUrl('https://example.com',value));
});
test('reservation preferences reject past times, off-slot times and impossible dates',()=>{
 const now=new Date(2026,10,11,12,0);
 assert.match(A.reservationError('2026-11-11','11:00',now),/future/);
 assert.equal(A.reservationError('2026-11-12','07:30',now),'');
 assert.equal(A.reservationError('2026-11-12','21:30',now),'');
 assert.match(A.reservationError('2026-11-12','13:15',now),/half-hour/);
 assert.match(A.reservationError('2027-02-30','13:00',now),/valid/);
 assert.match(A.reservationError('2027-06-10','13:00',now),/90 days/);
 assert.equal(A.reservationError('2026-11-12','13:00',now),'');
 assert.equal(A.reservationError('2026-11-14','22:00',now),'');
});
test('order validation detects tampered totals',()=>{
 const order={id:'AR-TEST',createdAt:'2026-11-11T08:00:00Z',service:'dine-in',table:3,payment:'counter',items:[{id:'caramel',name:'Latte',price:650,qty:1}],subtotal:650,tax:33,total:683};
 assert.equal(A.validOrder(order),true);
 assert.equal(A.validOrder({...order,total:1}),false);
 assert.equal(A.validOrder({...order,items:[{price:650,qty:-2}]}),false);
});
test('user text is escaped before entering receipt markup',()=>{
 assert.equal(A.escape('<img src=x onerror="alert(1)">'), '&lt;img src=x onerror=&quot;alert(1)&quot;&gt;');
});
test('vendored QR generator produces a real scalable QR with quiet zone',()=>{
 const context={};vm.createContext(context);vm.runInContext(fs.readFileSync(path.join(__dirname,'../vendor/qrcode.js'),'utf8'),context);
 for(const url of ['https://example.com/#menu','https://example.com/index.html?table=99#menu']){
  const qr=context.qrcode(0,'M');qr.addData(url,'Byte');qr.make();assert.ok(qr.getModuleCount()>=21);const svg=qr.createSvgTag({cellSize:5,margin:20,scalable:true});assert.match(svg,/<svg/);assert.match(svg,/viewBox/);assert.match(svg,/<path/);
 }
});
test('every local HTML asset and link resolves, with no placeholder links or duplicate IDs',()=>{
 const root=path.resolve(__dirname,'..');
 for(const file of ['index.html','owner-tools/qr.html','billing.html']){
  const html=fs.readFileSync(path.join(root,file),'utf8'),ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length,file+' duplicate IDs');assert.equal((html.match(/<h1\b/g)||[]).length,1,file+' primary heading');
  for(const [,url] of html.matchAll(/(?:src|href)="([^"]+)"/g)){
   assert.notEqual(url,'#',file+' placeholder link');if(/^(https?:|data:|mailto:|tel:)/.test(url))continue;
   const [target,fragment]=url.split('#'),targetFile=target?path.resolve(root,path.dirname(file),target):path.resolve(root,file);assert.ok(fs.existsSync(targetFile),`${file}: missing ${targetFile}`);
   if(fragment){const targetHTML=fs.readFileSync(targetFile,'utf8');assert.ok(targetHTML.includes(`id="${fragment}"`),`${file}: missing anchor ${url}`);}
  }
 }
 for(const p of A.products)assert.ok(fs.statSync(path.join(root,'assets',p.image+(Number.isInteger(p.sprite)?'.png':'.jpg'))).size>1000);
});

test('public build removes legacy QR page and excludes owner controls',()=>{
 const root=path.resolve(__dirname,'..'),out=path.join(root,'dist');
 fs.mkdirSync(out,{recursive:true});fs.writeFileSync(path.join(out,'qr.html'),'legacy generator');
 require('node:child_process').execFileSync(process.execPath,[path.join(root,'tools/build.cjs')]);
 assert.equal(fs.existsSync(path.join(out,'qr.html')),false);
 assert.equal(fs.existsSync(path.join(out,'owner-tools')),false);
 for(const file of ['index.html','billing.html','script.js']){
  const source=fs.readFileSync(path.join(out,file),'utf8');
  assert.doesNotMatch(source,/qr-form|QR studio|qr[.]html|owner-tools|digital-section/i,file+' leaked owner controls');
 }
 assert.ok(fs.existsSync(path.join(out,'robots.txt')));
 assert.match(fs.readFileSync(path.join(root,'owner-tools/qr.html'),'utf8'),/noindex,nofollow,noarchive/);
});
