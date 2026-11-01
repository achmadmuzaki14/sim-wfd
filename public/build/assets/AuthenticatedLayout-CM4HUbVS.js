import{r as c,c as v,j as e,L as x}from"./app-BeS1UaGo.js";/**
 * @license lucide-react v1.28.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=(...a)=>a.filter((t,r,n)=>!!t&&t.trim()!==""&&n.indexOf(t)===r).join(" ").trim();/**
 * @license lucide-react v1.28.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=a=>a.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v1.28.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=a=>a.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,r,n)=>n?n.toUpperCase():r.toLowerCase());/**
 * @license lucide-react v1.28.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=a=>{const t=z(a);return t.charAt(0).toUpperCase()+t.slice(1)};/**
 * @license lucide-react v1.28.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var m={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v1.28.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=a=>{for(const t in a)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1},S=c.createContext({}),R=()=>c.useContext(S),I=c.forwardRef(({color:a,size:t,strokeWidth:r,absoluteStrokeWidth:n,className:i="",children:o,iconNode:l,...h},d)=>{const{size:p=24,strokeWidth:y=2,absoluteStrokeWidth:j=!1,color:M="currentColor",className:w=""}=R()??{},_=n??j?Number(r??y)*24/Number(t??p):r??y;return c.createElement("svg",{ref:d,...m,width:t??p??m.width,height:t??p??m.height,stroke:a??M,strokeWidth:_,className:N("lucide",w,i),...!o&&!L(h)&&{"aria-hidden":"true"},...h},[...l.map(([C,A])=>c.createElement(C,A)),...Array.isArray(o)?o:[o]])});/**
 * @license lucide-react v1.28.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const s=(a,t)=>{const r=c.forwardRef(({className:n,...i},o)=>c.createElement(I,{ref:o,iconNode:t,className:N(`lucide-${$(k(a))}`,`lucide-${a}`,n),...i}));return r.displayName=k(a),r};/**
 * @license lucide-react v1.28.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=[["path",{d:"M10.268 21a2 2 0 0 0 3.464 0",key:"vwvbt9"}],["path",{d:"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",key:"11g9vi"}]],D=s("bell",P);/**
 * @license lucide-react v1.28.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=[["path",{d:"M12 5v16",key:"1f6ucr"}],["path",{d:"M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z",key:"1fyvmf"}]],T=s("book-open",O);/**
 * @license lucide-react v1.28.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V=[["path",{d:"M8 2v3",key:"1ioesn"}],["path",{d:"M16 2v3",key:"otl347"}],["rect",{x:"3",y:"3",width:"18",height:"18",rx:"2",key:"h1oib"}],["path",{d:"M3 9h18",key:"1pudct"}]],W=s("calendar",V);/**
 * @license lucide-react v1.28.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]],F=s("chart-column",E);/**
 * @license lucide-react v1.28.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],U=s("circle-check",H);/**
 * @license lucide-react v1.28.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K=[["path",{d:"M13.744 17.736a6 6 0 1 1-7.48-7.48",key:"bq4yh3"}],["path",{d:"M15 6h1v4",key:"11y1tn"}],["path",{d:"m6.134 14.768.866-.5 2 3.464",key:"17snzx"}],["circle",{cx:"16",cy:"8",r:"6",key:"14bfc9"}]],q=s("coins",K);/**
 * @license lucide-react v1.28.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M8 13h2",key:"yr2amv"}],["path",{d:"M14 13h2",key:"un5t4a"}],["path",{d:"M8 17h2",key:"2yhykz"}],["path",{d:"M14 17h2",key:"10kma7"}]],f=s("file-spreadsheet",B);/**
 * @license lucide-react v1.28.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G=[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]],Z=s("file-text",G);/**
 * @license lucide-react v1.28.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q=[["path",{d:"M15 6a9 9 0 0 0-9 9V3",key:"1cii5b"}],["circle",{cx:"18",cy:"6",r:"3",key:"1h7g24"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}]],X=s("git-branch",Q);/**
 * @license lucide-react v1.28.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J=[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]],Y=s("layout-dashboard",J);/**
 * @license lucide-react v1.28.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ee=[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]],te=s("log-out",ee);/**
 * @license lucide-react v1.28.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ae=[["path",{d:"M4 5h16",key:"1tepv9"}],["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 19h16",key:"1djgab"}]],se=s("menu",ae);/**
 * @license lucide-react v1.28.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ne=[["path",{d:"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z",key:"1a0edw"}],["path",{d:"M12 22V12",key:"d0xqtd"}],["polyline",{points:"3.29 7 12 12 20.71 7",key:"ousv84"}],["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}]],re=s("package",ne);/**
 * @license lucide-react v1.28.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oe=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M12 7v5l4 2",key:"1fdv2h"}]],ce=s("rotate-ccw-clock",oe);/**
 * @license lucide-react v1.28.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ie=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",key:"1i5ecw"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],u=s("settings",ie);/**
 * @license lucide-react v1.28.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const le=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]],b=s("shield-check",le);/**
 * @license lucide-react v1.28.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const de=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"6",key:"1vlfrh"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]],he=s("target",de);/**
 * @license lucide-react v1.28.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pe=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],me=s("user",pe);/**
 * @license lucide-react v1.28.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xe=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744",key:"16gr8j"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]],g=s("users",xe);/**
 * @license lucide-react v1.28.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ye=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],ke=s("x",ye),fe=[{title:"MONITORING",items:[{label:"Dashboard",href:"/dashboard",icon:Y},{label:"Indikator & Output",href:"/indicators",icon:he},{label:"Pelacak Proses",href:"/processes",icon:X},{label:"Capaian per Mitra",href:"/achievements-by-partner",icon:F}]},{title:"REGISTER PROGRAM",items:[{label:"Kelompok",href:"/groups",icon:g},{label:"Produk & Penjualan",href:"/products-sales",icon:re},{label:"Kebijakan",href:"/policies",icon:b},{label:"Learning Stories",href:"/learning-stories",icon:T},{label:"Dana Ungkit",href:"/leverage",icon:q}]},{title:"INPUT DATA",items:[{label:"Register WFD",href:"/wfd",icon:g},{label:"Register Dokumen",href:"/documents",icon:Z},{label:"Register Kegiatan",href:"/activities",icon:W}]},{title:"KUALITAS DATA",items:[{label:"Antrean Verifikasi",href:"/verification",icon:U,roles:["admin","verifikator","mitra"]},{label:"Log DQA",href:"/data-quality",icon:b,roles:["admin","verifikator"]},{label:"Kepatuhan Laporan",href:"/report-compliance",icon:f,roles:["admin","verifikator"]}]},{title:"PELAPORAN",items:[{label:"Laporan & Ekspor",href:"/reports",icon:f}]},{title:"ADMINISTRASI",items:[{label:"Pengguna & Peran",href:"/administration/users",icon:u,roles:["admin"]},{label:"Data Referensi",href:"/administration/references",icon:u,roles:["admin"]},{label:"Audit Log",href:"/administration/audit-log",icon:ce,roles:["admin"]}]}];function ue(){var o;const{auth:a}=v().props,t=(o=a==null?void 0:a.user)==null?void 0:o.peran,[r,n]=c.useState(!1),i=l=>l.roles?l.roles.includes(t):!0;return e.jsxs(e.Fragment,{children:[e.jsx("button",{onClick:()=>n(!0),className:"fixed left-4 top-4 z-50 rounded-lg bg-navy-500 p-2 text-white lg:hidden","aria-label":"Buka menu",children:e.jsx(se,{className:"h-5 w-5"})}),r&&e.jsx("div",{className:"fixed inset-0 z-40 bg-black/50 lg:hidden",onClick:()=>n(!1)}),e.jsxs("aside",{className:`fixed left-0 top-0 z-40 h-screen w-sidebar overflow-y-auto bg-navy-500 text-white transition-transform duration-300 lg:translate-x-0 ${r?"translate-x-0":"-translate-x-full"}`,children:[e.jsxs("div",{className:"flex items-center justify-between border-b border-navy-400/30 px-6 py-4",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"text-lg font-bold tracking-tight",children:"SIM-WFD"}),e.jsx("p",{className:"text-xs text-navy-100",children:"Women Forest Defenders"})]}),e.jsx("button",{onClick:()=>n(!1),className:"rounded p-1 hover:bg-navy-400 lg:hidden","aria-label":"Tutup menu",children:e.jsx(ke,{className:"h-5 w-5"})})]}),e.jsx("nav",{className:"px-3 py-4",children:fe.map(l=>{const h=l.items.filter(i);return h.length===0?null:e.jsxs("div",{className:"mb-6",children:[e.jsx("p",{className:"mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-navy-200",children:l.title}),e.jsx("div",{className:"space-y-1",children:h.map(d=>{const p=d.icon;return e.jsxs(x,{href:d.href,className:"flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-navy-50 transition-colors hover:bg-navy-400/50 [&.active]:bg-navy-400",onClick:()=>n(!1),children:[e.jsx(p,{className:"h-4 w-4 shrink-0"}),e.jsx("span",{children:d.label})]},d.href)})})]},l.title)})})]})]})}function be(){var i;const{auth:a}=v().props,t=a==null?void 0:a.user,[r,n]=c.useState(!1);return e.jsxs("header",{className:"sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card px-4 lg:px-6",children:[e.jsx("div",{className:"flex items-center gap-4",children:e.jsx("h2",{className:"text-sm font-semibold text-navy-500",children:"Sistem Informasi Monitoring Women Forest Defenders"})}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsxs("button",{className:"relative rounded-lg p-2 text-muted hover:bg-appbg","aria-label":"Notifikasi",children:[e.jsx(D,{className:"h-5 w-5"}),e.jsx("span",{className:"absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-danger"})]}),e.jsxs("div",{className:"relative",children:[e.jsxs("button",{onClick:()=>n(!r),className:"flex items-center gap-2 rounded-lg p-2 hover:bg-appbg",children:[e.jsx("div",{className:"flex h-8 w-8 items-center justify-center rounded-full bg-navy-500 text-sm font-semibold text-white",children:((i=t==null?void 0:t.name)==null?void 0:i.charAt(0))??"U"}),e.jsxs("div",{className:"hidden text-left sm:block",children:[e.jsx("p",{className:"text-sm font-medium text-navy-500",children:t==null?void 0:t.name}),e.jsx("p",{className:"text-xs text-muted capitalize",children:t==null?void 0:t.peran})]})]}),r&&e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"fixed inset-0 z-10",onClick:()=>n(!1)}),e.jsxs("div",{className:"absolute right-0 top-full z-20 mt-2 w-56 rounded-lg border border-border bg-card py-2 shadow-lg",children:[e.jsxs("div",{className:"border-b border-border px-4 py-2",children:[e.jsx("p",{className:"text-sm font-medium text-navy-500",children:t==null?void 0:t.name}),e.jsx("p",{className:"text-xs text-muted",children:t==null?void 0:t.email}),(t==null?void 0:t.mitra_nama)&&e.jsx("p",{className:"text-xs text-teal mt-1",children:t.mitra_nama})]}),e.jsxs(x,{href:"/profile",className:"flex items-center gap-2 px-4 py-2 text-sm text-navy-500 hover:bg-appbg",children:[e.jsx(me,{className:"h-4 w-4"}),"Profil"]}),e.jsxs(x,{href:"/logout",method:"post",as:"button",className:"flex w-full items-center gap-2 px-4 py-2 text-sm text-danger hover:bg-danger-50",children:[e.jsx(te,{className:"h-4 w-4"}),"Keluar"]})]})]})]})]})]})}function ve({children:a}){return e.jsxs("div",{className:"min-h-screen bg-appbg",children:[e.jsx(ue,{}),e.jsxs("div",{className:"lg:pl-sidebar",children:[e.jsx(be,{}),e.jsx("main",{className:"p-4 lg:p-6",children:a})]})]})}export{ve as A,U as C,f as F,s as c};
