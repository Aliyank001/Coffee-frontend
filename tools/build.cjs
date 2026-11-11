const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..'),out=path.join(root,'dist');
fs.mkdirSync(out,{recursive:true});
for(const name of ['index.html','billing.html','qr.html','style.css','script.js','data.js','assets','vendor']) fs.cpSync(path.join(root,name),path.join(out,name),{recursive:true});
console.log('Static site built in dist/');
