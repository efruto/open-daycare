# SPEC 06 — Crear Publicación y Detalle (Modal + Ruta)

> **Estado:** Verificado ✅
> **Depende de:** SPEC 01, SPEC 02
> **Fecha:** 2026-10-12
> **Objetivo:** Implementar el modal de "Nueva publicación" accesible desde el sidebar con selección múltiple de niños y la pantalla de detalle de publicación con comentarios interactivos, basados en los mockups `crear-publicacion.dc.html` y `detalle-publicacion.dc.html`.

---

## Scope

**In:**

- Componente modal `components/CreatePostModal.tsx` basado en el mockup `crear-publicacion.dc.html`
- Todos los campos del modal: selección de niños (chips individuales desde `mockKids`), "Toda la sala" (excluyente), 7 tipos de publicación (Comida, Siesta, Actividad, Logro, Ánimo, Foto, Anuncio), descripción (textarea), sección de fotos (placeholder visual)
- Selección múltiple de niños: clic en chip lo selecciona/deselecciona; "Toda la sala" es excluyente (deselecciona niños individuales y viceversa)
- Validación: al menos un destinatario seleccionado, tipo seleccionado, descripción no vacía
- Extensión del modelo `PostMock` en `app/lib/mock-feed.ts` para soportar 7 tipos y comentarios estructurados
- React Context (`components/PostProvider.tsx`) para estado compartido de publicaciones y control del modal entre sidebar, feed y detalle
- Integración del PostProvider en `app/(dashboard)/layout.tsx`
- Conversión de `app/(dashboard)/page.tsx` a Client Component para consumir publicaciones del contexto
- Actualización de `app/components/post-card.tsx` para soportar 7 tipos de chip con colores y ser clickeable (Link a `/feed/[id]`)
- Actualización de `app/globals.css` con tokens de color para los 4 nuevos tipos de chip
- Actualización de `components/Sidebar.tsx` para que el botón "Nueva publicación" abra el modal vía contexto
- Página de detalle `app/(dashboard)/feed/[id]/page.tsx` basada en `detalle-publicacion.dc.html`: tarjeta completa, likes, botones Me encanta/Comentar, sección de comentarios, input para agregar comentarios
- Trigger "Compartí un momento…" en la home también abre el modal de crear publicación
- Estado local con useState — al recargar la página se pierden los cambios (consistente con specs anteriores)
- Estilos con Tailwind v4 coincidentes con los mockups

**Out of scope (para specs futuras):**

- Lógica de backend o persistencia real
- Subida real de fotos (la sección fotos es placeholder visual)
- Edición o eliminación de publicaciones
- Responsive mobile del modal y detalle
- Notificaciones a padres al publicar
- Búsqueda o filtrado de publicaciones en el feed
- Sistema de likes persistente

---

## Data Model

Se actualiza `app/lib/mock-feed.ts` con los siguientes tipos:

```typescript
export type TipoPost = "comida" | "siesta" | "actividad" | "logro" | "animo" | "foto" | "anuncio";

export interface Comentario {
  id: string;
  autor: string;
  rol: string;          // "mamá" | "papá" | "maestra"
  avatarColor: string;
  avatarLetter: string;
  hora: string;
  texto: string;
}

export interface PostMock {
  id: string;
  tipo: TipoPost;
  autor: string;
  iniciales?: string;
  hora: string;
  destinatarios: string;    // "familia de Mateo" | "toda la sala" | "Mateo, Sofía y Benjamín"
  texto: string;
  foto?: { etiqueta: string };
  meEncanta: number;
  comentarios: Comentario[];
}
```

Los niños destinatarios vienen de `lib/mocks.ts` (`mockKids: Kid[]`). Los 3 posts mock existentes se actualizan para usar la nueva interfaz (renombrar `corazones` → `meEncanta`, expandir `comentarios: number` → `comentarios: Comentario[]` con datos mock para el post de actividad-temperas).

PostProvider expone via Context:
- `posts: PostMock[]` — array de publicaciones
- `addPost(post: PostMock): void` — agrega publicación
- `addComment(postId: string, comment: Comentario): void` — agrega comentario a una publicación
- `toggleMeEncanta(postId: string): void` — incrementa/decrementa like
- `isCreateModalOpen: boolean`
- `openCreateModal(): void`
- `closeCreateModal(): void`

Colores de los 7 tipos de chip (del mockup):

| Tipo | Fondo | Texto |
|------|-------|-------|
| Comida | #9A7B1E | #fff |
| Siesta | #E7DCF6 | #7B5FC0 |
| Actividad | #2E89A6 | #fff |
| Logro | #CFEBD8 | #3E9B6C |
| Ánimo | #F9D2DE | #C56486 |
| Foto | #FBD8CC | #D9684A |
| Anuncio | #CCD8F4 | #4E72C8 |

