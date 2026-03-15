# 🔒 Configuración de Privacidad para Producción

## 📋 Información Protegida

### ✅ Datos Reemplazados en el Repositorio Público:
- **Email**: `jesustpriv@gmail.com` → `contacto@gabriel-tovar.com`
- **WhatsApp**: `584243591727` → `584000000000`
- **Formspree**: `xojnklda` → `your-form-id`

### 🔒 Variables de Entorno (Privadas)

#### Para Desarrollo Local:
1. **Crea `.env.local`**:
   ```
   EMAIL_CONTACTO=tu-email-real@gmail.com
   WHATSAPP_NUMBER=584243591727
   FORMSPREE_ENDPOINT=https://formspree.io/f/xojnklda
   ```

2. **Añade a `.gitignore`** (ya configurado):
   ```
   .env.local
   .env.production
   ```

#### Para Netlify (Producción):
1. **Ve a Netlify** → **Site settings** → **Build & deploy** → **Environment**
2. **Añade variables**:
   - `EMAIL_CONTACTO`: tu-email-real@gmail.com
   - `WHATSAPP_NUMBER`: 584243591727
   - `FORMSPREE_ENDPOINT`: https://formspree.io/f/xojnklda

## 🛡️ Medidas de Seguridad Implementadas

### ✅ Protección en Código:
- **Sin datos reales** en el repositorio público
- **Variables de entorno** para información sensible
- **Placeholders seguros** en el código fuente
- **Formspree desactivado** hasta configuración

### 🔒 Configuración Netlify:
- **Environment variables** para datos reales
- **Build seguro** sin exponer información
- **Deploy automático** con protección

## 🚀 Instrucciones de Despliegue Seguro

### Paso 1: Preparar Variables
```bash
# No incluyas datos reales en commits
# Usa variables de entorno en Netlify
```

### Paso 2: Configurar Netlify
1. **Conecta repo** a Netlify
2. **Configura variables de entorno**
3. **Activa Formspree** con tu ID real
4. **Deploy** con información protegida

### Paso 3: Verificar
- ✅ **Sin datos personales** en el código público
- ✅ **Contacto funcional** en producción
- ✅ **Formspree activado** con tu endpoint
- ✅ **WhatsApp funcionando** con tu número

## 📱 Contacto Real (Solo Producción)

En producción, el contacto mostrará:
- **Email real**: Configurado en Netlify
- **WhatsApp real**: Configurado en Netlify
- **Formspree real**: Configurado en Netlify

## 🔐 Buena Práctica

**Nunca subas información personal real a repositorios públicos.**

Usa siempre:
- Variables de entorno
- Configuración separada
- Datos de ejemplo en código
- Producción con configuración real
