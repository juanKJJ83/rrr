# 📱 Tabla Posicional PWA - Guía de Despliegue

## 🎯 Opciones de Hosting Gratuito

### 1. **Netlify** (Recomendado)
**URL alternativa:** https://netlify.com/

**Pasos:**
1. Ve a https://netlify.com/
2. Haz clic en "Deploy to Netlify" o "Get started for free"
3. Arrastra y suelta el archivo `tabla-posicional-pwa.zip` en la zona de despliegue
4. ¡Listo! Tu PWA estará online en segundos

### 2. **Vercel**
**URL:** https://vercel.com/

**Pasos:**
1. Ve a https://vercel.com/
2. Crea una cuenta gratuita
3. Haz clic en "New Project"
4. Arrastra el archivo ZIP o sube los archivos individuales
5. Despliega automáticamente

### 3. **GitHub Pages**
**URL:** https://pages.github.com/

**Pasos:**
1. Crea un repositorio en GitHub
2. Sube todos los archivos (excepto server.ps1)
3. Ve a Settings > Pages
4. Selecciona la rama main como fuente
5. Tu PWA estará disponible en username.github.io/repositorio

### 4. **Firebase Hosting**
**URL:** https://firebase.google.com/

**Pasos:**
1. Ve a Firebase Console
2. Crea un nuevo proyecto
3. Habilita Hosting
4. Sube los archivos usando Firebase CLI o la consola web

## 📁 Archivos Incluidos en el ZIP

- `tabla-posicional-actualizada.html` - Página principal
- `tabla-posicional-actualizada.css` - Estilos
- `tabla-posicional-actualizada.js` - Funcionalidad
- `manifest.json` - Configuración PWA
- `sw.js` - Service Worker (funcionalidad offline)
- `icon-192.svg` - Icono 192x192
- `icon-512.svg` - Icono 512x512

## ⚠️ Notas Importantes

1. **NO subas** el archivo `server.ps1` - es solo para desarrollo local
2. **Asegúrate** de que todos los archivos estén en la raíz del hosting
3. **La PWA funcionará** automáticamente una vez desplegada
4. **Los usuarios podrán instalar** la app desde el navegador

## 🔧 Solución de Problemas

### Si Netlify Drop no funciona:
- Usa la URL principal: https://netlify.com/
- Crea una cuenta gratuita
- Usa el método de arrastrar y soltar desde el dashboard

### Si los iconos no aparecen:
- Verifica que los archivos SVG estén en la raíz
- Comprueba que el manifest.json esté correctamente configurado

### Si la PWA no se puede instalar:
- Asegúrate de que el sitio use HTTPS (automático en la mayoría de hostings)
- Verifica que el Service Worker se registre correctamente

## 🚀 Después del Despliegue

1. **Prueba la instalación** - Visita tu sitio y busca el botón "Instalar App"
2. **Verifica offline** - Instala la app y prueba sin conexión
3. **Comparte el enlace** - Tu PWA estará disponible para todos

## 📱 Características de la PWA

✅ **Instalable** como app nativa  
✅ **Funciona offline** después de la primera carga  
✅ **Responsive** - se adapta a móviles y escritorio  
✅ **Accesos directos** - Número aleatorio y ayuda  
✅ **Iconos nativos** - Aparece como app real en el dispositivo  

---

**¡Tu aplicación educativa ya está lista para ser una PWA profesional!** 🎉