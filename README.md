# 🚀 Marca Personal — Gabriel Tovar

Sitio web oficial de **Gabriel Tovar**, especialista en Coordinación de Producción enfocado en contenido gráfico, audiovisual y estratégico, y Co-CEO de [Coder.y](https://coder-ytech.netlify.app/).

## ✨ Modernización a Marca Personal (2024-2026)

Este proyecto evolucionó de un "Portafolio Tradicional" a una plataforma de **Marca Personal** de alto nivel, ajustando su narrativa para priorizar la autoridad, la identidad y la experiencia de usuario:

- 👤 **Narrativa Orientada a Resultados**: Reestructuración del flujo de información situando el Perfil y la autoridad antes de los entregables visuales, promoviendo mayor confianza.
- 🖼️ **Portafolio Dividido 1:1**: Galería interactiva con división dual (Diseño Gráfico / Fotografía) usando cuadrículas inteligentes de formato cuadrado 1:1, garantizando que ninguna miniatura sufra deformación o estiramiento.
- 🎨 **Estética Premium 'Dark Tech'**: Esquema visual con superficies oscuras y acentos **Violeta Neón (#B130FF)** acompañado de elementos Glassmorphism y micro-animaciones fluidas.
- 🧹 **Saneamiento Absoluto**: El código cuenta con estructuración semántica impecable y formato auto-pulido, logrando un empaquetado ultra-liviano (< 10KB comprimidos).

## 🛠️ Stack Tecnológico

- **Core**: HTML5 Semántico + TypeScript Nativo
- **Estilos**: [Tailwind CSS 4](https://tailwindcss.com/) (Integración vía `@tailwindcss/vite`)
- **Renderizado / Build**: [Vite 6](https://vitejs.dev/)
- **Procesamiento de Imágenes**: [Sharp](https://sharp.pixelplumbing.com/) (Entregando WebP optimizado nativamente)
- **Despliegue**: Netlify (CI/CD Automatizado)

## 🚀 Instalación y Desarrollo

### Requisitos Previos

- Node.js (v18 o superior)
- npm o yarn

### Entorno Local

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/jesustpriv/portafolio-jesustpriv.git
   cd portafolio-jesustpriv
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Iniciar servidor de desarrollo**:
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**: `http://localhost:3000`

### Build de Producción

Para compilar hacia producción, ejecuta:
```bash
npm run build
```
El build list para publicar se compilará compactado y ofuscado en la carpeta `dist/`.

## 📁 Estructura del Proyecto

```
portafolio-jesustpriv/
├── assets/                  # Todas las fotos y portafolios (Originales WebP)
├── dist/                    # Bundle de producción automatizado listo para deploy
├── src/                     # Código fuente lógico y visual dinámico
│   ├── main.ts              # Control bi-modal de la Galería 1:1 y menús
│   └── index.css            # Estilos base y tokens puros de CSS orientados a Tailwind 4
├── index.html               # Punto de entrada. Arquitectura HTML Semántica perfecta
├── netlify.toml             # Cabeceras y enrutamiento para hosts tipo Netlify
├── package.json             # Scripts de compilación local y devDependencies
├── vite.config.ts           # Configuración del compresor de Vite/Tailwind 4
└── README.md                # Este archivo de documentación
```

## 📊 Rendimiento y Accesibilidad

Se eliminó y purgó código flotante logrando:
- **Performance de Carga**: Renderizado total garantizado sin render-blocking gracias al árbol minificado de Vite.
- **Auditoría Semántica**: Etiquetado lógico y coherente para una accesibilidad (A11y) nivel 100%.

## 📧 Contacto

- 📧 **Email**: [jesustpriv@gmail.com](mailto:jesustpriv@gmail.com)
- 📱 **WhatsApp Consultoría**: +58 424-359-1727
- 📍 **Sede**: San Juan de los Morros, Guárico, Venezuela
- 💼 **LinkedIn**: [Perfil Profesional](https://linkedin.com/in/gabriel-tovar-486888233)
- 🐙 **GitHub**: [jesustpriv](https://github.com/jesustpriv)
- 🌐 **Empresa (Coder.y)**: [coder-ytech.netlify.app](https://coder-ytech.netlify.app/)

## 📄 Licencia

© 2019-2026 Gabriel Tovar. Todos los derechos reservados.

---

**Desempeño técnico por AI-Assisted Development**
