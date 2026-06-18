# FLUX_CNC_CALIBRATING_

**Manual Interactivo de Calibración y Verificación para CNC 3018 PRO B2**

🌐 **Page:** https://ktalynagb.github.io/FLUX_CNC_CALIBRATING_/

---

Aplicación web interactiva que guía paso a paso el proceso completo de ensamblaje, alineación y calibración de una CNC 3018 PRO B2. Diseñada para estudiantes de ingeniería y técnicos que calibran la máquina por primera vez.

## ¿Qué incluye?

7 fases de calibración con procedimientos, tablas de medición editables, cálculos automáticos y referencias a video con timestamps exactos:

1. **Fase 1** — Limpieza y lubricación de ejes
2. **Fase 2** — Calibración individual de subconjuntos (Z e Y)
3. **Fase 3** — Ensamblaje progresivo (Z+X → X-Z+Y)
4. **Fase 4** — Verificación geométrica (nivelación y perpendicularidad X-Y, X-Z, Y-Z)
5. **Fase 5** — Calibración del spindle (tramming y runout)
6. **Fase 6** — Calibración de pasos por milímetro ($100, $101, $102 en GRBL)
7. **Fase 7** — Validación final con tabla maestra y registro de calibración

## Características

- Tablas interactivas con cálculo automático (promedio, error máximo, desviación estándar)
- Semáforo de validación 🟢 🟡 🔴 por prueba
- Checklists con persistencia en localStorage
- Dashboard de progreso por fase
- Exportación a CSV y PDF
- Referencias directas a YouTube con timestamp exacto
- Sin dependencias externas — funciona abriendo `index.html` en cualquier navegador

## Tecnologías

HTML · CSS · JavaScript Vanilla

---

Desarrollado por **FLUX Solutions Cali** · Universidad Autónoma de Occidente
