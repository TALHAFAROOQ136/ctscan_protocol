/* ── TAB SWITCHING ── */
function showPane(id) {
  const ids = ['protocols','decision','checklist','reference','timeline','reactions','calculator'];
  document.querySelectorAll('.tab').forEach((t,i) => t.classList.toggle('active', ids[i] === id));
  document.querySelectorAll('.pane').forEach(p => p.classList.toggle('active', p.id === id));
}

/* ══════════════════════════════
   PHASE TIMELINE
══════════════════════════════ */
const PROTO_DATA = {
  'Routine Abdomen/Pelvis': { iv:'100 mL Omnipaque 350 · 3–5 mL/s', oral:'Water 800 mL',
    phases:[{ name:'Portal Venous', sec:70, color:'#1565C0', note:'SMART PREP 50 HU liver · Dome→SP' }]},
  'A/P with Delay': { iv:'100 mL · 3–5 mL/s', oral:'Water 800 mL',
    phases:[{ name:'Portal Venous', sec:70, color:'#1565C0', note:'SMART PREP 50 HU liver · Dome→SP' },
            { name:'3-min Delay', sec:180, color:'#0F766E', note:'Dome→bottom of kidneys (extend to SP if bleeding)' }]},
  'Trauma': { iv:'100 mL · 3–5 mL/s', oral:'Water 800 mL',
    phases:[{ name:'Portal Venous', sec:70, color:'#1565C0', note:'SMART PREP 50 HU liver · Liver→inferior pubic rami' },
            { name:'4-min Renal Delay', sec:240, color:'#B91C1C', note:'Through kidneys (extend to SP if pelvic injury)' }]},
  'Quad Phase Liver': { iv:'125 mL · 4–5 mL/s', oral:'Water 800 mL',
    phases:[{ name:'Non-contrast', sec:0, color:'#64748B', note:'Top→bottom of liver' },
            { name:'Arterial', sec:25, color:'#B45309', note:'SMART PREP Aorta 150 HU · Top→bottom liver · ≥25s' },
            { name:'Portal Venous', sec:80, color:'#1565C0', note:'80s delay · Abdomen (±pelvis)' },
            { name:'Equilibrium', sec:180, color:'#0F766E', note:'3 min · Top liver→bottom kidneys' }]},
  'Triple Phase Liver': { iv:'125 mL · 4–5 mL/s', oral:'Water 800 mL',
    phases:[{ name:'Arterial', sec:25, color:'#B45309', note:'SMART PREP Aorta 150 HU · ≥25s · Top→bottom liver' },
            { name:'Portal Venous', sec:80, color:'#1565C0', note:'80s delay · Abdomen (±pelvis)' },
            { name:'Equilibrium', sec:180, color:'#0F766E', note:'3 min · Top liver→bottom kidneys' }]},
  'Dual Phase': { iv:'125 mL · 4–5 mL/s', oral:'Water 800 mL',
    phases:[{ name:'Arterial', sec:25, color:'#B45309', note:'SMART PREP Aorta 150 HU · Top liver→iliac crest' },
            { name:'Portal Venous', sec:80, color:'#1565C0', note:'80s delay · Abdomen (±pelvis)' }]},
  'Liver Donor': { iv:'125 mL · 4–5 mL/s', oral:'Water 800 mL',
    phases:[{ name:'Angiographic', sec:25, color:'#B45309', note:'Top liver→iliac crest' },
            { name:'Portal Venous', sec:80, color:'#1565C0', note:'80s delay · Top liver→iliac crest' }]},
  'Adrenal Mass': { iv:'100 mL · 4–5 mL/s', oral:'Water 800 mL',
    phases:[{ name:'Non-contrast', sec:0, color:'#64748B', note:'Liver dome→iliac crest · CHECK before proceeding' },
            { name:'Portal Venous', sec:80, color:'#1565C0', note:'80s delay · Abdomen (±pelvis)' },
            { name:'15-min Washout', sec:900, color:'#6D28D9', note:'Top liver→iliac crest · Washout / absolute washout analysis' }]},
  'Renal Mass': { iv:'100 mL · 4–5 mL/s', oral:'Water 800 mL',
    phases:[{ name:'Non-contrast', sec:0, color:'#64748B', note:'Top→bottom kidneys (low dose)' },
            { name:'Corticomedullary', sec:30, color:'#B45309', note:'30s · Top liver→bottom kidneys' },
            { name:'Nephrographic', sec:90, color:'#1565C0', note:'90s · Abdomen (±pelvis)' },
            { name:'4-min Delayed', sec:240, color:'#0F766E', note:'4 min · Top liver→bottom kidneys' }]},
  'Renal Stone': { iv:'None', oral:'None',
    phases:[{ name:'Non-contrast (low dose)', sec:0, color:'#64748B', note:'Top kidneys→SP' }]},
  'Renal Artery Stenosis': { iv:'100 mL · 4–5 mL/s', oral:'Water 800 mL',
    phases:[{ name:'Arterial', sec:25, color:'#B45309', note:'Top kidneys→SP' },
            { name:'Nephrographic', sec:90, color:'#1565C0', note:'90s · Top kidneys→iliac crest' }]},
  'Renal Donor/UPJ': { iv:'100 mL · 4–5 mL/s', oral:'Water 800 mL',
    phases:[{ name:'Non-contrast', sec:0, color:'#64748B', note:'Top→bottom kidneys · CHECK hydronephrosis' },
            { name:'Arterial', sec:25, color:'#B45309', note:'Top kidneys→iliac bifurcation' },
            { name:'Nephrographic', sec:90, color:'#1565C0', note:'90s · Top liver→SP' },
            { name:'7–10 min Delay', sec:480, color:'#0F766E', note:'Collecting system opacification' }]},
  'Urogram': { iv:'100 mL + 250 mL NS', oral:'Patient drinks 32 oz water on arrival',
    phases:[{ name:'Non-contrast', sec:0, color:'#64748B', note:'Top→bottom kidneys (low dose)' },
            { name:'Nephrographic', sec:90, color:'#1565C0', note:'90s · Dome liver→SP' },
            { name:'Excretory (prone)', sec:600, color:'#15803D', note:'10 min · Top kidneys→SP in PRONE position' }]},
  'Pancreatic Mass': { iv:'125 mL · 4–5 mL/s', oral:'Water (32 oz on arrival)',
    phases:[{ name:'Arterial', sec:25, color:'#B45309', note:'Top liver→iliac crest · Single breath-hold' },
            { name:'Portal Venous', sec:80, color:'#1565C0', note:'80s delay · Abdomen (±pelvis)' }]},
  'Enterography IBD': { iv:'100 mL · 4–5 mL/s', oral:'VoLumen 3×450 mL',
    phases:[{ name:'Enteric', sec:50, color:'#15803D', note:'50s · Dome liver→SP' }]},
  'Enterography GI Bleed/Tumor': { iv:'100 mL · 4–5 mL/s', oral:'VoLumen 3×450 mL',
    phases:[{ name:'Enteric', sec:50, color:'#15803D', note:'50s · Dome liver→SP' },
            { name:'2-min Delay', sec:120, color:'#0F766E', note:'2 min · Dome liver→SP' }]},
  'Mesenteric Ischemia': { iv:'100 mL · 4–5 mL/s', oral:'Water 800 mL',
    phases:[{ name:'Arterial', sec:25, color:'#B45309', note:'Dome liver→SP' },
            { name:'Venous', sec:90, color:'#1565C0', note:'90s · Dome liver→SP' }]},
  'Aortic Dissection': { iv:'100 mL · 4–5 mL/s', oral:'None (interferes with 3D)',
    phases:[{ name:'Non-contrast', sec:0, color:'#64748B', note:'Top arch→diaphragm' },
            { name:'Arterial', sec:25, color:'#B45309', note:'SMART PREP arch 150 HU · Apices→SP' },
            { name:'4-min Organ Perfusion', sec:240, color:'#0F766E', note:'Dome liver through kidneys' }]},
  'AAA Pre-EVT': { iv:'100 mL · 4–5 mL/s', oral:'None or Water',
    phases:[{ name:'Arterial', sec:25, color:'#B45309', note:'SMART PREP abdominal aorta 150 HU · Dome liver→SP' },
            { name:'4-min Delay', sec:240, color:'#0F766E', note:'Liver + kidneys' }]},
  'AAA Post-EVT': { iv:'100 mL · 4–5 mL/s', oral:'None or Water',
    phases:[{ name:'Non-contrast', sec:0, color:'#64748B', note:'Dome→SP (pre-existing high density baseline)' },
            { name:'Arterial', sec:25, color:'#B45309', note:'SMART PREP abdominal aorta 150 HU · Dome→SP' },
            { name:'4-min Delayed', sec:240, color:'#B91C1C', note:'Dome→SP · Endoleak detection' }]},
  'Lower Extremity Run-Off': { iv:'125 mL · 4–5 mL/s', oral:'Water',
    phases:[{ name:'Non-contrast', sec:0, color:'#64748B', note:'Diaphragm→toes' },
            { name:'Arterial', sec:20, color:'#B45309', note:'SMART PREP over knees (first blush — no ROI) · HiRes HD + ASIR 30%' }]}
};

