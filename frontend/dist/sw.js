if(!self.define){let e,s={};const i=(i,r)=>(i=new URL(i+".js",r).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(r,o)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let d={};const t=e=>i(e,n),c={module:{uri:n},exports:d,require:t};s[n]=Promise.all(r.map((e=>c[e]||t(e)))).then((e=>(o(...e),d)))}}define(["./workbox-db946a88"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index-374fcfb0.js",revision:"9c3c68c5e34b2ad4d94c584fd64d0c19"},{url:"assets/index-d0e6a787.css",revision:"6d325c64b8bfda76d5eb6046e9b9847f"},{url:"index.html",revision:"b5b5dabca156a3fc0bcd9599b1208548"},{url:"logo.svg",revision:"49b4a78525a20f81e43788a91b2bcf1d"},{url:"logo192.png",revision:"35e27fbbf96da89177352086639acd1e"},{url:"logo512.png",revision:"ce98d86103dc80dde437ac015fff3b07"},{url:"manifest.json",revision:"2aae979da361d137faa23bcd595e7ca0"},{url:"meta-tags.png",revision:"804e991134aa5274768a7ac525bb60cd"},{url:"robots.txt",revision:"b0d55b2b3e61e19d2a6e5b324ce15f51"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]})}));
//# sourceMappingURL=sw.js.map
