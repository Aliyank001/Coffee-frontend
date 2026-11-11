const {test}=require('node:test'),assert=require('node:assert/strict');
const vm=require('node:vm'),fs=require('node:fs'),path=require('node:path');
const {PassThrough}=require('node:stream');
function fixture(){
 let handler,binding;const server={on(){return server;},listen(port,host){binding={port,host};return server;}};
 vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../tools/owner-server.cjs'),'utf8'),{
  require:name=>name==='node:http'?{createServer:fn=>{handler=fn;return server;}}:require(name),
  __dirname:path.resolve(__dirname,'../tools'),URL,console,process:{exitCode:0}
 });
 async function request(url,host='127.0.0.1:4175',method='GET'){
  const res=new PassThrough(),headers={};let body='';res.statusCode=200;res.setHeader=(k,v)=>headers[k]=v;res.writeHead=code=>{res.statusCode=code;};res.on('data',chunk=>body+=chunk);
  const done=new Promise((resolve,reject)=>{res.on('end',resolve);res.on('error',reject);});
  handler({url,headers:{host},method},res);await done;return {body,status:res.statusCode,headers};
 }
 return {binding,request};
}
test('owner server binds only to loopback and serves the tool with noindex headers',async()=>{
 const f=fixture();assert.deepEqual(f.binding,{port:4175,host:'127.0.0.1'});
 const response=await f.request('/');assert.equal(response.status,200);assert.match(response.body,/qr-form/);assert.equal(response.headers['X-Robots-Tag'],'noindex, nofollow, noarchive');
 const script=await f.request('/owner-qr.js');assert.equal(script.status,200);assert.match(script.body,/local only/);
});
test('owner server refuses nonlocal hosts, source-file access and writes',async()=>{
 const f=fixture();assert.equal((await f.request('/','public.example')).status,403);
 for(const url of ['/package.json','/script.js','/../package.json','/.git/config','/owner-tools/README.md'])assert.equal((await f.request(url)).status,404,url);
 assert.equal((await f.request('/','127.0.0.1:4175','POST')).status,405);
});
