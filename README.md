# Portafolio Profesional – Gabriel Tovar

Este repositorio contiene el código fuente de mi portafolio profesional y sitio de servicios de diseño. Es una Landing Page estructurada como Single-Page Application (SPA), enfocada en un alto rendimiento, diseño premium ("Dark Tech") e interacciones seguras a través de formularios encapsulados.

## 🚀 Arquitectura y Tecnologías

El sitio está construido utilizando herramientas modernas optimizadas para despliegue estático y rápido.

- **Vite**: Para la construcción y empaquetado ultra-rápido (`esbuild` minify activado).
- **Tailwind CSS v4**: El sistema de diseño se basa en un enfoque de utilidades para crear la estética 'Glassmorphism' y 'Neon Violet'.
- **HTML5 & Vanilla JS**: Elementos interactivos (como el menú móvil, validación de formularios, botones modales y animaciones en scroll) son construidos usando Javascript nativo, sin dependencias pesadas como React o librerías adicionales, lo cual garantiza que el peso del sitio sea mínimo.
- **Netlify Forms**: Todo el backend del contacto y contratación de "Planes de Diseño" depende de un motor interno de Netlify.

---

## 🔒 Privacidad y Seguridad (Anti-Scraping)

El proyecto contiene lineamientos claros de seguridad antes de cada subida a GitHub al ser un repositorio público:

- **Ofuscación de Enlaces de Contacto:** Todos los enlaces salientes directos (`wa.me` de WhatsApp y correos electrónicos `mailto:`) no existen como texto plano en el árbol del DOM. Se integran a través de eventos `.onclick` codificados en Base64, evitando que los bots puedan rastrear y escanear direcciones de correo o el número telefónico personal.
- **Sin Dependencias Innecesarias:** El `package.json` ha sido saneado de dependencias en desuso, y las ramas Git de experimentación o scripts temporales han sido purgados previniendo la fuga de información descartada.
- **Protección de Formularios:** Los modales de Planes están estructurados usando intercepciones (intercept `submit`), lo que valida los términos y condiciones directamente en el cliente y utiliza "Honeypots" (`bot-field`) para asegurar que el flujo detenga bots invasivos.

---

## 📦 Estructura del Proyecto

```text
/
├── assets/             # Imágenes optimizadas para web (WebP/SVG)
├── dist/               # Directorio del build de producción (generado)
├── src/                
│   ├── main.ts         # Orquestador del frontend (modales, scroll, animación menú)
│   └── index.css       # Reglas base de tipografía Tailwind y clases .glass-premium
├── index.html          # Interfaz principal estática y marcadores Netlify
├── package.json        # Dependencias de entorno
├── vite.config.ts      # Configuración del servidor de Vit y Build
└── netlify.toml        # Archivo de configuración oficial de Netlify
```

---

## ⚙️ Despliegue e Instrucciones de Uso

### Desarrollo Local
Para trabajar en este proyecto localmente:

1. Instala las dependencias:
   ```bash
   npm install
   ```
2. Levanta el servidor local optimizado de Vite:
   ```bash
   npm run dev
   ```
   *Estará disponible en `http://localhost:3000`*.

### Producción & Netlify
Este proyecto está 100% configurado para Despliegue Continuo (CD) a través de Netlify enganchado a GitHub.

1. Netlify ejecutará el comando definido en el empaquetador Vite:
   ```bash
   npm run build
   ```
2. Emitirá todos los archivos optimizados a la carpeta `dist`.
3. Escaneará automáticamente el HTML buscando la flag `data-netlify="true"`, para inicializar los Webhooks de los formularios y vincularlos a los Modales de servicio.

---

_Diseñado y construido para uso personal y escalabilidad técnica_ - Gabriel Tovar.