function fmtTime(sec) {
  if (sec === 0) return 'T = 0 (pre-contrast)';
  if (sec < 60)  return 'T + ' + sec + 's';
  const m = Math.floor(sec/60), s = sec%60;
  return s ? 'T + ' + m + 'min ' + s + 's' : 'T + ' + m + ' min';
}

function renderTimeline() {
  const name = document.getElementById('tl-proto').value;
  const meta  = document.getElementById('tl-meta');
  const wrap  = document.getElementById('tl-canvas-wrap');
  const list  = document.getElementById('tl-phase-list');
  if (!name || !PROTO_DATA[name]) { meta.style.display='none'; wrap.style.display='none'; list.innerHTML=''; return; }

  const d = PROTO_DATA[name];
  meta.style.display = 'flex';
  meta.innerHTML = `<div class="tl-meta-pill"><strong>IV:</strong> ${d.iv}</div><div class="tl-meta-pill"><strong>Oral:</strong> ${d.oral}</div><div class="tl-meta-pill"><strong>Phases:</strong> ${d.phases.length}</div>`;

  const maxSec = Math.max(...d.phases.map(p=>p.sec), 10);
  document.getElementById('tl-end-label').textContent = fmtTime(maxSec);

  const axis = document.getElementById('tl-axis');
  axis.querySelectorAll('.tl-marker,.tl-label,.tl-sublabel,.tl-time').forEach(e=>e.remove());

  d.phases.forEach(p => {
    const pct = maxSec > 0 ? (p.sec / maxSec * 96) : 0;

    const marker = document.createElement('div');
    marker.className = 'tl-marker';
    marker.style.left = pct + '%';
    marker.style.background = p.color;
    marker.title = p.name + ' · ' + fmtTime(p.sec);
    axis.appendChild(marker);

    const lbl = document.createElement('div');
    lbl.className = 'tl-label';
    lbl.style.left = pct + '%';
    lbl.style.color = p.color;
    lbl.textContent = p.name;
    axis.appendChild(lbl);

    const tl = document.createElement('div');
    tl.className = 'tl-time';
    tl.style.left = pct + '%';
    tl.textContent = fmtTime(p.sec);
    axis.appendChild(tl);
  });

  wrap.style.display = 'block';

  list.innerHTML = d.phases.map(p => `
    <div class="phase-row-tl">
      <div class="phase-dot-tl" style="background:${p.color}"></div>
      <div style="flex:1">
        <div class="phase-name" style="color:${p.color}">${p.name}</div>
        <div class="phase-note">${p.note}</div>
      </div>
      <div class="phase-time">${fmtTime(p.sec)}</div>
    </div>`).join('');
}

