if(!self.define){let e,n={};const o=(o,r)=>(o=new URL(o+".js",r).href,n[o]||new Promise((n=>{if("document"in self){const e=document.createElement("script");e.src=o,e.onload=n,document.head.appendChild(e)}else e=o,importScripts(o),n()})).then((()=>{let e=n[o];if(!e)throw new Error(`Module ${o} didn’t register its module`);return e})));self.define=(r,i)=>{const s=e||("document"in self?document.currentScript.src:"")||location.href;if(n[s])return;let a={};const d=e=>o(e,s),l={module:{uri:s},exports:a,require:d};n[s]=Promise.all(r.map((e=>l[e]||d(e)))).then((e=>(i(...e),a)))}}define(["./workbox-b1f6ddb5"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/avatar-e33a9dd7.png",revision:null},{url:"assets/background-171a2549.png",revision:null},{url:"assets/GalaxyBackground-b062edb8.png",revision:null},{url:"index.html",revision:"d0c450ffc0c59a2628d034228fa54be2"},{url:"logo.svg",revision:"49b4a78525a20f81e43788a91b2bcf1d"},{url:"logo192.png",revision:"35e27fbbf96da89177352086639acd1e"},{url:"logo512.png",revision:"ce98d86103dc80dde437ac015fff3b07"},{url:"meta-tags.png",revision:"804e991134aa5274768a7ac525bb60cd"},{url:"robots.txt",revision:"b0d55b2b3e61e19d2a6e5b324ce15f51"},{url:"logo.svg",revision:"49b4a78525a20f81e43788a91b2bcf1d"},{url:"meta-tags.png",revision:"804e991134aa5274768a7ac525bb60cd"},{url:"logo192.png",revision:"35e27fbbf96da89177352086639acd1e"},{url:"logo512.png",revision:"ce98d86103dc80dde437ac015fff3b07"},{url:"manifest.webmanifest",revision:"14afa8b307a46226f28d3c8cd3208f51"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
