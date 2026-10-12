# SPEC 03 — Login y Activar Cuenta

> **Estado:** Aprobado
> **Depende de:** ninguna
> **Fecha:** 2026-10-12
> **Objetivo:** Implementar las pantallas visuales de login y activación de cuenta basadas en los mockups, con rutas `/login` y `/activar-cuenta`, omitiendo el selector de rol en login.

## Scope

**In:**

- Página `app/login/page.tsx` basada en `references/pantallas/login.dc.html`
- Página `app/activar-cuenta/page.tsx` basada en `references/pantallas/activar-cuenta.dc.html`
- Panel izquierdo con branding (gradiente coral, logo, título) visible solo en desktop (≥1024px)
- Formulario de login sin selector de rol (Personal/Familia)
- Campos: email y contraseña
- Link "¿Olvidaste tu contraseña?" (visual, sin acción)
- Link "Activá tu cuenta" → `/activar-cuenta`
- Página de activar cuenta con datos mock hardcodeados (código, email, niño)
- Checkbox interactivo de autorización de fotos con estado local
- Link "Iniciar sesión" → `/login`
- Botones "Iniciar sesión" y "Activar mi cuenta" (visuales, sin acción)
- Uso de tokens de diseño existentes en `globals.css`

**Out of scope:**

- Lógica de autenticación real
- Validación de formularios
- Conexión con backend o base de datos
- Redirección post-login/activación
- Recuperación de contraseña funcional
- Responsive mobile para el panel izquierdo (solo se oculta)

---

## Data Model

Esta spec no introduce nuevas estructuras de datos. Todos los valores mostrados son constantes inline en los componentes:

```typescript
// Valores hardcodeados en activar-cuenta
const codigoInvitacion = "7K4P9";
const emailMock = "lucia.fernandez@gmail.com";
const nombreNino = "Mateo · Sala Soles";
const inicialAvatar = "M";
const colorAvatar = "#A9D9E8";
```

---

## Implementation Plan

1. **Crear página de login.** `app/login/page.tsx` con layout de dos columnas (desktop): panel izquierdo con branding y panel derecho con formulario. Ocultar panel izquierdo en mobile (<1024px). Usar tokens de `globals.css`.

2. **Implementar panel izquierdo.** Gradiente coral (`linear-gradient(155deg,#F6A98E 0%,#F2937A 45%,#EC7E62 100%)`), logo OpenDayCare con ícono SVG, título "El día de cada niño, compartido con su familia." y subtítulo. Agregar círculos decorativos con `rgba(255,255,255,.12)`. Visible solo en `lg:` breakpoint.

3. **Implementar formulario de login.** Campos de email y contraseña con labels "INGRESO COMO" (sin botones de rol, solo el label visible), "EMAIL", "CONTRASEÑA". Link "¿Olvidaste tu contraseña?" alineado a la derecha. Botón "Iniciar sesión" con gradiente coral. Link a `/activar-cuenta` al final.

4. **Crear página de activar cuenta.** `app/activar-cuenta/page.tsx` con layout centrado (max-width 440px). Mostrar ícono de logo, título "Bienvenida a OpenDayCare", subtítulo, tarjeta con info del niño (avatar circular, nombre).

5. **Implementar formulario de activación.** Campos: "CÓDIGO DE INVITACIÓN" (valor "7K4P9" con letter-spacing), "EMAIL" (valor hardcodeado), "CREAR CONTRASEÑA" (input password). Checkbox interactivo de autorización con estado local (`useState`), texto en caja amarilla (#FBF1D6). Botón "Activar mi cuenta" con gradiente coral. Link a `/login`.

6. **Verificar estilos y tipografías.** Asegurar que Fredoka se use en títulos y Nunito en texto. Verificar paleta de colores contra mockups. Agregar tokens faltantes a `globals.css` si es necesario (ej. fondo input `#fff`, borde `#EADFD0`).

7. **Ejecutar lint y build.** Correr `npm run lint` y `npm run build` para verificar que no hay errores.

---

## Acceptance Criteria

- [ ] La ruta `/login` muestra el formulario sin selector de rol (solo labels "INGRESO COMO")
- [ ] El panel izquierdo con branding es visible en viewport ≥1024px
- [ ] El panel izquierdo se oculta en viewport <1024px
- [ ] El link "Activá tu cuenta" navega a `/activar-cuenta`
- [ ] La ruta `/activar-cuenta` muestra datos hardcodeados: código "7K4P9", email "lucia.fernandez@gmail.com", niño "Mateo · Sala Soles"
- [ ] El checkbox de autorización cambia de estado (checked/unchecked) al hacer clic
- [ ] El link "Iniciar sesión" en activar-cuenta navega a `/login`
- [ ] Los botones "Iniciar sesión" y "Activar mi cuenta" no ejecutan ninguna acción (solo visuales)
- [ ] El link "¿Olvidaste tu contraseña?" no ejecuta ninguna acción
- [ ] Las tipografías Fredoka (títulos) y Nunito (texto) se renderizan correctamente
- [ ] La paleta de colores coincide con los mockups (fondo #FBF4EC, inputs #fff, bordes #EADFD0)
- [ ] `npm run lint` pasa sin errores
- [ ] `npm run build` pasa sin errores
- [ ] TypeScript no reporta errores con `npx tsc --noEmit`

---

## Decisions Taken and Discarded

**Decisiones tomadas:**

- Omitir selector de rol (Personal/Familia) del login — decisión explícita del usuario
- Ocultar panel izquierdo en mobile — mejora UX en pantallas pequeñas
- Datos hardcodeados en activar-cuenta — consistencia con specs anteriores (mock estático)
- Checkbox interactivo con `useState` — simple de implementar, mejora percepción de funcionalidad
- Rutas `/login` y `/activar-cuenta` — convención de Next.js App Router

**Decisiones descartadas:**

- No implementar autenticación real (fuera de scope, requiere backend)
- No usar query params para datos de activación (overengineering para mock estático)
- No validar formularios (sin backend no tiene sentido)
- No implementar recuperación de contraseña (requiere backend)

---

## Identified Risks

- **Panel izquierdo en tablets:** Breakpoint `lg:` (1024px) podría no ser óptimo para tablets en landscape. Mitigación: probar en 1024px-1280px y ajustar si es necesario.
- **Accesibilidad del checkbox:** Usuarios de teclado deben poder interactuar. Mitigación: asegurar que el `<label>` envuelva el `<input>` y tenga `cursor-pointer`.
- **Inputs con valor prellenado:** Algunos navegadores podrían mostrar autofill. Mitigación: usar `autoComplete="off"` si es necesario.

---

## Lo que NO está en esta spec

- Autenticación real o conexión con backend
- Validación de emails/contraseñas
- Recuperación de contraseña funcional
- Redirección post-login/activación a otras rutas
- Selector de rol en login
- Responsive mobile específico (solo ocultar panel izquierdo)
