/**
 * INDUSTRIAL PROCESS REPORT — app.js
 * Lógica pura en Vanilla JS para registro rápido de parámetros industriales,
 * gestión del formulario y preparación de impresión en una sola página A4.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elementos principales
  const btnPrint = document.getElementById('btn-print');
  const metaFecha = document.getElementById('meta-fecha');

  // Inicializar fecha actual por defecto
  function initDefaultDate() {
    if (metaFecha && !metaFecha.value) {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      metaFecha.value = `${yyyy}-${mm}-${dd}`;
    }
  }

  // --------------------------------------------------------------------------
  // IMPRIMIR INFORME
  // --------------------------------------------------------------------------
  if (btnPrint) {
    btnPrint.addEventListener('click', () => {
      window.print();
    });
  }

  // --------------------------------------------------------------------------
  // NAVEGACIÓN ÁGIL CON TECLADO
  // Permite saltar entre celdas numéricas con Enter para carga ultra rápida
  // --------------------------------------------------------------------------
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target && e.target.matches('input[type="number"], input[type="text"]')) {
      e.preventDefault();
      const allInputs = Array.from(
        document.querySelectorAll('input:not([type="hidden"]), select, textarea')
      );
      const currentIndex = allInputs.indexOf(e.target);
      if (currentIndex >= 0 && currentIndex < allInputs.length - 1) {
        allInputs[currentIndex + 1].focus();
        if (allInputs[currentIndex + 1].select) {
          allInputs[currentIndex + 1].select();
        }
      }
    }
  });

  // Iniciar fecha por defecto
  initDefaultDate();
});