/* ══════════════════════════════
   DOSE CALCULATOR
══════════════════════════════ */
function calcDose() {
  let w = parseFloat(document.getElementById('weight-val').value);
  const unit  = document.getElementById('weight-unit').value;
  const proto = document.getElementById('proto-type').value;
  const egfr  = parseFloat(document.getElementById('egfr-val').value);
  if (!w || w <= 0) { alert('Please enter a valid weight.'); return; }
  if (unit === 'lbs') w = w * 0.453592;
  w = Math.round(w * 10) / 10;

  const cap   = parseInt(proto);
  const low   = Math.round(w * 1.0);
  const high  = Math.round(w * 1.5);
  const final = Math.min(high, cap);
  const rate  = proto === '100' ? '3–5 mL/s' : '4–5 mL/s';

  document.getElementById('r-wt').textContent    = w + ' kg';
  document.getElementById('r-low').textContent   = low + ' mL';
  document.getElementById('r-high').textContent  = high + ' mL';
  document.getElementById('r-cap').textContent   = cap + ' mL (protocol max)';
  document.getElementById('r-final').textContent = final + ' mL';
  document.getElementById('r-rate').textContent  = rate;

  const egfrRow = document.getElementById('r-egfr-row');
  if (!isNaN(egfr)) {
    egfrRow.style.display = 'flex';
    let msg = '';
    if (egfr >= 45)      msg = 'eGFR ' + egfr + ' — Contrast safe. Standard hydration.';
    else if (egfr >= 30) msg = 'eGFR ' + egfr + ' — Caution. IV hydration recommended. Avoid NSAIDs.';
    else if (egfr >= 15) msg = 'eGFR ' + egfr + ' — High risk. Discuss with radiologist. Consider alternative.';
    else                 msg = 'eGFR ' + egfr + ' — Contrast generally contraindicated. Radiologist decision required.';
    document.getElementById('r-egfr-msg').textContent = msg;
  } else {
    egfrRow.style.display = 'none';
  }

  document.getElementById('dose-result').classList.add('show');
}

