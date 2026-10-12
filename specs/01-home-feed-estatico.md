# SPEC 01 — Home Feed estático (réplica del mockup)

> **Estado:** Implementado
> **Depende de:** ninguna
> **Fecha:** 2026-10-09
> **Objetivo:** Implementar la pantalla Feed del mockup como home `/` con datos mock y fidelidad visual exacta en desktop, más una adaptación mobile con drawer hamburguesa y FAB.

## Por qué existe esta spec

Es la primera pantalla de la app. Además de la página en sí, establece la base visual (tokens de diseño, tipografías) que reutilizarán las specs futuras de las demás pantallas.

## Scope

**In:**

- Reemplazo del scaffold de `app/page.tsx` por el Feed del mockup `references/pantallas/feed.dc.html`.
- Sidebar desktop fijo de 248px: logo OpenDayCare · Sala Soles, botón "Nueva publicación", nav (Feed/Niños/Avisos/Mi cuenta) y footer de usuario (Caro Giménez + logout).
- Contenido del feed: saludo "Buenas, Caro", trigger "Compartí un momento…", separador "PUBLICADO HOY" y las 3 publicaciones del mockup (logro, actividad con placeholder de foto, anuncio) con chips de tipo, corazones, comentarios y "Editar".
- Tipografías Fredoka + Nunito vía `next/font/google` en `app/layout.tsx` (reemplazan las Geist del scaffold).
- Tokens de diseño (colores, fuentes, radios, sombras) en `app/globals.css` con Tailwind v4 `@theme`, valores exactos del mockup. Sin dark mode.
- Datos mock en `app/lib/mock-feed.ts`.
- Adaptación mobile (<1024px): header compacto con botón hamburguesa que abre un drawer con la misma navegación, y FAB fijo "Nueva publicación" con el gradiente coral.
- `<html lang="es">` y metadata de título de la app.

**Out of scope (para specs futuras):**

- Rutas reales de Niños, Avisos, Mi cuenta, crear-publicación, detalle-publicación y login (los ítems quedan visuales, sin navegación).
- Autenticación y base de datos.
- Interactividad de corazones, comentarios y "Editar" (visual estático).
- Fotos reales: el recuadro de foto queda como placeholder punteado igual al mockup.
- Las demás pantallas de `references/pantallas/`.

## Modelo de datos

```ts
// app/lib/mock-feed.ts — constantes estáticas, sin persistencia
type TipoPost = "logro" | "actividad" | "anuncio";

interface PostMock {
  id: string;
  tipo: TipoPost;
  autor: string;          // "Mateo" | "Anuncio general"
  iniciales?: string;     // "M" para los posts de niño
  hora: string;           // "14:20"
  destinatarios: string;  // "familia de Mateo" | "toda la sala"
  texto: string;
  foto?: { etiqueta: string }; // placeholder punteado, sin archivo
  corazones: number;
  comentarios: number;
}

const usuarioActual = {
  nombre: "Caro Giménez",
  rol: "Maestra",
  sala: "Soles",
  iniciales: "C",
};

const feedPosts: PostMock[] = [/* los 3 posts del mockup */];
```

Esta spec no introduce persistencia de ningún tipo.

## Plan de implementación

