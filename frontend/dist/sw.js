if (!self.define) {
  let e,
    s = {};
  const i = (i, a) => (
    (i = new URL(i + ".js", a).href),
    s[i] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = i), (e.onload = s), document.head.appendChild(e);
        } else (e = i), importScripts(i), s();
      }).then(() => {
        let e = s[i];
        if (!e) throw new Error(`Module ${i} didn’t register its module`);
        return e;
      })
  );
  self.define = (a, r) => {
    const n =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[n]) return;
    let c = {};
    const o = (e) => i(e, n),
      d = { module: { uri: n }, exports: c, require: o };
    s[n] = Promise.all(a.map((e) => d[e] || o(e))).then((e) => (r(...e), c));
  };
}
define(["./workbox-db946a88"], function (e) {
  "use strict";
  self.addEventListener("message", (e) => {
    e.data && "SKIP_WAITING" === e.data.type && self.skipWaiting();
  }),
    e.precacheAndRoute(
      [
        {
          url: "assets/index-9c05c83f.css",
          revision: "a75ce12f809958e8eb176d6b02e9d0c1",
        },
        {
          url: "assets/index-d64cc54d.js",
          revision: "a2bf4c29c401219aa8efad8faadf3c95",
        },
        { url: "index.html", revision: "c2f7e5682a87f316dce827cef141600d" },
        { url: "logo.svg", revision: "49b4a78525a20f81e43788a91b2bcf1d" },
        { url: "logo192.png", revision: "35e27fbbf96da89177352086639acd1e" },
        { url: "logo512.png", revision: "ce98d86103dc80dde437ac015fff3b07" },
        { url: "manifest.json", revision: "2aae979da361d137faa23bcd595e7ca0" },
        { url: "meta-tags.png", revision: "804e991134aa5274768a7ac525bb60cd" },
        { url: "screen.png", revision: "1eaef4ba4a97a0ca3ca8e1ab82e0e006" },
        { url: "vite.svg", revision: "8e3a10e157f75ada21ab742c022d5430" },
      ],
      { ignoreURLParametersMatching: [/^utm_/, /^fbclid$/] }
    );
});
//# sourceMappingURL=sw.js.map
