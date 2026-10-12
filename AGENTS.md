<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## MCPs

- Playwright Screenshots y cualquier cosa relacionada a Playwright tienen que estar en la carpeta .playwright-mcp.
- Context7 Usaremos este MCP para traer la documentación actualizda del framework.

## Spec Driven Development - Skills

- `/spec` — Diseñar y desarrollar especificaciones.
- `/spec-impl` — Implementar specs aprobadas (crea rama, implementa paso a paso).
- `/spec-verifier` — Verificar criterios de aceptación en specs implementadas. Actualiza el estado de la spec a "Verificado" si todo pasa.
- Los planes (spec) se guardan en la carpeta /specs

## Comandos

- `npm run dev` — servidor de desarrollo (Turbopack).
- `npm run lint` — ESLint flat config. En Next 16 `next lint` ya no existe; no intentar usarlo.
- `npm run build` — build de producción; también ejecuta el typecheck.
- No hay framework de tests ni script `typecheck`; para typecheck manual usar `npx tsc --noEmit`.

## Workflow

- Para features grandes usar las skills instaladas: `spec` (diseñar spec), `spec-impl` (implementar spec aprobada) y `spec-verifier` (verificar criterios de aceptación).
- Para verificar una spec implementada: `/spec-verifier <NN-spec-name>`. El agente lee la spec, verifica cada criterio contra el código, ejecuta lint/build si aplica, y actualiza el archivo con el estado "Verificado" si todo pasa.

## Arquitectura

- App Next.js 16 (App Router) recién scaffoldeada: todo el código vive en `app/` (por ahora solo `layout.tsx`, `page.tsx`, `globals.css`).
- `references/pantallas/*.dc.html` son mockups HTML (en español) de todas las pantallas previstas: login, feed, niños, perfil-niño, resumen-día, avisos, publicaciones, cuenta familiar, vincular-padre, activar-cuenta, etc. `references/screenshots/*.png` son capturas de referencia. Son la fuente de verdad de diseño y alcance: consultarlas antes de construir UI.
- Estilo de diseño definido en los mockups: tipografías Fredoka + Nunito, fondo crema (#f6ecdf), tarjetas #fffdf9. La UI de la app es en español.

## Quirks de Next/Tailwind

- `next.config.ts` activa `cacheComponents`, `partialPrefetching` y `experimental.agentFeedback`: la semántica de caché y fetch de datos difiere de versiones previas de Next. Ver los docs incluidos en `node_modules/next/dist/docs/` antes de asumir APIs.
- Tailwind v4 corre por loader de Turbopack (`@tailwindcss/turbopack` en `next.config.ts`); no hay `tailwind.config.*` — la configuración es CSS-first en `app/globals.css`.
- Los layouts reciben props tipados autogenerados (p. ej. `LayoutProps<"/">` en `app/layout.tsx`); seguir esa convención.