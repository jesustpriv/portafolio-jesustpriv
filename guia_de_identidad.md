# Guía de Identidad Visual: Portafolio Gabriel Tovar

Esta guía define el sistema de diseño (Design System) implementado durante la modernización del portafolio, asegurando una estética premium, tecnológica y coherente en todas las secciones.

## 🎨 Paleta de Colores
Utilizamos una paleta basada en **Zinc (Escala de Grises Profundos)** y un **Violeta Neón** para acentos de alta visibilidad.

| Elemento | Color (HEX) | Clase Tailwind | Uso |
| :--- | :--- | :--- | :--- |
| **Acento (Accent)** | `#B130FF` | `bg-accent`, `text-accent` | Botones principales, hover, bordes de interés. |
| **Fondo Primario** | `#09090b` | `bg-zinc-950` | Fondo general de la página (Deep Dark). |
| **Fondo Secundario** | `#18181b` | `bg-zinc-900` | Tarjetas, etiquetas de habilidades, contenedores. |
| **Texto Primario** | `#ffffff` | `text-white` | Encabezados (H1, H2) y texto crítico. |
| **Texto Secundario** | `#a1a1aa` | `text-zinc-400` | Descripciones, párrafos y etiquetas secundarias. |

---

## ✍️ Tipografía
La tipografía se ha seleccionado para proyectar modernidad y precisión técnica.

*   **Encabezados (Headings):** `Space Grotesk`
    *   *Estilo:* Geométrica y futurista. 
    *   *Uso:* Secciones de títulos, nombre personal y números de sección.
*   **Cuerpo y UI:** `Inter`
    *   *Estilo:* Humanista y altamente legible.
    *   *Uso:* Párrafos, enlaces de navegación, formularios y descripciones de proyectos.

---

## ✨ Estilos de Componentes (UI Tokens)

### 1. Efecto Glassmorphism
Para dar profundidad y un toque premium a la interfaz.
*   **Fondo:** `rgba(24, 24, 27, 0.7)` (con base Violeta Neón en capas superiores)
*   **Efecto:** `backdrop-filter: blur(12px)`
*   **Borde:** `1px solid rgba(255, 255, 255, 0.1)`

### 2. Formas y Bordes (Rounding)
*   **Botones de Acción:** `rounded-full` (Círculo perfecto en los extremos) para un look moderno y amigable.
*   **Tarjetas y Modales:** `rounded-2xl` (`1rem`) para mantener una estructura sólida pero suavizada.

---

## 🛡️ Principios de Diseño
1.  **Prioridad Visual:** El color Violeta Neón guía al usuario hacia la acción principal.
2.  **Harmonía:** El contraste entre el Zinc 950 y el Violeta B130FF maximiza el impacto visual sin sacrificar legibilidad.
3.  **Mantenibilidad:** El sistema usa variables CSS de Tailwind 4 (`--color-accent`) para facilitar cambios futuros.
