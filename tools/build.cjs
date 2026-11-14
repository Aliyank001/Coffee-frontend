'use strict';
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),out=path.join(root,'dist');
if(path.dirname(out)!==root||fs.lstatSync(out,{throwIfNoEntry:false})?.isSymbolicLink())throw new Error('Invalid build output path');
if(fs.existsSync(out))fs.rmSync(out,{recursive:true,force:true});
fs.mkdirSync(out,{recursive:true});
for(const name of ['index.html','robots.txt','style.css','script.js','data.js','assets'])fs.cpSync(path.join(root,name),path.join(out,name),{recursive:true});
console.log('Website built in dist/');
