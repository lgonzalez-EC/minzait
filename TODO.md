# TODO: Añadir Sección de Galería

## Información Recopilada
- El sitio usa Bootstrap 5, Isotope (incluido), Lightbox (incluido), AOS para animaciones.
- Sección portafolio actual usa filtrado con Isotope, pero no masonry.
- Librerías disponibles: Isotope para masonry, Lightbox para modal.
- Imágenes disponibles en img/ (portfolio-*.webp, etc.).

## Plan
- [ ] Añadir sección HTML de galería después del portafolio en index.html
- [ ] Crear CSS para layout masonry responsivo y hover zoom en style-optimized.css
- [ ] Añadir JavaScript para inicializar Isotope y Lightbox en main.js
- [ ] Seleccionar imágenes para la galería (usar portfolio-*.webp existentes)
- [ ] Probar responsividad y funcionalidad

## Dependencias
- index.html: Añadir sección galería
- css/style-optimized.css: Estilos para galería
- js/main.js: Inicialización de Isotope y Lightbox
- Imágenes: Usar existentes de img/

## Pasos de Implementación
1. Editar index.html para añadir sección galería con grid de imágenes.
2. Editar style-optimized.css para añadir estilos de masonry y hover.
3. Editar main.js para inicializar Isotope en la galería y Lightbox.
4. Probar en navegador.

## Notas
- Usar Isotope para masonry layout responsivo.
- Hover zoom con CSS transitions.
- Lightbox para modal con cierre por botón o clic fuera.
- Asegurar responsividad con media queries.