---

## Implementation Plan

1. **Actualizar modelo de datos y tokens.** Modificar `app/lib/mock-feed.ts`: extender `TipoPost` a 7 valores, agregar tipo `Comentario`, renombrar `corazones` → `meEncanta`, cambiar `comentarios: number` → `comentarios: Comentario[]`, agregar datos mock de 2 comentarios para el post `actividad-temperas`. Modificar `app/globals.css`: agregar tokens `--color-chip-comida`, `--color-chip-comida-texto`, `--color-chip-siesta`, `--color-chip-siesta-texto`, `--color-chip-animo`, `--color-chip-animo-texto`, `--color-chip-foto`, `--color-chip-foto-texto`. Los chips existentes (logro, actividad, anuncio) permanecen.

2. **Actualizar PostCard para 7 tipos.** Modificar `app/components/post-card.tsx`: expandir `chipPorTipo` con las 4 nuevas entradas (comida, siesta, animo, foto). Actualizar renderizado: `post.corazones` → `post.meEncanta`, `post.comentarios` → `post.comentarios.length`. Envolver la tarjeta completa en un `<Link href={'/feed/${post.id}'}>` para navegación al detalle. Verificación: la home se renderiza con los posts existentes y los chips muestran colores correctos.

3. **Crear PostProvider.** Crear `components/PostProvider.tsx` como Client Component con Context. Estado interno: `posts` (inicializado con `feedPosts`), `isCreateModalOpen`. Expone: `addPost`, `addComment`, `toggleMeEncanta`, `openCreateModal`, `closeCreateModal`. Renderiza `{children}` y condicionalmente `<CreatePostModal>` cuando `isCreateModalOpen` es true. Exportar hook `usePosts()` para consumir el contexto.

4. **Integrar PostProvider en layout.** Modificar `app/(dashboard)/layout.tsx`: envolver todo el contenido con `<PostProvider>`. El layout sigue siendo Server Component; PostProvider es Client Component que envuelve children. Verificación: la app se renderiza sin errores, el comportamiento existente no cambia.

5. **Convertir home a Client Component con PostContext.** Modificar `app/(dashboard)/page.tsx`: agregar `"use client"`, consumir `usePosts()` para obtener `posts` y `openCreateModal`. Renderizar posts desde el contexto en lugar de importar `feedPosts` directamente. Conectar trigger "Compartí un momento…" con `openCreateModal()` (onClick). Verificación: el feed muestra los mismos posts que antes.

