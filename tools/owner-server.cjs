'use strict';
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),port=4175;
const files={
 '/':'owner-tools/qr.html','/qr.html':'owner-tools/qr.html',
 '/owner-qr.js':'owner-tools/owner-qr.js','/style.css':'style.css',
 '/experience.css':'experience.css','/data.js':'data.js',
 '/vendor/qrcode.js':'vendor/qrcode.js','/assets/favicon.svg':'assets/favicon.svg'
};
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml'};
const server=http.createServer((req,res)=>{
 if(!['127.0.0.1:'+port,'localhost:'+port].includes(req.headers.host)){res.writeHead(403);return res.end('Local owner tool only.');}
 if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);return res.end();}
 const file=files[new URL(req.url,'http://127.0.0.1').pathname];
 res.setHeader('X-Robots-Tag','noindex, nofollow, noarchive');res.setHeader('Cache-Control','no-store');
 if(!file){res.writeHead(404);return res.end('Not found');}
 res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');
 if(req.method==='HEAD')return res.end();
 fs.createReadStream(path.join(root,file)).on('error',()=>{res.statusCode=500;res.end('Could not open owner tool asset.');}).pipe(res);
});
server.on('error',error=>{console.error('Owner tool could not start:',error.message);process.exitCode=1;});
server.listen(port,'127.0.0.1',()=>console.log('Local owner QR tool: http://127.0.0.1:'+port+' (not part of the public website)'));
