const s=(t,a="id",o="parentId",n="children")=>{const p=t.reduce((e,r)=>(e[r[a]]=r,e),{});return t.filter(e=>{const r=p[e[o]];return r&&(!r[n]&&(r[n]=[]),r[n].push(e)),!e[o]})};export{s as l};
