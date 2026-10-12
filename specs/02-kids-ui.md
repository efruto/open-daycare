**State:** Verificado
**Date:** 2026-10-12
**Objective:** Implementar las interfaces y componentes para las pantallas de lista de niños y perfil individual, basándose en los mockups HTML de referencia.

---

## Scope

**In:**
- Componentes reutilizables: `Sidebar`, `KidCard`, `SearchBar`, `ParentCard`, `AlertBox`, `InfoTable`
- Páginas: `app/kids/page.tsx` (lista) y `app/kids/[id]/page.tsx` (perfil individual)
- Datos mockeados en `lib/mocks.ts`
- Estilos con Tailwind v4 (CSS-first)
- Hover effects en tarjetas de niños
- Iconos SVG inline
- Tipografías Fredoka + Nunito
- Paleta de colores: fondo crema (#F6ECDF), tarjetas (#FFFDF9), acentos naranja/coral

**Out:**
- Lógica de backend, API routes, o persistencia
- Autenticación o autorización
- Navegación funcional a otras secciones (los enlaces apuntan a `#` o rutas futuras)
- Formularios de edición o creación
- Responsive design móvil (solo desktop)

---

## Data Model

```typescript
// lib/mocks.ts

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

export const mockKids: Kid[] = [
  {
    id: "1",
    name: "Mateo Fernández",
    age: 3,
    room: "Soles",
    birthDate: "12 mar 2022",
    enrollmentDate: "feb 2025",
    parents: [
      { id: "p1", name: "Lucía Fernández", relation: "Mamá", status: "ACTIVA", avatarColor: "#C9B6E8", avatarLetter: "L" },
      { id: "p2", name: "Diego Fernández", relation: "Papá", status: "PENDIENTE", avatarColor: "#A9C7E8", avatarLetter: "D" },
    ],
    allergies: "Alergia al maní. Evitar frutos secos. Lleva inhalador en la mochila.",
    avatarColor: "#A9D9E8",
    avatarLetter: "M",
    badge: { text: "MANÍ", color: "#FBD8CC" },
  },
  {
    id: "2",
    name: "Sofía Méndez",
    age: 2,
    room: "Soles",
    birthDate: "15 jun 2023",
    enrollmentDate: "mar 2025",
    parents: [
      { id: "p3", name: "Ana Méndez", relation: "Mamá", status: "ACTIVA", avatarColor: "#F4B8CC", avatarLetter: "A" },
    ],
    avatarColor: "#F4B8CC",
    avatarLetter: "S",
  },
  {
    id: "3",
    name: "Benjamín Ruiz",
    age: 3,
    room: "Soles",
    birthDate: "8 ene 2022",
    enrollmentDate: "feb 2025",
    parents: [
      { id: "p4", name: "María Ruiz", relation: "Mamá", status: "ACTIVA", avatarColor: "#B9DEC4", avatarLetter: "M" },
      { id: "p5", name: "Carlos Ruiz", relation: "Papá", status: "PENDIENTE", avatarColor: "#C9B6E8", avatarLetter: "C" },
    ],
    avatarColor: "#B9DEC4",
    avatarLetter: "B",
  },
  {
    id: "4",
    name: "Valentina Soto",
    age: 2,
    room: "Soles",
    birthDate: "22 sep 2023",
    enrollmentDate: "abr 2025",
    parents: [],
    avatarColor: "#F4DC8E",
    avatarLetter: "V",
  },
  {
    id: "5",
    name: "Tomás Díaz",
    age: 3,
    room: "Soles",
    birthDate: "5 dic 2021",
    enrollmentDate: "ene 2025",
    parents: [
      { id: "p6", name: "Laura Díaz", relation: "Mamá", status: "ACTIVA", avatarColor: "#A9C7E8", avatarLetter: "L" },
    ],
    allergies: "Intolerancia a la lactosa. Evitar lácteos.",
    avatarColor: "#C9B6E8",
    avatarLetter: "T",
    badge: { text: "LACTOSA", color: "#FBD8CC" },
  },
  {
    id: "6",
    name: "Emma Castro",
    age: 2,
    room: "Soles",
    birthDate: "18 jul 2023",
    enrollmentDate: "mar 2025",
    parents: [
      { id: "p7", name: "Paula Castro", relation: "Mamá", status: "ACTIVA", avatarColor: "#F4B8CC", avatarLetter: "P" },
    ],
    avatarColor: "#F4B8CC",
    avatarLetter: "E",
  },
  {
    id: "7",
    name: "Lucas Romero",
    age: 3,
    room: "Soles",
    birthDate: "30 oct 2021",
    enrollmentDate: "feb 2025",
    parents: [
      { id: "p8", name: "Jorge Romero", relation: "Papá", status: "ACTIVA", avatarColor: "#A9D9E8", avatarLetter: "J" },
    ],
    avatarColor: "#A9D9E8",
    avatarLetter: "L",
  },
  {
    id: "8",
    name: "Olivia Vega",
    age: 2,
    room: "Soles",
    birthDate: "14 may 2023",
    enrollmentDate: "abr 2025",
    parents: [
      { id: "p9", name: "Carmen Vega", relation: "Mamá", status: "ACTIVA", avatarColor: "#B9DEC4", avatarLetter: "C" },
    ],
    avatarColor: "#B9DEC4",
    avatarLetter: "O",
  },
];
```

---

## Implementation Plan

1. **Crear estructura de tipos y datos mock.** Archivo `lib/mocks.ts` con tipos `Kid` y `Parent`, y array `mockKids` con 8 niños.

2. **Crear componente Sidebar.** `components/Sidebar.tsx` con navegación, botón "Nueva publicación", y sección de usuario. Links apuntan a `#` por ahora.

3. **Crear componente SearchBar.** `components/SearchBar.tsx` con input y estado de focus.

4. **Crear componente KidCard.** `components/KidCard.tsx` con avatar, nombre, edad, contador de padres, y badge opcional. Implementar hover effect: `hover:border-[#F2A78E] hover:-translate-y-0.5 transition-transform duration-150`.

5. **Crear página de lista.** `app/kids/page.tsx` con grid de KidCards, SearchBar arriba, y botón "Agregar niño". Usar datos de `mockKids`.

6. **Crear componente ParentCard.** `components/ParentCard.tsx` con avatar, nombre, relación, y badge de estado.

7. **Crear componente AlertBox.** `components/AlertBox.tsx` para mostrar alergias/notas importantes (fondo rosa/coral).

8. **Crear componente InfoTable.** `components/InfoTable.tsx` para mostrar datos estructurados (fecha de nacimiento, sala, ingreso).

9. **Crear página de perfil.** `app/kids/[id]/page.tsx` con:
   - Header con avatar grande, nombre, edad, sala
   - Botón "Editar"
   - AlertBox (si hay alergias)
   - InfoTable con datos del niño
   - Panel lateral con botón "Resumen del día" y lista de ParentCards
   - Link "Vincular otro padre"

10. **Verificar y ajustar estilos.** Asegurar que las tipografías Fredoka/Nunito se carguen correctamente en `app/globals.css`. Verificar paleta de colores y espaciados contra los mockups.

11. **Ejecutar lint y build.** Correr `npm run lint` y `npm run build` para verificar que no hay errores.

---

## Acceptance Criteria

- [x] La ruta `/kids` muestra una grilla de 8 niños con avatares, nombres, edades, y badges
- [x] La ruta `/kids/1` muestra el perfil completo de Mateo Fernández con sus dos padres
- [x] El sidebar aparece en ambas pantallas con navegación consistente
- [x] Las tarjetas de niños en `/kids` tienen hover effect (borde naranja + desplazamiento vertical)
- [x] La barra de búsqueda en `/kids` tiene estado de focus visible
- [x] El componente AlertBox muestra alergias con fondo rosa/coral
- [x] Los badges de estado de padres (ACTIVA, PENDIENTE) tienen colores correctos
- [x] Las tipografías Fredoka (títulos) y Nunito (texto) se renderizan correctamente
- [x] La paleta de colores coincide con los mockups (fondo #F6ECDF, tarjetas #FFFDF9)
- [x] `npm run lint` pasa sin errores
- [x] `npm run build` pasa sin errores
- [x] TypeScript no reporta errores con `npx tsc --noEmit`

---

## Decisions Taken and Discarded

**Decisiones tomadas:**
- Usar componentes reutilizables en lugar de markup inline (mejor mantenibilidad)
- Rutas `/kids` y `/kids/[id]` (convención de Next.js)
- Datos mockeados en archivo separado (facilita cambios y testing visual)
- Iconos SVG inline (simplicidad, sin dependencias externas)
- Hover effects con Tailwind utilities (consistencia con el sistema de diseño)

**Decisiones descartadas:**
- No implementar responsive móvil (fuera de scope, se hará en otra spec)
- No usar librería de iconos externa (overhead innecesario)
- No implementar formularios de edición (requiere backend)
- No usar rutas alternativas como `/children` (ya definido por el usuario)

---

## Identified Risks

- **Performance de hover effects:** Múltiples tarjetas con animaciones simultáneas podrían causar lag en dispositivos bajos. Mitigación: usar `transform` y `transition` optimizados.
- **Accesibilidad de hover:** Los usuarios de teclado no verán el hover. Mitigación: agregar `focus:` states equivalentes.
- **Carga de fuentes externas:** Google Fonts puede fallar. Mitigación: configurar `font-display: swap` en `globals.css`.
