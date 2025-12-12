// 主题库
const ThemeLibrary = {
    themes: [
        { id: 'ios', name: 'iOS', bg: '#F2F2F7', text:'#1C1C1E', border:'none', card:'#FFF', radius:'12px', shadow:'0 2px 8px rgba(0,0,0,0.1)' },
        { id: 'bauhaus', name: '包豪斯', bg: '#F0F0F0', text:'#121212', border:'3px solid #121212', card:'#FFF', radius:'0px', shadow:'4px 4px 0 #121212' },
        { id: 'retro95', name: 'Win95', bg: '#008080', text:'#000', border:'2px outset #fff', card:'#C0C0C0', radius:'0px', shadow:'2px 2px 0 #000', font:'VT323' },
        { id: 'win10', name: 'Win10', bg: '#1F1F1F', text:'#FFF', border:'1px solid #444', card:'#333', radius:'0px', shadow:'0 4px 15px #000' },
        { id: 'win11', name: 'Win11', bg: '#F3F3F3', text:'#202020', border:'1px solid rgba(0,0,0,0.05)', card:'#FFF', radius:'8px', shadow:'0 2px 8px rgba(0,0,0,0.05)' },
        { id: 'neo', name: '新拟态', bg: '#E0E5EC', text:'#4A4A4A', border:'none', card:'#E0E5EC', radius:'12px', shadow:'5px 5px 10px #b8b9be, -5px -5px 10px #ffffff' },
        { id: 'mini', name: '极简白', bg: '#F9FAFB', text:'#111', border:'1px solid #E5E7EB', card:'#FFF', radius:'0px', shadow:'0 1px 2px rgba(0,0,0,0.05)' },
        { id: 'line', name: '线条', bg: '#FFF', text:'#000', border:'2px solid #000', card:'transparent', radius:'0px', shadow:'3px 3px 0 #000', font:'JetBrains Mono' },
        { id: 'cartoon', name: '卡通', bg: '#85FFBD', text:'#000', border:'3px solid #000', card:'#FFF', radius:'15px', shadow:'0 4px 0 rgba(0,0,0,0.2)', font:'Comic Neue' },
        { id: 'pooh', name: '维尼', bg: '#FFD93D', text:'#5D4037', border:'2px solid #FF6B6B', card:'#FFF8E1', radius:'15px', shadow:'0 4px 0 #FF6B6B', font:'Comic Neue' },
        { id: 'coffee', name: 'Coffee', bg: '#D7CCC8', text:'#3E2723', border:'1px solid #A1887F', card:'#EFEBE9', radius:'12px', shadow:'0 4px 8px rgba(93, 64, 55, 0.1)' },
        { id: 'blueprint', name: 'BluePrint', bg: '#0D47A1', text:'#FFF', border:'1px solid rgba(255,255,255,0.3)', card:'transparent', radius:'0px', shadow:'none', font:'JetBrains Mono' },
        { id: 'terminal', name: 'Terminal', bg: '#000', text:'#0F0', border:'1px solid #0F0', card:'#000', radius:'0px', shadow:'none', font:'VT323' },
        { id: 'candy', name: 'Candy', bg: 'linear-gradient(135deg, #FF9A9E, #FECFEF)', text:'#FF1493', border:'2px solid #FFF', card:'rgba(255,255,255,0.8)', radius:'25px', shadow:'0 8px 16px rgba(255, 105, 180, 0.2)', font:'Comic Neue' },
        { id: 'contrast', name: 'Contrast', bg: '#000', text:'#000', border:'4px solid #000', card:'#FFFF00', radius:'0px', shadow:'8px 8px 0 #FFF' },
        { id: 'matrix', name: 'Matrix', bg: '#000', text:'#0F0', border:'1px solid #0F0', card:'#001400', radius:'0px', shadow:'0 0 10px #0F0', font:'VT323' },
        { id: 'dracula', name: 'Dracula', bg: '#282a36', text:'#f8f8f2', border:'none', card:'#44475a', radius:'12px', shadow:'0 4px 15px rgba(0,0,0,0.3)' },
        { id: 'nord', name: 'Nord', bg: '#ECEFF4', text:'#2E3440', border:'1px solid #D8DEE9', card:'#FFF', radius:'10px', shadow:'0 4px 10px rgba(46,52,64,0.1)' },
        { id: 'gameboy', name: 'Gameboy', bg: '#8bac0f', text:'#0f380f', border:'3px solid #0f380f', card:'#9bbc0f', radius:'4px', shadow:'4px 4px 0 #306230', font:'VT323' },
        { id: 'synth', name: 'Synth', bg: 'linear-gradient(135deg, #2b2149, #6d1c52)', text:'#0ff', border:'1px solid #f7d747', card:'rgba(43, 33, 73, 0.8)', radius:'0px', shadow:'0 0 10px rgba(247, 215, 71, 0.4)' },
        { id: 'paper', name: 'Paper', bg: '#fdfbf7', text:'#4b4b4b', border:'1px solid #e0dcd3', card:'#fffefc', radius:'2px', shadow:'2px 3px 5px rgba(0,0,0,0.05)', font:'Comic Neue' },
        { id: 'lavender', name: 'Lavender', bg: '#E6E6FA', text:'#483D8B', border:'2px dashed #9370DB', card:'#FFF0F5', radius:'20px', shadow:'4px 4px 0 rgba(147,112,219,0.3)' },
        { id: 'darkglass', name: 'Glass', bg: '#121212', text:'#E0E0E0', border:'1px solid rgba(255,255,255,0.15)', card:'rgba(255,255,255,0.08)', radius:'16px', shadow:'0 8px 32px rgba(0,0,0,0.5)' }
    ],
    particles: {
        ios: ['🍎','📱','⌚'], bauhaus:['🟦','🔴','🟡'], retro95:['💾','💿','💻'], win10:['🟦','🔳'], win11:['💠','✨'],
        neo:['⚪','🔘'], mini:['⚫','⚪'], line:['✏️','📏'], cartoon:['🎈','🍭'], pooh:['🐻','🍯'],
        coffee:['☕','🥐','🥯'], blueprint:['📐','📏','🏗️'], terminal:['>_','█','01'], candy:['🍬','🧁','🍩'],
        contrast:['⚫','⚪','🔲'], matrix:['0','1','💻'], dracula:['🧛','🦇','🩸'], gameboy:['👾','🕹️','🎮'],
        synth:['🌆','🏎️','🌴'], paper:['📝','🖊️','📌'], lavender:['🪻','💜','🦋'], darkglass:['🌑','💎','✨']
    }
};

