# Mundo Parkinson — Reglas de diseño y desarrollo

Este documento es la referencia obligatoria para todo el sitio. Antes de crear o modificar una sección, respetar estas reglas y tomar el archivo Figma como fuente visual principal.

## 1. Tecnología

- HTML5 semántico.
- CSS3 puro.
- JavaScript puro.
- No usar React.
- No usar Tailwind.
- No usar Bootstrap.
- No usar frameworks ni librerías externas.
- El sitio se publicará en GitHub Pages.
- El código debe ser claro, comentado y fácil de editar.

## 2. Fuente de verdad

Diseño Figma:

https://www.figma.com/design/xycnID6neHNhyhDXckYPII/MP-web?node-id=22-459

- Respetar la composición, paleta, degradados, jerarquías, alineaciones, proporciones y continuidad cromática.
- No reinterpretar el diseño.
- Adaptar únicamente lo necesario para responsive y accesibilidad.
- No inventar imágenes, textos, colores, iconos ni componentes.

## 3. Paleta

```css
--violeta-header: #22123F;
--violeta-botones: #5B2070;
--verde-agua: #D4E7D0;
--rosa: #FFABB6;
--crema: #F4E7C2;
--amarillo: #EDFF61;
--amarillo-fluo: #E0FF37;
--violeta-seccion: #2D1A3E;
--blanco: #FFFFFF;
--negro: #0B0B0B;
```

## 4. Botones

- Todos los botones deben pertenecer a uno de estos dos sistemas: botones con filete violeta o botones amarillos.
- No mezclar ambos comportamientos.
- Todos los botones comparten transición uniforme, leve desplazamiento vertical y conservación del borde de 2 px.

### Botones con filete violeta

- Uso: CTA principales.
- Estado normal: fondo transparente, borde violeta de 2 px y texto violeta.
- Hover: fondo violeta, texto blanco, mismo borde violeta, leve elevación y transición global.

### Botones amarillos

- Mantener el comportamiento actual del sitio.
- Estado normal: fondo amarillo flúo y texto violeta.
- Hover: invertir según el sistema definido para los botones amarillos.
- Conservar la misma transición y movimiento global.

### Iconos

- Los iconos dentro de botones deben permanecer visibles en estado normal y hover.
- Cuando sea posible, los SVG deben prepararse para acompañar el color del texto; si se usan como imagen externa, aplicar filtro o variante local equivalente.
- Los iconos dentro de botones deben mantener tamaño fijo, centrado y sin deformación.
- Las redes del header usan contenedor circular uniforme; en hover muestran filete amarillo fluo de 2 px, fondo transparente y desplazamiento vertical sutil.
- Los iconos de tarjetas deben vivir en un espacio visual común, con `object-fit: contain`, sin deformar ni cambiar el tamaño de la tarjeta.
