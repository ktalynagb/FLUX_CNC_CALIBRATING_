/* ============================================================
   nav.js — Módulo compartido de navegación y utilidades
   ============================================================ */

/* ─── NAVEGACIÓN ACTIVA ───────────────────────────────────── */
function setActiveNav() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-item').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ─── SIDEBAR TOGGLE (MOBILE) ─────────────────────────────── */
function initSidebar() {
  const toggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  if (!toggle || !sidebar) return;
  toggle.addEventListener('click', () => sidebar.classList.toggle('open'));
  document.addEventListener('click', e => {
    if (!sidebar.contains(e.target) && !toggle.contains(e.target)) {
      sidebar.classList.remove('open');
    }
  });
}

/* ─── ACCORDION ───────────────────────────────────────────── */
function initAccordions() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const body = header.nextElementSibling;
      const isOpen = header.classList.contains('open');
      // cerrar todos del mismo grupo si se quiere exclusividad
      header.classList.toggle('open', !isOpen);
      if (body) body.classList.toggle('open', !isOpen);
    });
  });
}

/* ─── CHECKLISTS CON PERSISTENCIA ────────────────────────── */
function initChecklists(namespace) {
  const items = document.querySelectorAll('.check-item');
  items.forEach((item, i) => {
    const key = `cnc_check_${namespace}_${i}`;
    if (localStorage.getItem(key) === '1') applyCheck(item, true);
    item.addEventListener('click', () => {
      const checked = item.classList.toggle('checked');
      applyCheck(item, checked);
      localStorage.setItem(key, checked ? '1' : '0');
      updatePhaseProgress();
    });
  });
}

function applyCheck(item, checked) {
  item.classList.toggle('checked', checked);
  const box = item.querySelector('.check-box');
  if (box) box.textContent = checked ? '✓' : '';
}

/* ─── PROGRESS UPDATE ─────────────────────────────────────── */
function updatePhaseProgress() {
  const total   = document.querySelectorAll('.check-item').length;
  const done    = document.querySelectorAll('.check-item.checked').length;
  const pct     = total > 0 ? Math.round((done / total) * 100) : 0;
  const fill    = document.getElementById('phaseProgressFill');
  const label   = document.getElementById('phaseProgressLabel');
  if (fill)  fill.style.width = pct + '%';
  if (label) label.textContent = `${done} / ${total} completados`;
  localStorage.setItem('cnc_phase_' + getCurrentPage(), pct);
  refreshDashboardBadges();
}

function getCurrentPage() {
  return window.location.pathname.split('/').pop().replace('.html', '') || 'index';
}

/* ─── DASHBOARD BADGES (sidebar) ─────────────────────────── */
function refreshDashboardBadges() {
  const pages = ['fase1','fase2','fase3','fase4','fase5','fase6','fase7'];
  pages.forEach(p => {
    const pct = parseInt(localStorage.getItem('cnc_phase_' + p) || '0');
    const badge = document.querySelector(`.nav-badge[data-page="${p}"]`);
    if (!badge) return;
    if (pct >= 100) {
      badge.textContent = '✓'; badge.className = 'nav-badge done';
    } else if (pct > 0) {
      badge.textContent = pct + '%'; badge.className = 'nav-badge active-badge';
    }
  });
}

/* ─── TABLAS INTERACTIVAS ─────────────────────────────────── */
function initDataTable(tableId, config) {
  const table = document.getElementById(tableId);
  if (!table) return;
  const inputs = table.querySelectorAll('.table-input[data-col="measured"]');
  inputs.forEach(inp => {
    const saved = localStorage.getItem(`cnc_tbl_${tableId}_${inp.dataset.row}`);
    if (saved) inp.value = saved;
    inp.addEventListener('input', () => {
      localStorage.setItem(`cnc_tbl_${tableId}_${inp.dataset.row}`, inp.value);
      recalcTable(table, config);
    });
  });
  recalcTable(table, config);
}