const IconSets = {
    emoji: { exam:'📝', pomo:'🍅', whiteboard:'🎨', media:'📺', schedule:'📅', countdown:'⏱️', stopwatch:'⏲️', todo:'✅', favs:'⭐', stats:'📊', long:'🎯', account:'💾' },
    paths: {
        exam: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8',
        pomo: 'M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10z M12 6v6l4 2',
        whiteboard: 'M12 19l7-7 3 3-7 7-3-3z M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z',
        media: 'M2 2h20v20H2z M7 2v20 M17 2v20 M2 12h20 M2 7h5 M2 17h5 M17 17h5 M17 7h5',
        schedule: 'M3 4h18v18H3z M16 2v4 M8 2v4 M3 10h18',
        countdown: 'M10 2h4 M12 14v-4 M4 13a8 8 0 0 1 8-7 8 8 0 1 1-5.3 14L4 17.6 M9 17H4v5',
        stopwatch: 'M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10z M12 6v6 M12 2v2',
        todo: 'M22 11.08V12a10 10 0 1 1-5.93-9.14 M22 4L12 14.01l-3-3',
        favs: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-5.82 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
        stats: 'M18 20V10 M12 20V4 M6 20v-6',
        long: 'M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10z M12 18c3.3 0 6-2.7 6-6s-2.7-6-6-6-6 2.7-6 6 2.7 6 6 6z M12 14c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z',
        account: 'M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z M17 21v-8H7v8'
    }
};