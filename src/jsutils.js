const BgEngine = {
    updateBg: () => { const u=document.getElementById('bg-input').value; document.getElementById('custom-bg-layer').style.backgroundImage=u?`url('${u}')`:'none'; },
    updateMask: (v) => { document.getElementById('bg-mask-layer').style.opacity=v; document.getElementById('mask-val').innerText=Math.round(v*100)+'%'; },
    toggleParticles: (on) => {
        const l=document.getElementById('atmosphere-layer'); l.innerHTML=''; if(!on)return;
        const t=localStorage.getItem('theme')||'ios'; const em=ThemeLibrary.particles[t]||ThemeLibrary.particles.ios;
        for(let i=0;i<20;i++){
            const p=document.createElement('div'); p.className='emoji-particle'; p.innerText=em[Math.floor(Math.random()*em.length)];
            p.style.left=Math.random()*100+'vw'; p.style.fontSize=(Math.random()*2+1)+'rem';
            p.style.animationDuration=(20+Math.random()*40)+'s'; p.style.animationDelay=-Math.random()*60+'s';
            l.appendChild(p);
        }
    },
    init: () => {
        const u=localStorage.getItem('bgUrl'); if(u){document.getElementById('bg-input').value=u;BgEngine.updateBg();}
        const p=localStorage.getItem('particleOn')!=='false'; document.getElementById('particle-check').checked=p; BgEngine.toggleParticles(p);
        document.getElementById('bg-input').onchange=e=>localStorage.setItem('bgUrl',e.target.value);
        document.getElementById('particle-check').onchange=e=>{localStorage.setItem('particleOn',e.target.checked);BgEngine.toggleParticles(e.target.checked)};
    }
};

const SidebarResizer = {
    init: () => { document.getElementById('sidebar-resizer').addEventListener('mousedown', SidebarResizer.start); },
    start: (e) => { e.preventDefault(); window.addEventListener('mousemove', SidebarResizer.resize); window.addEventListener('mouseup', SidebarResizer.stop); document.getElementById('theme-sidebar').style.transition='none'; },
    resize: (e) => { let w=e.clientX; if(w<250)w=250; if(w>600)w=600; document.documentElement.style.setProperty('--sidebar-width', w+'px'); },
    stop: () => { window.removeEventListener('mousemove', SidebarResizer.resize); window.removeEventListener('mouseup', SidebarResizer.stop); document.getElementById('theme-sidebar').style.transition=''; }
};

const Utils = {
    pad: n => n.toString().padStart(2,'0'),
    format: (s,h) => { const H=Math.floor(s/3600),M=Math.floor((s%3600)/60),S=s%60; return (H>0||h)?`${Utils.pad(H)}:${Utils.pad(M)}:${Utils.pad(S)}`:`${Utils.pad(M)}:${Utils.pad(S)}`; },
    fullScreen: on => on?document.documentElement.requestFullscreen().catch(()=>{}) : (document.fullscreenElement && document.exitFullscreen())
};

const View = {
    toast: (msg) => {
        const b = document.createElement('div');
        b.style.cssText = "background:var(--custom-text, var(--text-main)); color:var(--card-bg); padding:10px 20px; border-radius:30px; box-shadow:0 5px 15px rgba(0,0,0,0.2); animation:slideUp 0.3s forwards;";
        b.innerHTML = `ℹ️ ${msg}`;
        document.getElementById('toast-container').appendChild(b);
        setTimeout(()=>b.remove(),3000);
    },
    setTheme: (t) => { 
        document.documentElement.setAttribute('data-theme', t); localStorage.setItem('theme', t);
        document.querySelectorAll('.theme-thumb').forEach(el => el.classList.toggle('active', el.dataset.theme === t));
        if(document.getElementById('particle-check').checked) BgEngine.toggleParticles(true);
        // Reset radius if not custom
        if(!localStorage.getItem('customRadius')) document.documentElement.style.removeProperty('--radius');
        else document.documentElement.style.setProperty('--radius', localStorage.getItem('customRadius')+'px');
    },
    toggleSidebar: () => { document.getElementById('theme-sidebar').classList.toggle('open'); document.getElementById('sidebar-overlay').classList.toggle('open'); },
    toggleZen: () => { document.body.classList.toggle('zen-mode'); Utils.fullScreen(document.body.classList.contains('zen-mode')); },
    updateGridSize: (v) => { document.documentElement.style.setProperty('--grid-size', v+'px'); document.getElementById('grid-val').innerText=v+'px'; localStorage.setItem('customGrid', v); },
    updateIconSize: (v) => { document.documentElement.style.setProperty('--icon-size', v+'rem'); document.getElementById('icon-size-val').innerText=v+'x'; localStorage.setItem('customIconSize', v); },
    updateRadius: (v) => { document.documentElement.style.setProperty('--radius', v+'px'); document.getElementById('radius-val').innerText=v+'px'; localStorage.setItem('customRadius', v); }
};

const Data = {
    store: {
        todos: JSON.parse(localStorage.getItem('todos')||'[]'),
        schedule: JSON.parse(localStorage.getItem('schedule')||'[]'),
        favs: JSON.parse(localStorage.getItem('favs')||'[]'),
        stats: JSON.parse(localStorage.getItem('stats')||'{"total":0,"today":0}'),
        long: { target: localStorage.getItem('targetDate'), exam: localStorage.getItem('examDate') }
    },
    save: (k) => localStorage.setItem(k, JSON.stringify(Data.store[k])),
    export: () => {
        const b = new Blob([JSON.stringify(localStorage)], {type:'application/json'});
        const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = 'backup.json'; a.click();
    },
    import: (inp) => {
        const r = new FileReader();
        r.onload = e => { Object.assign(localStorage, JSON.parse(e.target.result)); location.reload(); };
        if(inp.files.length) r.readAsText(inp.files[0]);
    }
};