/* ============================================================
   sidebar.js — Inyecta la barra lateral en todas las páginas
   ============================================================ */

(function injectSidebar() {
  const html = `
  <aside class="sidebar" id="sidebar">
    <div class="sidebar-logo">
      <div class="logo-mark">⚙ Manual de Calibración</div>
      <h1>CNC 3018 PRO B2</h1>
      <p>Protocolo oficial · v1.0</p>
    </div>

    <nav class="sidebar-nav">
      <div class="nav-group">
        <div class="nav-group-label">Inicio</div>
        <a href="index.html" class="nav-item">
          <span class="nav-icon">🏠</span> Dashboard
        </a>
        <a href="herramientas.html" class="nav-item">
          <span class="nav-icon">🔧</span> Herramientas
        </a>
      </div>

      <div class="nav-group">
        <div class="nav-group-label">Protocolo de calibración</div>
        <a href="fase1.html" class="nav-item">
          <span class="nav-icon">🧹</span> Fase 1 — Preparación mecánica
          <span class="nav-badge" data-page="fase1">—</span>
        </a>
        <a href="fase2.html" class="nav-item">
          <span class="nav-icon">🔩</span> Fase 2 — Calibración subconjuntos
          <span class="nav-badge" data-page="fase2">—</span>
        </a>
        <a href="fase3.html" class="nav-item">
          <span class="nav-icon">🏗️</span> Fase 3 — Ensamblaje progresivo
          <span class="nav-badge" data-page="fase3">—</span>
        </a>
        <a href="fase4.html" class="nav-item">
          <span class="nav-icon">📐</span> Fase 4 — Verificación geométrica
          <span class="nav-badge" data-page="fase4">—</span>
        </a>
        <a href="fase5.html" class="nav-item">
          <span class="nav-icon">🌀</span> Fase 5 — Calibración spindle
          <span class="nav-badge" data-page="fase5">—</span>
        </a>
        <a href="fase6.html" class="nav-item">
          <span class="nav-icon">📏</span> Fase 6 — Pasos por milímetro
          <span class="nav-badge" data-page="fase6">—</span>
        </a>
        <a href="fase7.html" class="nav-item">
          <span class="nav-icon">✅</span> Fase 7 — Validación final
          <span class="nav-badge" data-page="fase7">—</span>
        </a>
      </div>
    </nav>

    <div class="sidebar-footer">
      Basado en videos YouTube<br>+ protocolo técnico oficial
    </div>
  </aside>`;

  const target = document.getElementById('sidebar-mount');
  if (target) target.outerHTML = html;
})();
