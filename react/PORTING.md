# LumenUI React — Porting Conventions (Angular → React)

This project is a React port of the Angular library at
`~/Projects/angular-ui` (LumenUI).
Follow these rules exactly so all ports are consistent.

> **Status (2026-07-17): the initial port is complete.** All 35 registry
> components + story pages are ported, and routes/providers are wired in
> `src/App.tsx`. These conventions still apply to any new component or fix
> ported from the Angular source.

## Stack

- React 19 + TypeScript + Vite (React Compiler enabled — write plain idiomatic
  function components; do NOT use `React.memo`, `useCallback`, or `useMemo`
  unless semantically required).
- react-router-dom v7, react-hook-form, zod, @hookform/resolvers are installed.
- Plain CSS (no sass, no CSS modules). One `.css` file per component, imported
  by its `.tsx` file.

## Reference files (read these first — they define the pattern)

- Component: `src/components/ui/button/button.tsx` + `button.css`
- Story page: `src/showcase/pages/button-stories/button-stories.tsx` + `.css`
- Showcase infra: `src/showcase/story/story.tsx`, `src/showcase/api-table/api-table.tsx`
- Global styles: `src/index.css`, `src/styles/*.css`, `src/showcase/story-page.css`

## File layout & naming

- Angular `src/app/shared/components/ui/<name>/<name>.ts|html|scss`
  → React `src/components/ui/<name>/<name>.tsx` + `<name>.css`.
  Keep kebab-case file/dir names identical to the Angular tree.
- Components are **named exports** prefixed `LUI`: `l-button` → `LUIButton`,
  `l-text-input` → `LUITextInput`, `l-loading-spinner` → `LUILoadingSpinner`.
- Props interface is exported as `LUI<Name>Props`. Re-export supporting types
  (e.g. `ButtonVariant`) with their original names.
- Story pages: `src/showcase/pages/<path>-stories/<path>-stories.tsx` with a
  **default export** named `<Path>Stories` (needed for `React.lazy`), plus a
  sibling `.css` (may be empty-ish — only page-specific rules).

## Angular → React translation rules

| Angular | React |
| --- | --- |
| `input<T>()` / `input.required<T>()` | prop (optional with same default / required) |
| `output<T>()` `foo` | callback prop `onFoo?: (value: T) => void` (native-event passthroughs: just spread native props instead) |
| `model()` | controlled prop pair `value` + `onChange` |
| `<ng-content />` | `children` |
| `<ng-content select="[x]" />` | a `ReactNode` prop named `x` |
| `signal()` / `computed()` | `useState` / plain derived const |
| `@if` / `@for` | `&&`/ternary / `.map()` (always set `key`) |
| Injectable service (drawer, notification, spinner) | React context + provider component `LUI<X>Provider` + hook `useLUI<X>()` |
| `[class.foo]` | conditional className |
| `host:` bindings / `:host` styles | apply to the component's root element / root class |
| Angular CDK overlay / `createComponent` | `createPortal` to `document.body` |

- Preserve the Angular component's public API surface (input names, defaults,
  types, doc comments) unless React idiom demands otherwise; translate JSDoc
  comments over.
- React 19: `ref` is a normal prop — do NOT use `forwardRef`.
- Wrapper components accepting native props: extend
  `ComponentPropsWithRef<'button' | 'input' | ...>` and spread `...rest`, merging
  `className` like `button.tsx` does.
- Do not add new features or restyle anything; this is a faithful port.

## CSS rules

- Copy the Angular `.scss` content into the component `.css`:
  - Convert `//` comments to `/* ... */` (line comments are invalid CSS).
  - Native CSS nesting (`&`) is allowed and supported — keep the nesting if you
    like, or flatten; just make it valid plain CSS.
  - Replace `:host { ... }` with a rule on the component's root class.
  - No `@use`/`@forward`/sass variables/mixins (color tokens are already CSS
    custom properties from `src/styles/colors.css` — keep `var(--...)` as-is).
  - Fix obvious unit bugs (`font-size: 14` → `14px`).
- Class names stay exactly as in the Angular source (styles are global now, but
  the names are distinct per component). If you spot a genuine cross-component
  collision, prefix with the component name and note it in your report.