/* ══════════════════════════════
   ORAL CONTRAST SCHEDULE
══════════════════════════════ */
const ORAL_SCHEMAS = {
  none:      { steps: [], note: 'No oral contrast required.' },
  water:     { note: 'Water oral contrast — negative contrast agent.',
    steps: [{ offset:-20, vol:'400 mL water', action:'Drink' },
            { offset:0,   vol:'400 mL water', action:'At table — drink before scan' }] },
  volumen:   { note: 'VoLumen/Breeza — neutral/negative low-density contrast. Distends small bowel.',
    steps: [{ offset:-60, vol:'450 mL (bottle 1)', action:'Drink 1st bottle' },
            { offset:-40, vol:'450 mL (bottle 2)', action:'Drink 2nd bottle' },
            { offset:-20, vol:'450 mL (bottle 3)', action:'Drink 3rd bottle' },
            { offset:0,   vol:'400 mL water',       action:'At table — water chaser' }] },
  barium:    { note: 'Barium 2.1% w/v — for iodine allergy patients requiring positive oral contrast.',
    steps: [{ offset:-60, vol:'225 mL barium', action:'Drink 1st half' },
            { offset:-30, vol:'225 mL barium', action:'Drink 2nd half' },
            { offset:0,   vol:'400 mL water',  action:'At table — water chaser' }] },
  iodinated: { note: 'Iodinated oral (Omnipaque 350: 50 mL in 1000 mL water) — suspected bowel leak or no IV contrast possible.',
    steps: [{ offset:-60, vol:'500 mL', action:'Drink 1st 500 mL' },
            { offset:-30, vol:'500 mL', action:'Drink 2nd 500 mL' },
            { offset:0,   vol:'400 mL water', action:'At table — water chaser' }] }
};

function updateOralFields() {
  const type   = document.getElementById('oral-type').value;
  const noteEl = document.getElementById('oral-note');
  const schema = ORAL_SCHEMAS[type];
  if (schema && schema.note && type !== 'none') {
    noteEl.style.display = 'block';
    noteEl.textContent = schema.note;
  } else {
    noteEl.style.display = 'none';
  }
}

function addMins(timeStr, mins) {
  const [h, m] = timeStr.split(':').map(Number);
  const total = h * 60 + m + mins;
  const nh = Math.floor(((total % 1440) + 1440) % 1440 / 60);
  const nm = ((total % 1440) + 1440) % 1440 % 60;
  return String(nh).padStart(2,'0') + ':' + String(nm).padStart(2,'0');
}

function calcSchedule() {
  const type   = document.getElementById('oral-type').value;
  const exam   = document.getElementById('exam-time').value || '10:00';
  const schema = ORAL_SCHEMAS[type];
  if (!schema || !schema.steps.length) {
    document.getElementById('sched-tbody').innerHTML = '<tr><td colspan="3" style="color:#4a6a99;text-align:center;">No oral contrast for this protocol.</td></tr>';
    document.getElementById('sched-result').classList.add('show');
    return;
  }
  const rows = schema.steps.map(s => {
    const t    = addMins(exam, s.offset);
    const when = s.offset === 0 ? 'At scan time' : (s.offset < 0 ? Math.abs(s.offset) + ' min before scan' : s.offset + ' min after scan');
    return `<tr><td>${t}</td><td>${s.action} <span style="color:#4a6a99;font-size:0.72rem;">(${when})</span></td><td>${s.vol}</td></tr>`;
  });
  rows.push(`<tr><td style="color:#eec040;font-weight:700;">${exam}</td><td style="color:#eec040;">📡 SCAN</td><td>—</td></tr>`);
  document.getElementById('sched-tbody').innerHTML = rows.join('');
  document.getElementById('sched-result').classList.add('show');
}

