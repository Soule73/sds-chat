if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(s[l])return;let o={};const a=e=>i(e,l),u={module:{uri:l},exports:o,require:a};s[l]=Promise.all(n.map((e=>u[e]||a(e)))).then((e=>(r(...e),o)))}}define(["./workbox-b1f6ddb5"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/angry-217d4ffe.gif",revision:null},{url:"assets/avatar-e33a9dd7.png",revision:null},{url:"assets/background-171a2549.png",revision:null},{url:"assets/GalaxyBackground-b062edb8.png",revision:null},{url:"assets/haha-91d5e427.gif",revision:null},{url:"assets/index-ab5d7f53.js",revision:null},{url:"assets/index-fb4ba068.css",revision:null},{url:"assets/like-c4d056fa.gif",revision:null},{url:"assets/love-648cc866.gif",revision:null},{url:"assets/sad-812a9724.gif",revision:null},{url:"assets/workbox-window.prod.es5-a7b12eab.js",revision:null},{url:"assets/wow-756a927d.gif",revision:null},{url:"assets/yay-0e932819.gif",revision:null},{url:"index.html",revision:"bae009fbfbe81738df8cd60e15e23c13"},{url:"logo.svg",revision:"49b4a78525a20f81e43788a91b2bcf1d"},{url:"logo192.png",revision:"35e27fbbf96da89177352086639acd1e"},{url:"logo512.png",revision:"ce98d86103dc80dde437ac015fff3b07"},{url:"meta-tags.png",revision:"804e991134aa5274768a7ac525bb60cd"},{url:"robots.txt",revision:"b0d55b2b3e61e19d2a6e5b324ce15f51"},{url:"logo.svg",revision:"49b4a78525a20f81e43788a91b2bcf1d"},{url:"meta-tags.png",revision:"804e991134aa5274768a7ac525bb60cd"},{url:"logo192.png",revision:"35e27fbbf96da89177352086639acd1e"},{url:"logo512.png",revision:"ce98d86103dc80dde437ac015fff3b07"},{url:"manifest.webmanifest",revision:"14afa8b307a46226f28d3c8cd3208f51"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