- Shared form/field classes live in `src/components/ui/input/form.css`,
  imported by each input component (`import '../form.css'`), not globally —
  use them in input components, don't redefine: `.form-group`, `.form-control`,
  `.input-wrapper`, `.left-icon`, `.right-icon`, `.alert`
  (+ `.success/.error/.warn/.info`), `.control-row`, `.control-label`,
  `.lui-field`, `.lui-control-host`. Components outside `ui/input/` must not
  depend on them (make component-owned copies instead, like `filter.css` does).
  Utility classes from `src/styles/utils.css` and the `.row/.col-*` grid from
  `bootstrap.css` are still global.

## Input components — react-hook-form contract (IMPORTANT)

Angular used `ControlValueAccessor` + a `FormValidation` directive. In React,
every form control must work **uncontrolled with react-hook-form's
`register()`** and also as a plain controlled component. Pattern for text-like
inputs (text, password, email, number, textarea, select):

```tsx
export interface LUITextInputProps
  extends Omit<ComponentPropsWithRef<'input'>, 'size' | 'type'> {
  label?: string;
  /** Validation message shown under the field; also applies the error style. */
  error?: string;
}

export function LUITextInput({ label, error, id, required, className, ...rest }: LUITextInputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  return (
    <div className="form-group lui-field">
      {label && (
        <label htmlFor={inputId}>
          {label}
          {required && <span> *</span>}
        </label>
      )}
      <input
        id={inputId}
        type="text"
        className={['form-control', error ? 'error' : '', className ?? ''].filter(Boolean).join(' ')}
        required={required}
        {...rest}
      />
      {error && <div className="alert error">{error}</div>}
    </div>
  );
}
```

Usage both ways:

```tsx
<LUITextInput label="Name" {...register('name')} error={errors.name?.message} />
<LUITextInput label="Name" value={name} onChange={(e) => setName(e.target.value)} />
```

- `name`, `onChange`, `onBlur`, `ref`, `value`/`defaultValue`, `disabled`,
  `placeholder` all flow through as native props (that's what `register()`
  returns) — do NOT invent custom `onValueChange`-style APIs for text inputs.
- Boolean controls (checkbox, toggle): same idea over `<input type="checkbox">`
  (`checked`/`defaultChecked` + native `onChange`), with `label` and
  `labelPosition?: 'left' | 'right'` presentation props.
- Radio group renders one native radio per `options: RadioOption[]` entry and
  passes `name`/`onChange`/`onBlur`/`ref` through to the native inputs so
  `{...register('field')}` works on the group.
- Components with non-DOM values (date-input with AD/BS calendars, OTP input,
  custom select dropdown) should be controlled (`value` + `onChange(value)`)
  — RHF users wrap them in `<Controller>`; note that in the story's ApiTable.

## Story pages

- Root element: `<div className="story-page">` — shared header/layout CSS lives
  in `src/showcase/story-page.css` (`.page-header`, `.page-header__title`,
  `.page-header__lead`, `.stories`). Do NOT redefine those per page.
- Port every story section from the Angular page (`<app-story>` → `<Story>`),
  including `title`, `description`, and the `code` snippet — **rewrite the code
  snippets as React/JSX** showing the LUI component usage.
- Port the ApiTable rows, updating examples to JSX syntax and callback names
  (`(change)` → `onChange` etc.). `component` prop gets the React name, e.g.
  `component="LUIButton"`; for hooks/services pass the hook name (e.g.
  `useLUIDrawer()`).
- Stories that used Angular `FormsModule`/`ngModel` demos: use `useState` for
  the controlled demo instead.
- Import other LUI components from their canonical paths when a story needs
  them (e.g. modal stories use `LUIButton`).

## Do NOT touch (when porting in parallel batches)

`src/App.tsx`, `src/main.tsx`, `src/index.css`, `src/styles/*`,
`src/showcase/showcase.data.ts`, `src/showcase/story-page.css`,
`src/showcase/story/*`, `src/showcase/api-table/*`,
`src/showcase/showcase-layout/*`, `index.html`, `package.json`, any config.
Routes and context providers are wired centrally, not per batch — a new
component's route goes into `src/App.tsx` (lazy import + `<Route>`) and its
registry entry into `showcase.data.ts` as a single follow-up step.

## Definition of done (per component batch)

1. Component(s) + CSS ported under `src/components/ui/...`.
2. Story page(s) + CSS ported under `src/showcase/pages/...` with default export.
3. `npx tsc -b --noEmit`-clean for your files (you may not be able to run the
   full build if other batches are mid-flight — at minimum ensure your imports
   resolve and types check in isolation).
4. Report: exported component names, any provider components that must be
   mounted in `App.tsx`, and any intentional deviations from the Angular source.