function recalcTable(table, cfg) {
  const rows  = table.querySelectorAll('tbody tr');
  const vals  = [];
  rows.forEach((row, i) => {
    const target  = parseFloat(row.querySelector('[data-col="target"]')?.textContent || row.querySelector('[data-col="target"]')?.value || cfg.target || 0);
    const measInp = row.querySelector('[data-col="measured"]');
    const meas    = parseFloat(measInp?.value);
    if (!isNaN(meas)) {
      const err = meas - target;
      vals.push({ meas, err, target });
      setCell(row, 'error', err.toFixed(4));
      colorInput(measInp, Math.abs(err), cfg);
      setCell(row, 'status', statusIcon(Math.abs(err), cfg));
    }
  });
  if (vals.length === 0) return;
  const errs = vals.map(v => Math.abs(v.err));
  const avg  = errs.reduce((a,b)=>a+b,0) / errs.length;
  const max  = Math.max(...errs);
  const min  = Math.min(...errs);
  const std  = Math.sqrt(errs.map(e=>(e-avg)**2).reduce((a,b)=>a+b,0)/errs.length);
  const pct  = cfg.target ? (avg / Math.abs(cfg.target)) * 100 : null;
  const sum  = document.getElementById(table.id + '_summary');
  if (sum) {
    sum.querySelector('[data-stat="avg"]')  && (sum.querySelector('[data-stat="avg"]').textContent  = avg.toFixed(4) + ' mm');
    sum.querySelector('[data-stat="max"]')  && (sum.querySelector('[data-stat="max"]').textContent  = max.toFixed(4) + ' mm');
    sum.querySelector('[data-stat="min"]')  && (sum.querySelector('[data-stat="min"]').textContent  = min.toFixed(4) + ' mm');
    sum.querySelector('[data-stat="std"]')  && (sum.querySelector('[data-stat="std"]').textContent  = std.toFixed(4) + ' mm');
    sum.querySelector('[data-stat="pct"]')  && (sum.querySelector('[data-stat="pct"]').textContent  = pct ? pct.toFixed(2)+'%' : '—');
    const verdict = sum.querySelector('[data-stat="verdict"]');
    if (verdict) {
      if (avg <= cfg.pass)       { verdict.innerHTML = '<span class="badge badge-green">🟢 APROBADO</span>'; }
      else if (avg <= cfg.warn)  { verdict.innerHTML = '<span class="badge badge-yellow">🟡 ACEPTABLE</span>'; }
      else                        { verdict.innerHTML = '<span class="badge badge-red">🔴 REQUIERE AJUSTE</span>'; }
    }
  }
}

function setCell(row, col, html) {
  const cell = row.querySelector(`[data-col="${col}"]`);
  if (cell) cell.innerHTML = html;
}
function colorInput(inp, absErr, cfg) {
  inp.classList.remove('ok','warn','fail');
  if      (absErr <= cfg.pass) inp.classList.add('ok');
  else if (absErr <= cfg.warn) inp.classList.add('warn');
  else                          inp.classList.add('fail');
}
function statusIcon(absErr, cfg) {
  if (absErr <= cfg.pass) return '<span class="badge badge-green" style="font-size:10px">✓</span>';
  if (absErr <= cfg.warn) return '<span class="badge badge-yellow" style="font-size:10px">~</span>';
  return '<span class="badge badge-red" style="font-size:10px">✗</span>';
}

/* ─── EXPORTAR CSV ────────────────────────────────────────── */
function exportCSV(tableId, filename) {
  const table = document.getElementById(tableId);
  if (!table) return;
  let csv = '';
  table.querySelectorAll('tr').forEach(row => {
    const cells = [...row.querySelectorAll('th,td')].map(c => {
      const inp = c.querySelector('input');
      return '"' + (inp ? inp.value : c.textContent.trim()).replace(/"/g,'""') + '"';
    });
    csv += cells.join(',') + '\n';
  });
  downloadFile(csv, filename || tableId + '.csv', 'text/csv');
}

/* ─── EXPORTAR PDF (print) ────────────────────────────────── */
function exportPDF() { window.print(); }

/* ─── DOWNLOAD HELPER ─────────────────────────────────────── */
function downloadFile(content, filename, type) {
  const blob = new Blob([content], { type });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

/* ─── INIT GLOBAL ─────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
  initSidebar();
  initAccordions();
  refreshDashboardBadges();
});
