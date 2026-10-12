# SPEC 04 — Agregar Niño (Modal)

> **Estado:** Aprobado
> **Depende de:** SPEC 02
> **Fecha:** 2026-10-12
> **Objetivo:** Implementar un modal para agregar niños al listado de `/kids`, basado en el mockup `references/pantallas/agregar-nino.dc.html`, con validación de campos requeridos.

---

## Scope

**In:**

- Componente modal reutilizable `components/AddKidModal.tsx` basado en el mockup
- Todos los campos del mockup: Nombre completo, Fecha de nacimiento (dd/mm/aaaa), Sala (select), Alergias (opcional), Notas médicas (opcional)
- Validación de campos obligatorios: Nombre completo y Fecha de nacimiento
- Validación de formato de fecha (dd/mm/aaaa)
- Estado del modal (abierto/cerrado) en `app/(dashboard)/kids/page.tsx` con useState
- Botón "Agregar niño" en `/kids` que abre el modal
- Persistencia en estado local (useState) — al recargar la página se pierden los cambios
- Al guardar: cierra el modal y agrega el nuevo niño a la lista visible
- Estilos con Tailwind v4 coincidentes con el mockup (fondo #FBF4EC, bordes #EADFD0, inputs #fff)

**Out of scope:**

- Lógica de backend o persistencia real
- Conexión con base de datos
- Navegación al perfil del niño recién creado
- Edición de niños existentes
- Validación de valores de Sala (solo se muestra el select, no se valida)
- Formulario responsive mobile (solo desktop)

---

## Data Model

No se introducen nuevas estructuras de datos. Se reutiliza el tipo `Kid` definido en SPEC 02:

```typescript
// lib/mocks.ts (ya existe)
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
- `nombreCompleto`: string (requerido)
- `fechaNacimiento`: string (requerido, formato dd/mm/aaaa)
- `sala`: string (opcional, valor por defecto "Soles")
- `alergias`: string (opcional)
- `notasMedicas`: string (opcional)

Al crear un nuevo niño, se generan automáticamente:
- `id`: timestamp único
- `age`: calculada desde `fechaNacimiento`
- `enrollmentDate`: fecha actual
- `parents`: array vacío
- `avatarColor`: color aleatorio de paleta predefinida
- `avatarLetter`: primera letra del nombre en mayúscula
- `badge`: generado si hay alergias (texto de la primera alergia, color coral)

---

## Implementation Plan

1. **Crear componente AddKidModal.** `components/AddKidModal.tsx` con:
   - Props: `open: boolean`, `onClose: () => void`, `onSave: (kid: Kid) => void`
   - Estructura del modal: overlay oscuro semi-transparente, contenedor centrado con fondo #FBF4EC, header con título "Agregar niño", botones Cancelar/Guardar
   - Todos los campos del mockup: Nombre completo, Fecha de nacimiento, Sala (select con opciones: Soles, Lunas, Estrellas), Alergias, Notas médicas
   - Estados internos: `nombre`, `fechaNacimiento`, `sala`, `alergias`, `notasMedicas`, `errores`
   - Estilos con Tailwind v4 coincidentes con el mockup

2. **Implementar validación del formulario.** Dentro del componente:
   - Función `validarFormulario()` que retorna `true` si es válido
   - Validar que Nombre completo no esté vacío
   - Validar que Fecha de nacimiento no esté vacía
   - Validar formato de fecha con regex: `^\d{2}\/\d{2}\/\d{4}$`
   - Mostrar mensajes de error debajo de cada campo inválido
   - Deshabilitar botón Guardar si hay errores (opcional, pero recomendado)

3. **Implementar lógica de guardado.** Dentro del componente:
   - Al hacer clic en "Guardar": si validación pasa, crear objeto Kid con los datos del formulario + campos auto-generados (id, age, avatarColor, etc.), llamar `onSave(kid)`, luego `onClose()`
   - Al hacer clic en "Cancelar" o fuera del modal: llamar `onClose()` sin guardar
   - Limpiar el formulario al cerrar (resetear todos los estados a vacío)

4. **Integrar modal en página /kids.** Modificar `app/(dashboard)/kids/page.tsx`:
   - Agregar estado `const [modalOpen, setModalOpen] = useState(false)`
   - Agregar estado `const [kids, setKids] = useState(mockKids)` (copia local del array)
   - Agregar función `handleAddKid(newKid: Kid)` que agrega el niño al array local
   - Cambiar botón "Agregar niño" para que ejecute `setModalOpen(true)` en lugar de navegar
   - Renderizar componente `<AddKidModal>` con props: `open={modalOpen}`, `onClose={() => setModalOpen(false)}`, `onSave={handleAddKid}`
   - Usar `kids` (estado local) en lugar de `mockKids` en el renderizado de KidCards

5. **Implementar generación automática de campos.** Crear función helper (puede estar inline en el modal o en archivo separado `lib/utils.ts`):
   - Calcular edad desde fecha de nacimiento (considerar si ya pasó el cumpleaños este año)
   - Generar avatarColor aleatorio de paleta: `["#A9D9E8", "#F4B8CC", "#B9DEC4", "#C9B6E8", "#F4DC8E"]`
   - Generar avatarLetter desde primera letra del nombre
   - Generar badge si hay alergias (tomar primera alergia separada por coma, poner en mayúsculas, color coral #FBD8CC)

6. **Ejecutar lint y build.** Correr `npm run lint` y `npm run build` para verificar que no hay errores.

---

## Acceptance Criteria

- [ ] El botón "Agregar niño" en `/kids` abre un modal con overlay oscuro
- [ ] El modal muestra todos los campos: Nombre completo, Fecha de nacimiento, Sala (select), Alergias, Notas médicas
- [ ] El modal tiene botones "Cancelar" y "Guardar" en el header
- [ ] Al hacer clic en "Cancelar" el modal se cierra sin guardar cambios
- [ ] Al hacer clic en "Guardar" sin completar Nombre completo, muestra error debajo del campo
- [ ] Al hacer clic en "Guardar" sin completar Fecha de nacimiento, muestra error debajo del campo
- [ ] Al ingresar una fecha con formato inválido (ej: "12-03-2022", "2022/03/12", "abc"), muestra error de formato
- [ ] Al ingresar una fecha válida (dd/mm/aaaa) y completar Nombre, el formulario se considera válido
- [ ] Al hacer clic en "Guardar" con formulario válido, el modal se cierra
- [ ] Después de guardar, el nuevo niño aparece en la lista de `/kids` con avatar, nombre, edad y sala correctos
- [ ] El campo Sala tiene valores predefinidos: "Soles", "Lunas", "Estrellas" (select dropdown)
- [ ] Los campos Alergias y Notas Médicas son opcionales (no validados)
- [ ] Si se ingresan alergias, el nuevo niño muestra un badge con la primera alergia en mayúsculas
- [ ] El avatar del nuevo niño tiene una letra (primera del nombre) y color de paleta predefinida
- [ ] La edad se calcula automáticamente desde la fecha de nacimiento
- [ ] Al recargar la página, los niños agregados se pierden (no hay persistencia)
- [ ] Los estilos del modal coinciden con el mockup (fondo #FBF4EC, bordes #EADFD0, inputs #fff)
- [ ] Las tipografías Fredoka (títulos) y Nunito (texto) se renderizan correctamente
- [ ] `npm run lint` pasa sin errores
- [ ] `npm run build` pasa sin errores
- [ ] TypeScript no reporta errores con `npx tsc --noEmit`

---

## Decisions Taken and Discarded

**Decisiones tomadas:**

- Modal con overlay oscuro (patrón estándar de UX para formularios rápidos)
- Todos los campos del mockup visibles, pero solo Nombre y Fecha obligatorios (equilibrio entre completitud y simplicidad)
- Validación de formato de fecha con regex (simple, sin librerías externas)
- Estado local con useState (consistente con specs anteriores, sin backend)
- Campos auto-generados: id (timestamp), age (calculada), avatarColor (aleatorio), avatarLetter (primera letra), enrollmentDate (hoy)
- Sala con valores predefinidos (Soles, Lunas, Estrellas) en select (no editable)
- Al guardar: cerrar modal + actualizar lista inmediatamente (mejor UX que redirigir)

**Decisiones descartadas:**

- No usar librería de validación (ej: Zod, Yup) — overengineering para 2 campos obligatorios
- No persistir con localStorage — fuera de scope, requiere otra spec
- No validar valores de Sala — innecesario sin backend
- No usar modal reutilizable genérico (ej: `components/Modal.tsx`) — solo necesitamos uno por ahora
- No implementar responsive mobile — fuera de scope (se hará en otra spec)
- No usar date picker nativo del navegador — el mockup usa input de texto con placeholder "dd/mm/aaaa"

---

## Identified Risks

- **Cálculo de edad:** La lógica de calcular edad desde fecha de nacimiento puede tener edge cases (años bisiestos, fechas inválidas como 29/02/2023). Mitigación: usar `Date.parse()` y validar que no retorne NaN.
- **Validación de fecha:** Regex `^\d{2}\/\d{2}\/\d{4}$` acepta fechas inválidas como 99/99/9999. Mitigación: después del regex, intentar parsear con `Date.parse()` y verificar que sea válido.
- **Colores de avatar aleatorios:** Si se agregan muchos niños, podría haber colores repetidos. Mitigación: usar array de 5 colores, rotar o seleccionar aleatoriamente (aceptable para mock).
- **Performance con muchos niños:** Agregar niños al array local podría causar re-renders si la lista es muy larga. Mitigación: por ahora no es un problema (mock inicial de 8 niños).

---

## Lo que NO está en esta spec

- Persistencia de datos (localStorage, backend, base de datos)
- Edición de niños existentes
- Eliminación de niños
- Navegación al perfil del niño recién creado
- Validación de backend o duplicados
- Responsive mobile
- Modal reutilizable genérico
- Date picker visual (calendario)

Cada uno de esos, si se implementa, va en su propia spec.
