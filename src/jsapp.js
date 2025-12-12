const AppState = {
    pages: [
        {id:'exam',name:'考场',key:'exam'}, {id:'pomo',name:'番茄',key:'pomo'}, {id:'whiteboard',name:'白板',key:'whiteboard'}, {id:'media',name:'媒体',key:'media'},
        {id:'schedule',name:'日程',key:'schedule'}, {id:'countdown',name:'倒计时',key:'countdown'}, {id:'stopwatch',name:'秒表',key:'stopwatch'}, {id:'todo',name:'待办',key:'todo'},
        {id:'favs',name:'收藏',key:'favs'}, {id:'stats',name:'统计',key:'stats'}, {id:'long',name:'目标',key:'long'}, {id:'account',name:'数据',key:'account'}
    ],
    order: JSON.parse(localStorage.getItem('appOrder')) || null
};

const App = {
    dragSrc: null,
    init: () => {
        const t = localStorage.getItem('theme') || 'ios'; View.setTheme(t); BgEngine.init(); SidebarResizer.init();
        const cText = localStorage.getItem('customText'); if(cText) document.documentElement.style.setProperty('--custom-text', cText);
        const cAccent = localStorage.getItem('customAccent'); if(cAccent) document.documentElement.style.setProperty('--custom-accent', cAccent);
        
        const cGrid = localStorage.getItem('customGrid'); if(cGrid) { View.updateGridSize(cGrid); document.querySelector('input[oninput="View.updateGridSize(this.value)"]').value=cGrid; }
        const cIcon = localStorage.getItem('customIconSize'); if(cIcon) { View.updateIconSize(cIcon); document.querySelector('input[oninput="View.updateIconSize(this.value)"]').value=cIcon; }
        const cRad = localStorage.getItem('customRadius'); if(cRad) { View.updateRadius(cRad); document.querySelector('input[oninput="View.updateRadius(this.value)"]').value=cRad; }

        const dMode = localStorage.getItem('displayMode') || 'standard'; App.setMode(dMode);
        const iType = localStorage.getItem('iconType') || 'emoji'; App.setIconType(iType);

        // Render Themes List
        const themeList = document.getElementById('theme-list');
        ThemeLibrary.themes.forEach(theme => {
            const d = document.createElement('div'); d.className = 'theme-thumb'; d.dataset.theme = theme.id; d.style.background = theme.bg;
            d.innerHTML = `<div class="mini-ui-card" style="background:${theme.card}; border:${theme.border}; color:${theme.text}; border-radius:${theme.radius}; box-shadow:${theme.shadow}; font-family:${theme.font||'sans-serif'};">Aa</div><div class="theme-name-label" style="width:100%; text-align:center; font-size:0.8rem; color:${theme.id==='win10'||theme.id==='retro95'||theme.id==='matrix'||theme.id==='dracula'||theme.id==='synth'||theme.id==='darkglass'||theme.id==='terminal'?'#fff':'#333'};">${theme.name}</div>`;
            d.onclick = () => View.setTheme(theme.id); if(t === theme.id) d.classList.add('active'); themeList.appendChild(d);
        });

        App.renderGrid();
        setInterval(()=>document.getElementById('clock-real').innerText=new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}),1000);
        Modules.Todo.render(); Modules.Schedule.render(); Modules.Favs.render(); Modules.Long.init();
        document.body.addEventListener('dblclick', ()=> {if(document.body.classList.contains('zen-mode')) View.toggleZen()});
    },
    setMode: (mode, btn) => {
        document.getElementById('app-grid').setAttribute('data-mode', mode); localStorage.setItem('displayMode', mode);
        if(btn) { document.querySelectorAll('.display-mode-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active'); }
        else { const b = Array.from(document.querySelectorAll('.display-mode-btn')).find(b => b.onclick.toString().includes(`'${mode}'`)); if(b) b.classList.add('active'); }
    },
    setIconType: (type, btn) => {
        document.getElementById('app-grid').setAttribute('data-icon', type); localStorage.setItem('iconType', type);
        if(btn) { document.querySelectorAll('.icon-type-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active'); }
        else { const b = Array.from(document.querySelectorAll('.icon-type-btn')).find(b => b.onclick.toString().includes(`'${type}'`)); if(b) b.classList.add('active'); }
        App.renderGrid();
    },
    renderGrid: () => {
        const grid = document.getElementById('app-grid'); grid.innerHTML = '';
        const type = localStorage.getItem('iconType') || 'emoji';
        if(!AppState.order) AppState.order = AppState.pages.map(p => p.id);
        AppState.order.forEach((id) => {
            const page = AppState.pages.find(p => p.id === id); if(!page) return;
            const d = document.createElement('div'); d.className = 'app-card'; d.draggable = true; d.setAttribute('data-id', id);
            
            const path = IconSets.paths[page.key];
            let iconHtml = '';
            if(type==='emoji') iconHtml = `<div class="icon-emoji">${IconSets.emoji[page.key]}</div>`;
            else if(type==='line') iconHtml = `<svg class="icon-svg line" viewBox="0 0 24 24"><path d="${path}"></path></svg>`;
            else if(type==='solid') iconHtml = `<svg class="icon-svg solid" viewBox="0 0 24 24"><path d="${path}"></path></svg>`;
            else if(type==='duotone') iconHtml = `<svg class="icon-svg duotone" viewBox="0 0 24 24"><path d="${path}"></path></svg>`;
            
            d.innerHTML = `<div class="icon-container">${iconHtml}</div><h3>${page.name}</h3>`;
            d.onclick = () => App.go(id);
            d.addEventListener('dragstart', App.handleDragStart); d.addEventListener('dragover', e => {e.preventDefault(); return false;});
            d.addEventListener('drop', App.handleDrop); d.addEventListener('dragend', () => document.querySelectorAll('.app-card').forEach(c => c.classList.remove('dragging')));
            grid.appendChild(d);
        });
    },
    handleDragStart: (e) => { App.dragSrc = e.currentTarget; e.dataTransfer.effectAllowed = 'move'; e.currentTarget.classList.add('dragging'); },
    handleDrop: (e) => {
        e.stopPropagation();
        const srcId = App.dragSrc.getAttribute('data-id'); const targetId = e.currentTarget.getAttribute('data-id');
        if (srcId !== targetId) {
            const oldIdx = AppState.order.indexOf(srcId); const newIdx = AppState.order.indexOf(targetId);
            AppState.order.splice(oldIdx, 1); AppState.order.splice(newIdx, 0, srcId);
            localStorage.setItem('appOrder', JSON.stringify(AppState.order)); App.renderGrid();
        }
        return false;
    },
    go: (id) => { document.querySelectorAll('.page').forEach(p => p.classList.remove('active')); document.getElementById(`page-${id}`).classList.add('active'); document.getElementById('page-home').classList.remove('active'); document.getElementById('btn-home').classList.remove('hidden'); if(id==='whiteboard') setTimeout(Modules.Whiteboard.init, 100); },
    goHome: () => { document.querySelectorAll('.page').forEach(p => p.classList.remove('active')); document.getElementById('page-home').classList.add('active'); document.getElementById('btn-home').classList.add('hidden'); if(document.body.classList.contains('zen-mode')) View.toggleZen(); }
};

window.onload = App.init;