1. `app/layout.tsx`: intercambiar Geist por Fredoka + Nunito con `next/font/google`, `lang="es"` y metadata "OpenDayCare". Verificación manual: `npm run dev` carga la home con las tipografías nuevas.
2. `app/globals.css`: tokens `@theme` con los valores exactos del mockup (fondo `#F6ECDF`, tarjeta `#FFFDF9`, borde `#ECE0D0`, texto `#3F362E`, coral `#E0654A`/`#D9583C`/`#C5503A`, chips verde/celeste/azul, sombras), variables de fuente y scrollbar personalizado; eliminar el dark mode del scaffold. Verificación: la app ya no cambia a oscuro.
3. `app/lib/mock-feed.ts`: crear `usuarioActual` y `feedPosts` con el contenido textual exacto del mockup. Verificación: `npx tsc --noEmit` sin errores.
4. `app/components/sidebar.tsx`: sidebar desktop (server component) con ítems sin navegación y Feed marcado activo.
5. `app/components/post-card.tsx`: tarjeta de post con avatar/ícono, chip de tipo (LOGRO/ACTIVIDAD/ANUNCIO con sus colores), destinatarios, texto, placeholder de foto y contadores — todo estático.
6. `app/page.tsx`: composición desktop del feed (sidebar + main con saludo, trigger, separador y los 3 posts desde `feedPosts`). Verificación manual: comparación lado a lado contra `references/pantallas/feed.dc.html`.
7. `app/components/mobile-header.tsx` (client component): header compacto + drawer reutilizando el contenido del sidebar, y FAB fijo "Nueva publicación". Sidebar visible ≥lg, patrón mobile <lg. Verificación: dev tools a 390px de ancho.
8. Verificación final: `npm run lint` y `npm run build` sin errores; captura con Playwright en `.playwright-mcp/` comparada con `references/screenshots/feed.png`.

## Criterios de aceptación

- [x] Con viewport ≥1024px la home se ve idéntica al mockup: mismos colores, tipografías, tamaños, sombras, chips y textos de los 3 posts.
- [x] Con viewport <1024px no se muestra el sidebar; hay header con hamburguesa que abre un drawer con la misma navegación, y un FAB "Nueva publicación".
- [x] El drawer abre y cierra (botón hamburguesa y overlay/cerrar) sin errores en consola.
- [x] Ítems de navegación, "Editar", corazones y comentarios no navegan ni cambian estado.
- [x] El recuadro de foto es un placeholder punteado con ícono de cámara y etiqueta "Foto · pintando con témperas".
- [x] `npm run lint` y `npm run build` pasan sin errores.
- [x] `<html lang="es">` y título de pestaña "OpenDayCare".

## Decisiones

- **Sí:** `next/font/google` para Fredoka + Nunito — self-hosted, sin CLS, idiomático en Next 16. **No:** `<link>` al CDN como el mockup — dependencia externa en runtime.
- **Sí:** tokens Tailwind v4 en `globals.css` con valores exactos del mockup — base visual para specs futuras. **No:** inline styles 1:1 — inmantenible.
- **Sí:** datos mock en `app/lib/mock-feed.ts` — punto único a reemplazar cuando llegue la BD. **No:** contenido inline en JSX.
- **Sí:** ítems de navegación y acciones como elementos visuales sin acción. **No:** enlaces a rutas que hoy darían 404.
- **Sí:** mobile con drawer hamburguesa + FAB; breakpoint `lg` (1024px) — decisión del usuario. **No:** tabs inferiores ni chips.
- **Sí:** eliminar el dark mode del scaffold — el mockup es solo claro.
- **Sí:** quitar el título "Create Next App" y los restos del scaffold (página default, dark mode).

## Riesgos

| Riesgo | Mitigación |
| --- | --- |
| Fidelidad visual degradada al traducir inline styles a Tailwind | Usar valores arbitrarios literales (hex/rgba del mockup) y comparar lado a lado contra el mockup antes de cerrar. |
| El drawer introduce el primer estado cliente del proyecto | Aislar el estado en `mobile-header.tsx` (`"use client"`); el resto de la página queda en server components. |
| `next/font` con `cacheComponents`/Turbopack podría fallar en compilación | Si falla, reportarlo y evaluar `<link>` a Google Fonts como fallback documentado en la spec. |

## Lo que **no** está en esta spec

- Autenticación y base de datos.
- Rutas reales de Niños, Avisos, Mi cuenta, publicaciones y login (cada una irá en su propia spec).
- Interactividad de corazones, comentarios y "Editar".
- Fotos reales en los posts.
