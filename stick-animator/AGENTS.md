# Project guidelines

These instructions apply to this directory and its descendants. Follow more specific
`AGENTS.md` files when working inside their directories.

## Working approach

- Read the relevant code and configuration before making changes.
- Keep changes focused on the requested behavior. Avoid unrelated refactors or reformatting.
- Use the existing Vue 3, TypeScript, Vite, Vue Router, and Pinia stack.
- Prefer existing dependencies and native browser APIs. Add a dependency only when it
  materially simplifies a concrete requirement.
- Keep the application working after each change. Report checks performed and any failures.

## Small files and single responsibility

- Aim for 50–150 lines per source file. Keep new or modified source files at or below
  200 lines, including template, script, styles, comments, and blank lines.
- Split a file before it exceeds that limit, using meaningful responsibilities rather
  than arbitrary line ranges. Do not compress code to satisfy the limit.
- Generated files, lockfiles, and static data are exempt. Do not edit generated output.
- Each component, composable, store, and module must have one clear responsibility.
- Keep functions focused on one operation; aim for no more than 30 lines per function.
  Extract helpers when they clarify intent, rather than creating trivial indirection.
- Prefer early returns and shallow branching. Extract complex conditions into named values.

## Architecture and dependencies

- Organize application code by feature as the default. Place each capability under
  `src/features/<feature>/`, using domain names such as `timeline`, `playback`, or `export`.
- Keep a feature's components, views, composables, stores, domain logic, services, types,
  tests, and assets together inside that feature. Reuse within one feature does not make
  code application-wide shared code.
- Start small features with a flat directory. Add local folders such as `components/`,
  `domain/`, or `__tests__/` only when they improve navigation.
- Do not use top-level technical folders such as `src/components/`, `src/views/`,
  `src/composables/`, or `src/stores/` as the default home for feature code.
- Keep application setup, router assembly, plugins, and shell composition in `src/app/`.
  Keep root entry points such as `main.ts` and `App.vue` thin. Feature views and route
  definitions belong to their feature; the application router composes those routes.
- Use `src/shared/` only for code needed by multiple features and independent of any
  particular feature, such as generic UI controls, browser adapters, or design tokens.
  Shared code must not import from features or the application layer.
- Keep feature internals private. When another feature or the app needs access, expose
  only the required components, functions, or types through an explicit public entry
  point such as the feature's `index.ts`. Avoid imports into another feature's internals.
- Let the application layer compose features. Minimize dependencies between features;
  use explicit contracts and avoid circular imports or stores coupled to other stores.
- Inside each feature, keep pure domain rules and data transformations independent of
  Vue, Pinia, the DOM, storage, and network access. Isolate side effects in focused
  services or adapters. UI and adapters may depend on domain modules, not the reverse.
- Apply this structure to new code. Move existing technical-folder code incrementally
  when a requested change touches it; update imports and keep behavior unchanged.
  Avoid unrelated repository-wide migrations.
- Create directories as needed. Do not add empty layers, generic repositories, factories,
  base classes, or abstractions for hypothetical future requirements.
- Keep `utils` modules narrowly named and scoped. Avoid catch-all helper files.

## Vue components and state

- Use single-file components with `<script setup lang="ts">` and the Composition API.
- Extract components for distinct UI responsibilities, repeated markup, and complex
  interactions. Keep templates readable and move substantial logic into the script.
- Define typed props and emits. Treat props as read-only and communicate changes through
  explicit events or typed `v-model` contracts.
- Prefer local state. Use composables for reactive behavior and Pinia only for state
  shared across unrelated components or routes.
- Use `computed` for derived values. Use watchers for necessary side effects, not to
  duplicate state that can be derived.
- Keep DOM manipulation inside focused components, composables, or browser adapters.
  Release listeners, timers, subscriptions, and animation frames when their owner ends.
- Use stable, unique keys for lists. Avoid array-index keys for mutable lists.
- Prefer slots and composition over components with many unrelated boolean props.
- Use scoped component styles by default; reserve global styles for tokens, resets,
  typography, and application-wide foundations.
- Use semantic HTML, accessible names, keyboard support, and visible focus states.
  For canvas interactions, provide accessible controls and labels outside the canvas.

## Naming and TypeScript

- Name things for their domain purpose. Avoid vague names such as `data`, `manager`,
  `common`, or `helper` when a more specific name is available.
- Use PascalCase and multiword names for components and their files, such as
  `AnimationTimeline.vue`. `App.vue` is the root-component exception.
- Use camelCase for variables, functions, and ordinary TypeScript modules.
- Name composables `useSomething`, Pinia stores `useSomethingStore`, and booleans with
  meaningful prefixes such as `is`, `has`, `can`, or `should`.
- Use PascalCase for types and interfaces, without `I` prefixes. Use UPPER_SNAKE_CASE
  for genuine module-level constants, not every immutable local variable.
- Use verbs for actions and event names that clearly describe the interaction.
- Prefer inference for obvious local types and explicit types at public boundaries.
- Avoid `any`, unchecked type assertions, and non-null assertions. Narrow `unknown`
  values and validate external data at integration boundaries.
- Avoid magic numbers and duplicated domain strings. Give meaningful values names.
- Add comments for reasoning, constraints, and tradeoffs; keep names clear enough that
  comments do not need to narrate the code.

## Linting and formatting

- Follow `eslint.config.ts`, `.oxlintrc.json`, `.prettierrc.json`, and `.editorconfig`.
- Use two-space indentation, LF line endings, single quotes in scripts, no semicolons,
  and Prettier's configured print width of 100.
- Use the configured formatters instead of manually aligning or compressing code.
- Do not disable lint rules, weaken TypeScript settings, or add ignore directives to
  bypass a problem. Fix the cause; explain any necessary, narrowly scoped exception.
- For application-code changes, run the relevant checks from the project directory:

  ```sh
  npm run format
  npm run lint
  npm run build
  ```

- The format and lint scripts modify files. Review their diff and exclude unrelated edits.
- For changes outside `src/`, format the affected files explicitly when supported:

  ```sh
  npx --no-install prettier --write path/to/file
  ```

- Documentation-only changes require checking the document and formatting; application
  builds and unit tests are unnecessary unless configuration or behavior also changes.

## Tests and completion

- Add or update focused Vitest tests for changed domain behavior, nontrivial state,
  interactions, and bug regressions. Test observable behavior, not implementation details.
- Keep tests with their owning feature, using its local `__tests__/*.spec.ts` convention.
  Tests for shared modules stay with those modules in `src/shared/`. Use Vue Test Utils
  for component interactions; name small tests for the behavior they verify.
- Run relevant tests once, without watch mode:

  ```sh
  npm run test:unit -- --run
  ```

- Check UI changes in the browser when available, including relevant responsive and
  keyboard interactions. Do not claim a visual check that was not performed.
- Before finishing, review the diff for accidental files, unused code, debug logging,
  secrets, unrelated formatting, and violations of the file-size limit.
- If a check cannot run, state what prevented it and what remains unverified.