/* ══════════════════════════════
   RENAL RISK CHECKER
══════════════════════════════ */
function checkRenal() {
  const egfr    = parseFloat(document.getElementById('risk-egfr').value);
  const cr      = parseFloat(document.getElementById('risk-cr').value);
  const metform = document.getElementById('risk-metformin').value;
  const out     = document.getElementById('risk-output');
  let html = '';

  if (!isNaN(egfr)) {
    let cls, msg;
    if (egfr >= 45)      { cls='color:#5dcc88'; msg='✅ eGFR '+egfr+' — Low risk. Contrast safe. Standard IV hydration recommended.'; }
    else if (egfr >= 30) { cls='color:#eec040'; msg='⚠️ eGFR '+egfr+' — Moderate risk. Proceed with caution. IV hydration before and after. Avoid nephrotoxic agents. Recheck creatinine 48 hrs post.'; }
    else if (egfr >= 15) { cls='color:#f07070'; msg='🔴 eGFR '+egfr+' — High risk. Discuss with radiologist and nephrology. Consider alternative imaging. If contrast essential: minimize dose, hydrate aggressively.'; }
    else                 { cls='color:#f07070'; msg='🚫 eGFR '+egfr+' — Contrast generally contraindicated. Radiologist must decide. Patient may require dialysis after contrast if used.'; }
    html += `<div style="padding:8px 0;font-size:0.82rem;${cls};font-weight:600;">${msg}</div>`;
  }

  if (!isNaN(cr)) {
    let cmsg = '';
    if (cr > 1.5)      cmsg = '⚠️ Creatinine '+cr+' mg/dL — Elevated. Review eGFR for full risk picture.';
    else if (cr > 1.0) cmsg = '📋 Creatinine '+cr+' mg/dL — Mildly elevated. Monitor.';
    else               cmsg = '✅ Creatinine '+cr+' mg/dL — Within normal range.';
    html += `<div style="padding:8px 0;font-size:0.82rem;color:#9ab4d0;">${cmsg}</div>`;
  }

  if (metform === 'yes') {
    let mmsg = '';
    if (!isNaN(egfr) && egfr < 30)      mmsg = '🚫 Metformin: STOP immediately. eGFR <30 + contrast = high lactic acidosis risk. Do not restart until renal function confirmed stable (48–72 hrs post).';
    else if (!isNaN(egfr) && egfr < 45) mmsg = '⚠️ Metformin: Withhold for 48 hrs post-contrast. Restart only after creatinine rechecked and stable.';
    else                                mmsg = '📋 Metformin: Standard precaution — withhold on day of and 48 hrs after contrast. Restart when renal function confirmed stable.';
    html += `<div style="padding:8px 0;font-size:0.82rem;color:#eec040;">${mmsg}</div>`;
  }

  if (!html) html = '<div style="color:#4a6a99;font-size:0.82rem;">Please enter at least one value above.</div>';
  out.innerHTML = html;
  document.getElementById('risk-result').classList.add('show');
}

/* ── PROTOCOL CARD TOGGLE (accordion) ── */
function toggleCard(el) {
  const body   = el.querySelector('.proto-body');
  const isOpen = body.classList.contains('open');
  document.querySelectorAll('.proto-body').forEach(b => b.classList.remove('open'));
  document.querySelectorAll('.proto-card').forEach(c => c.style.borderColor = '');
  if (!isOpen) {
    body.classList.add('open');
    el.style.borderColor = '#2a6dbd';
  }
}

/* ── SEARCH + FILTER ── */
let currentCat = 'all';
function setCat(btn) {
  document.querySelectorAll('.fbtn').forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  currentCat = btn.dataset.cat;
  filterProtos();
}
function filterProtos() {
  const q = document.getElementById('search').value.toLowerCase();
  document.querySelectorAll('.proto-card').forEach(card => {
    const catOk    = currentCat === 'all' || card.dataset.cat === currentCat;
    const searchOk = !q || card.dataset.search.toLowerCase().includes(q) ||
                     card.querySelector('.proto-title').textContent.toLowerCase().includes(q);
    card.classList.toggle('hidden', !catOk || !searchOk);
  });
}

/* ── DECISION TREE ── */
function highlight(id) {
  document.querySelectorAll('.tree-section[id]').forEach(s => s.style.display = 'none');
  const el = document.getElementById(id);
  if (el) { el.style.display = 'block'; el.scrollIntoView({behavior:'smooth', block:'nearest'}); }
}

/* ── CHECKLIST PROGRESS ── */
function updateProgress() {
  const all  = document.querySelectorAll('#checklist input[type=checkbox]');
  const done = document.querySelectorAll('#checklist input[type=checkbox]:checked');
  const pct  = all.length ? Math.round(done.length / all.length * 100) : 0;
  document.getElementById('master-bar').style.width = pct + '%';
  document.getElementById('master-lbl').textContent = done.length + ' of ' + all.length + ' complete (' + pct + '%)';
}
document.querySelectorAll('#checklist input[type=checkbox]').forEach(cb => {
  cb.addEventListener('change', function() {
    this.closest('.cl-item').classList.toggle('done', this.checked);
    updateProgress();
  });
});
updateProgress();