6. **Crear CreatePostModal.** Crear `components/CreatePostModal.tsx` como Client Component. Props: `onClose: () => void`. Consumir `usePosts()` para `addPost` y `closeCreateModal`. Estados internos: `destinatarios: string[]` (ids de niños), `todaLaSala: boolean`, `tipoSeleccionado: TipoPost | null`, `descripcion: string`, `errores: {...}`. Chips de niños desde `mockKids` (importar de `lib/mocks.ts`): cada chip muestra avatar circular con letra + nombre, seleccionado = fondo oscuro (#3F362E) + borde oscuro, no seleccionado = fondo claro (#FFFDF9) + borde claro (#ECE0D0). "Toda la sala" como chip adicional. Lógica excluyente: seleccionar niño deselecciona "Toda la sala" y viceversa. 7 botones de tipo con colores del mockup; seleccionado = opacidad total con shadow, no seleccionado = opacidad reducida. Textarea para descripción. Sección de fotos como placeholder visual (no funcional). Botón "Publicar" valida y llama `addPost(post)` + `closeCreateModal()`. Botón "Cancelar" llama `closeCreateModal()`. Header: "Cancelar" (izq), "Nueva publicación" (centro), "Publicar" (der, coral). Estilos Tailwind v4 coincidentes con mockup (fondo #FBF4EC, bordes #ECE0D0, etc.).

7. **Conectar Sidebar con modal.** Modificar `components/Sidebar.tsx`: importar `usePosts` del PostProvider, cambiar el botón "Nueva publicación" de `<Link href="#">` a `<button onClick={openCreateModal}>`. El modal se renderiza automáticamente desde PostProvider cuando `isCreateModalOpen` es true. Verificación: clic en botón "Nueva publicación" abre el modal; "Cancelar" y "Publicar" lo cierran.

8. **Crear página de detalle.** Crear `app/(dashboard)/feed/[id]/page.tsx` como Client Component. Consumir `usePosts()` para buscar post por id. Si no existe, mostrar mensaje "Publicación no encontrada" con link al feed. Renderizar: link "Volver al feed" → `/`, tarjeta de publicación completa (avatar + autor + hora + chip tipo, destinatarios, texto, placeholder de foto si aplica), botón "Me encanta" (toggle via `toggleMeEncanta`), botón "Comentar" (scroll al input), sección "COMENTARIOS · {n}" con lista de comentarios (avatar + nombre + rol + hora + texto), input sticky abajo para escribir comentario + botón enviar. Al enviar comentario: crear objeto Comentario con datos del usuario actual (`usuarioActual`), agregar via `addComment`, limpiar input. Estilos coincidentes con mockup `detalle-publicacion.dc.html` (fondo tarjeta #FFFDF9, bordes #ECE0D0, avatares de colores, etc.).

9. **Ejecutar lint, build y typecheck.** Correr `npm run lint`, `npm run build` (incluye typecheck de TypeScript) para verificar que no hay errores.

---

## Acceptance Criteria

- [x] El botón "Nueva publicación" en el sidebar abre un modal overlay centrado con los campos del mockup `crear-publicacion.dc.html`
- [x] El modal muestra la sección "PARA" con chips de todos los niños de `mockKids` (Mateo, Sofía, Benjamín, Valentina, Tomás, Emma, Lucas, Olivia) y botón "Toda la sala"
- [x] Los chips de niño seleccionado tienen fondo oscuro (#3F362E) con texto blanco; los no seleccionados tienen fondo claro (#FFFDF9) con borde (#ECE0D0)
- [x] Al seleccionar "Toda la sala", se desseleccionan todos los niños individuales ⚠️
- [x] Al seleccionar un niño individual, se desselecciona "Toda la sala" ⚠️
- [x] Se pueden seleccionar múltiples niños simultáneamente
- [x] El modal muestra la sección "TIPO" con 7 botones: Comida, Siesta, Actividad, Logro, Ánimo, Foto, Anuncio
- [x] Cada botón de tipo tiene el color de fondo y texto del mockup (Comida=#9A7B1E/blanco, Siesta=#E7DCF6/#7B5FC0, etc.)
- [x] Al seleccionar un tipo, el botón muestra estado activo (sin transparencia, con shadow)
- [x] El modal muestra un textarea "DESCRIPCIÓN" con placeholder "Contá cómo le fue hoy…"
- [x] El modal muestra la sección "FOTOS" con placeholder visual (recuadro con ícono + botón "Agregar")
- [x] El header del modal tiene "Cancelar" (izquierda, link), "Nueva publicación" (centro), "Publicar" (derecha, coral)
- [x] Al hacer clic en "Publicar" sin destinatarios seleccionados, muestra error
- [x] Al hacer clic en "Publicar" sin tipo seleccionado, muestra error
- [x] Al hacer clic en "Publicar" con descripción vacía, muestra error
- [x] Al hacer clic en "Publicar" con formulario válido, el modal se cierra y la nueva publicación aparece en el feed
- [x] La nueva publicación en el feed muestra el chip de tipo correcto con colores, autor, destinatarios y texto
- [x] Al hacer clic en "Cancelar", el modal se cierra sin publicar
- [x] El trigger "Compartí un momento…" en la home abre el modal de crear publicación
- [x] Al hacer clic en una tarjeta de publicación en el feed, navega a `/feed/[id]`
- [x] La página `/feed/[id]` muestra la tarjeta de publicación completa según el mockup `detalle-publicacion.dc.html`
- [x] El detalle muestra link "Volver al feed" que navega a `/`
- [x] El detalle muestra el avatar del niño, nombre, hora, autor (Maestra Caro), chip de tipo
- [x] El detalle muestra el texto de la publicación
- [x] El detalle muestra placeholder de foto si la publicación tiene foto
- [x] El detalle muestra el contador "A N personas les gusta" con avatares de colores
- [x] El botón "Me encanta" incrementa el contador al hacer clic (toggle)
- [x] El detalle muestra la sección "COMENTARIOS · N" con los comentarios existentes
- [x] Cada comentario muestra avatar circular con letra, nombre, rol (mamá/maestra), hora y texto
- [x] El detalle muestra un input sticky abajo "Escribí un comentario…" con botón enviar
- [x] Al escribir un comentario y hacer clic en enviar, el comentario aparece en la lista inmediatamente
- [x] El comentario nuevo muestra los datos del usuario actual (Lucía Fernández, mamá, avatar violeta)
- [x] Al recargar la página, las publicaciones creadas y comentarios agregados se pierden (no hay persistencia)
- [x] Los estilos del modal y detalle coinciden con los mockups (fondo #FBF4EC/#FFFDF9, bordes #ECE0D0, tipografías Fredoka + Nunito)
- [x] `npm run lint` pasa sin errores
- [x] `npm run build` pasa sin errores
- [x] TypeScript no reporta errores con `npx tsc --noEmit`

---

## Decisions Taken and Discarded

**Decisiones tomadas:**

- React Context con PostProvider en el layout para estado compartido (sidebar abre modal, feed muestra posts, detalle lee post)
- PostProvider renderiza el CreatePostModal condicionalmente (encapsula la lógica del modal)
- Home page (`/`) se convierte a Client Component para consumir PostContext (consistente con SPEC 04/05)
- Página de detalle en ruta `/feed/[id]` (Client Component para interactividad de comentarios)
- "Toda la sala" es excluyente con selección individual de niños (patrón radio/mutual exclusion)
- 7 tipos de publicación con colores fijos (del mockup), sin opción de personalizar
- PostCard es clickeable con `<Link>` para navegación al detalle
- Trigger "Compartí un momento…" también abre el modal (entry point natural)
- Comentarios interactivos con estado local (agregar comentarios en memoria, se pierden al recargar)
- Toggle "Me encanta" con incremento/decremento simple

**Decisiones descartadas:**

- No usar localStorage para persistencia — fuera de scope, consistente con specs anteriores
- No crear un modal base reutilizable (`components/Modal.tsx`) — cada modal tiene estructura diferente
- No implementar drag & drop para fotos — placeholder visual, fuera de scope
- No usar servidor API o rutas de Next.js — todo es client-side mock
- No implementar notificaciones push al publicar — fuera de scope
- No mover el feed de `/` a `/feed` — el feed actual vive en home, el detalle usa `/feed/[id]` como sub-ruta
- No implementar búsqueda o filtros en el feed — fuera de scope
- No crear un sistema de tags/categorías editable — los 7 tipos son fijos

---

## Identified Risks

| Riesgo | Mitigación |
| --- | --- |
| Cambiar `PostMock` (renombrar `corazones` → `meEncanta`, `comentarios: number` → `comentarios: Comentario[]`) rompe PostCard y page.tsx temporalmente | Actualizar PostCard en el mismo paso o inmediatamente después. El paso 2 corrige lo que el paso 1 rompe. |
| PostProvider como Client Component en el layout fuerza Client rendering en todas las páginas del dashboard | El impacto es mínimo: solo las páginas que consumen el contexto re-renderizan. El sidebar ya es Client Component. |
| Los datos mock de comentarios son estáticos; agregar comentarios no persiste entre navegación | Es intencional (mock). Si se necesita persistencia entre páginas, se maneja en el Context (que vive mientras la sesión del browser no recargue). |
| La ruta `/feed/[id]` puede dar 404 si el id no existe en el contexto | Mostrar mensaje "Publicación no encontrada" con link de retorno al feed. |
| Al recargar la página en `/feed/[id]`, el post puede no existir (si fue creado en esa sesión y se perdió) | El PostProvider se inicializa con los posts mock por defecto. Los posts creados en sesión se pierden al recargar, pero los posts mock siempre están disponibles. |

---

## Lo que NO está en esta spec

- Persistencia de datos (localStorage, backend, base de datos)
- Subida real de fotos
- Edición o eliminación de publicaciones
- Responsive mobile del modal y detalle
- Notificaciones a padres
- Búsqueda o filtrado de publicaciones
- Sistema de likes persistente
- Mover el feed a la ruta `/feed` (el feed sigue en `/`)
- Modal reutilizable genérico

Cada uno de esos, si se implementa, va en su propia spec.

## Notas de Verificación

**Fecha:** 2026-10-12

**Criterios 4 y 5 - Modificación posterior:**
- La funcionalidad de "Toda la sala" fue modificada después de la implementación inicial
- Originalmente: "Toda la sala" era un estado separado que deseleccionaba niños individuales
- Ahora: "Toda la sala" funciona como toggle que selecciona TODOS los niños cuando ninguno está seleccionado, o los deselecciona cuando todos están seleccionados
- No hay un estado separado para "Toda la sala", todo se maneja a través del array `selectedKidIds`
- Cuando todos los niños están seleccionados, el post se genera con destinatario "toda la sala" automáticamente

**Resultados de build:**
- ✅ ESLint: 0 errores, 0 warnings
- ✅ TypeScript: 0 errores con `npx tsc --noEmit`
- ✅ Next.js build: Compiled successfully (10/10 páginas generadas)

**Archivos creados/modificados:**
- `components/CreatePostModal.tsx` (nuevo)
- `components/PostProvider.tsx` (nuevo)
- `app/(dashboard)/feed/[id]/page.tsx` (nuevo - Server Component wrapper)
- `app/(dashboard)/feed/[id]/PostDetailClient.tsx` (nuevo)
- `app/lib/mock-feed.ts` (modificado - tipos extendidos)
- `app/globals.css` (modificado - tokens de colores)
- `app/components/post-card.tsx` (modificado - 7 tipos)
- `components/Sidebar.tsx` (modificado - botón conectado)
- `app/(dashboard)/page.tsx` (modificado - Client Component)
- `app/(dashboard)/layout.tsx` (modificado - PostProvider integrado)
