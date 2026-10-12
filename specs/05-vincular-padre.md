# SPEC 05 — Vincular Padre (Modal)

> **Estado:** Aprobado
> **Depende de:** SPEC 02, SPEC 04
> **Fecha:** 2026-10-12
> **Objetivo:** Implementar un modal para vincular un nuevo padre/madre al perfil de un niño, basado en el mockup `references/pantallas/vincular-padre.dc.html`, con generación de código de invitación y validación de campos.

---

## Scope

**In:**

- Componente modal `components/LinkParentModal.tsx` basado en el mockup
- Todos los campos del mockup: Nombre del padre/madre, Email, Parentesco (Mamá, Papá, Tutor/a)
- Código de invitación generado aleatoriamente (5 caracteres alfanuméricos) con vencimiento en 7 días
- Validación de campos obligatorios: Nombre y Email con formato válido
- Conversión de `app/(dashboard)/kids/[id]/page.tsx` a Client Component para manejar estado
- Botón "Vincular otro padre" en panel lateral que abre el modal
- Al enviar: agregar nuevo padre al array `parents` del niño con status `PENDIENTE`
- Persistencia en estado local (useState) — al recargar la página se pierden los cambios
- Estilos con Tailwind v4 coincidentes con el mockup (fondo #FBF4EC, bordes #ECE0D0, inputs #fff)
- Actualización automática de la lista de padres en el panel lateral después de vincular

**Out of scope:**

- Lógica de backend o persistencia real
- Conexión con base de datos
- Envío real de correos electrónicos
- Verificación del código de invitación por el padre vinculado
- Edición o eliminación de padres ya vinculados
- Navegación al perfil del padre recién vinculado
- Validación de emails duplicados
- Formulario responsive mobile (solo desktop)

---

## Data Model

No se introducen nuevas estructuras de datos. Se reutilizan los tipos definidos en SPEC 02:

```typescript
// lib/mocks.ts (ya existe)
export type Parent = {
  id: string;
  name: string;
  relation: string;
  status: "ACTIVA" | "PENDIENTE" | "VINCULAR";
  avatarColor: string;
  avatarLetter: string;
};

export type Kid = {
  id: string;
  name: string;
  age: number;
  room: string;
  birthDate: string;
  enrollmentDate: string;
  parents: Parent[];
  allergies?: string;
  avatarColor: string;
  avatarLetter: string;
  badge?: { text: string; color: string };
};
```

Campos del formulario del modal:
- `nombrePadre`: string (requerido)
- `email`: string (requerido, formato email válido)
- `parentesco`: "Mamá" | "Papá" | "Tutor/a" (requerido, valor por defecto "Mamá")

Al crear un nuevo padre, se generan automáticamente:
- `id`: timestamp único
- `status`: "PENDIENTE" (fijo)
- `avatarColor`: color aleatorio de paleta predefinida
- `avatarLetter`: primera letra del nombre en mayúscula

Código de invitación:
- String de 5 caracteres alfanuméricos (ej: "7K4P9")
- Generado aleatoriamente al abrir el modal
- Vencimiento fijo: 7 días (texto estático, no countdown real)

---

## Implementation Plan

1. **Crear componente LinkParentModal.** `components/LinkParentModal.tsx` con:
   - Props: `open: boolean`, `kidName: string`, `onClose: () => void`, `onLink: (parent: Parent, invitationCode: string) => void`
   - Estructura del modal: overlay oscuro semi-transparente, contenedor centrado con fondo #FBF4EC, header con título "Vincular padre" y subtítulo "a {kidName}", botón de cerrar (X)
   - Mensaje informativo azul sobre envío de correo (fondo #E3ECFB, texto #3F5694)
   - Campos: Nombre del padre/madre (input), Email (input type="email")
   - Selector de parentesco: 3 botones toggle (Mamá, Papá, Tutor/a) con estado activo/inactivo
   - Sección de código de invitación: fondo amarillo punteado (#FBF1D6), código grande en Fredoka, texto "Vence en 7 días"
   - Botón "Enviar invitación" con gradiente coral
   - Estados internos: `nombre`, `email`, `parentesco`, `codigoInvitacion`, `errores`
   - Generar código aleatorio en useEffect cuando el modal se abre
   - Estilos con Tailwind v4 coincidentes con el mockup

2. **Implementar generación de código de invitación.** Dentro del componente:
   - Función `generarCodigoInvitacion()` que retorna string de 5 caracteres
   - Caracteres permitidos: letras mayúsculas (A-Z) y números (0-9), excluyendo caracteres confusos (0, O, 1, I, L)
   - Llamar la función en useEffect cuando `open` cambia a `true`
   - Almacenar el código en estado para mostrarlo en la UI

3. **Implementar validación del formulario.** Dentro del componente:
   - Función `validarFormulario()` que retorna `true` si es válido
   - Validar que Nombre no esté vacío
   - Validar que Email no esté vacío
   - Validar formato de email con regex: `^[^\s@]+@[^\s@]+\.[^\s@]+$`
   - Mostrar mensajes de error debajo de cada campo inválido
   - Deshabilitar botón "Enviar invitación" si hay errores (opcional, pero recomendado)

4. **Implementar lógica de vinculación.** Dentro del componente:
   - Al hacer clic en "Enviar invitación": si validación pasa, crear objeto Parent con los datos del formulario + campos auto-generados (id, status PENDIENTE, avatarColor, avatarLetter), llamar `onLink(parent, codigoInvitacion)`, luego `onClose()`
   - Al hacer clic en "X" o fuera del modal: llamar `onClose()` sin vincular
   - Limpiar el formulario al cerrar (resetear todos los estados a vacío)

5. **Convertir página de perfil a Client Component.** Modificar `app/(dashboard)/kids/[id]/page.tsx`:
   - Agregar `"use client"` al inicio del archivo
   - Cambiar de `async function` a `function` (remover async/await)
   - Recibir `params` como prop directa (ya no es Promise)
   - Agregar estado `const [modalOpen, setModalOpen] = useState(false)`
   - Agregar estado `const [kid, setKid] = useState<Kid>(kidFromProps)` (copia local del objeto)
   - Agregar función `handleLinkParent(newParent: Parent)` que agrega el padre al array `kid.parents`
   - Cambiar link "Vincular otro padre" para que ejecute `setModalOpen(true)` en lugar de `href="#"`
   - Renderizar componente `<LinkParentModal>` con props: `open={modalOpen}`, `kidName={kid.name}`, `onClose={() => setModalOpen(false)}`, `onLink={handleLinkParent}`
   - Usar `kid.parents` (estado local) en el renderizado de ParentCards

6. **Implementar generación automática de campos del padre.** Crear función helper (puede estar inline en el modal o en archivo separado `lib/utils.ts`):
   - Generar avatarColor aleatorio de paleta: `["#A9D9E8", "#F4B8CC", "#B9DEC4", "#C9B6E8", "#F4DC8E", "#A9C7E8"]`
   - Generar avatarLetter desde primera letra del nombre en mayúscula

7. **Ejecutar lint y build.** Correr `npm run lint` y `npm run build` para verificar que no hay errores.

---

## Acceptance Criteria

- [ ] El link "Vincular otro padre" en el panel lateral abre un modal con overlay oscuro
- [ ] El modal muestra el título "Vincular padre" y subtítulo "a {nombre del niño}"
- [ ] El modal muestra el mensaje informativo azul sobre envío de correo
- [ ] El modal muestra todos los campos: Nombre del padre/madre, Email, Parentesco (Mamá, Papá, Tutor/a)
- [ ] El selector de parentesco tiene 3 botones toggle con estado activo/inactivo visible
- [ ] Al abrir el modal, se genera un código de invitación aleatorio de 5 caracteres (ej: 7K4P9)
- [ ] El código de invitación se muestra en la sección amarilla punteada con texto "Vence en 7 días"
- [ ] El modal tiene botón de cerrar (X) en la esquina superior derecha
- [ ] Al hacer clic en "X" o fuera del modal, se cierra sin vincular
- [ ] Al hacer clic en "Enviar invitación" sin completar Nombre, muestra error debajo del campo
- [ ] Al hacer clic en "Enviar invitación" sin completar Email, muestra error debajo del campo
- [ ] Al ingresar un email con formato inválido (ej: "correo", "correo@", "@ejemplo.com"), muestra error de formato
- [ ] Al ingresar un email válido y completar Nombre, el formulario se considera válido
- [ ] Al hacer clic en "Enviar invitación" con formulario válido, el modal se cierra
- [ ] Después de vincular, el nuevo padre aparece en el panel lateral con avatar, nombre, relación y badge "PENDIENTE"
- [ ] El avatar del nuevo padre tiene una letra (primera del nombre) y color de paleta predefinida
- [ ] El nuevo padre tiene status "PENDIENTE" (no "ACTIVA" ni "VINCULAR")
- [ ] Al recargar la página, los padres vinculados se pierden (no hay persistencia)
- [ ] Los estilos del modal coinciden con el mockup (fondo #FBF4EC, bordes #ECE0D0, inputs #fff, sección código #FBF1D6)
- [ ] Las tipografías Fredoka (título, código) y Nunito (texto) se renderizan correctamente
- [ ] El botón "Enviar invitación" tiene gradiente coral (#F4977E a #EE8164)
- [ ] `npm run lint` pasa sin errores
- [ ] `npm run build` pasa sin errores
- [ ] TypeScript no reporta errores con `npx tsc --noEmit`

---

## Decisions Taken and Discarded

**Decisiones tomadas:**

- Modal con overlay oscuro (patrón estándar de UX, consistente con SPEC 04)
- Todos los campos del mockup visibles, pero solo Nombre y Email obligatorios
- Validación de formato de email con regex simple (sin librerías externas)
- Estado local con useState (consistente con specs anteriores, sin backend)
- Campos auto-generados del padre: id (timestamp), status (PENDIENTE fijo), avatarColor (aleatorio), avatarLetter (primera letra)
- Código de invitación generado aleatoriamente al abrir el modal (no persiste entre aperturas)
- Caracteres permitidos en código: A-Z, 0-9 excluyendo confusos (0, O, 1, I, L) para evitar ambigüedad visual
- Convertir página completa a Client Component (simplicidad, todo el estado en un solo lugar)
- Al vincular: cerrar modal + actualizar lista de padres inmediatamente (mejor UX)
- Vencimiento del código como texto estático "7 días" (no countdown real, es un mock)

**Decisiones descartadas:**

- No usar librería de validación (ej: Zod, Yup) — overengineering para 2 campos obligatorios
- No persistir con localStorage — fuera de scope, requiere otra spec
- No validar emails duplicados — sin backend no tiene sentido
- No crear wrapper Client Component separado — más simple convertir toda la página
- No implementar responsive mobile — fuera de scope (se hará en otra spec)
- No enviar correo real — fuera de scope, solo UI mock
- No implementar countdown real para vencimiento del código — overengineering para mock
- No usar modal reutilizable genérico — solo necesitamos uno por ahora

---

## Identified Risks

- **Conversión de Server Component a Client Component:** La página actual usa `async function` y recibe `params` como Promise. Al convertir a Client Component, cambia la forma de recibir params. Mitigación: seguir documentación oficial de Next.js 16 para Client Components con params dinámicos.
- **Generación de código aleatorio:** Podría generar códigos repetidos si se abre el modal muchas veces. Mitigación: usar `Math.random()` con caracteres suficientes (36 opciones ^ 5 = 60M combinaciones), probabilidad de colisión muy baja.
- **Colores de avatar aleatorios:** Si se vinculan muchos padres, podría haber colores repetidos. Mitigación: usar array de 6 colores, rotar o seleccionar aleatoriamente (aceptable para mock).
- **Performance con muchos padres:** Agregar padres al array local podría causar re-renders si la lista es muy larga. Mitigación: por ahora no es un problema (mock inicial tiene máximo 2 padres por niño).

---

## Lo que NO está en esta spec

- Persistencia de datos (localStorage, backend, base de datos)
- Edición de padres existentes
- Eliminación de padres vinculados
- Navegación al perfil del padre recién vinculado
- Validación de backend o duplicados
- Envío real de correos electrónicos
- Verificación del código de invitación por el padre
- Responsive mobile
- Modal reutilizable genérico
- Countdown real para vencimiento del código

Cada uno de esos, si se implementa, va en su propia spec.
