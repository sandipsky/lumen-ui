# LumenUI

A UI component library for **Angular** and **React**, with the same components, class names and design tokens in both.

The Angular implementation is the source of truth. The React package is a faithful port: public APIs, defaults, CSS and behaviour match the Angular originals, adapted to React where the framework requires it.

| Package | npm name | Stack | Folder |
| --- | --- | --- | --- |
| **LumenUI Angular** | `@lumen-ui/angular` | Angular 22 · standalone components · signals · SCSS · ng-packagr | [`angular/`](./angular) |
| **LumenUI React** | `@lumen-ui/react` | React 19 · TypeScript · Vite 8 · React Compiler · plain CSS | [`react/`](./react) |

Both packages build as installable libraries (a tarball today, an npm package later). Each one also has a **Storybook** playground with live controls for every component, and a **showcase app** with a story page per component: live examples, code snippets and an API table.

---

## Components

39 components, available in both frameworks:

| Category | Components |
| --- | --- |
| **Actions** | Button, Icon, Menu, Segmented Control |
| **Form inputs** | Text Input, Password Input, Email Input, Username Input, Number Input, Select, Date Input (AD / BS Nepali calendar), Textarea, Toggle, Checkbox, Radio, OTP / PIN Input, File Upload |
| **Overlays & feedback** | Modal (+ Confirm Dialog), Drawer, Notification, Tooltip, Loading Spinner, Skeleton |
| **Navigation** | Breadcrumb, Pagination, Tabs, Stepper, Tree View |
| **Data display** | Table, Card, Avatar, Badge, Chip, Accordion, Filter |
| **Layout** | Box, Flex, Grid, Spacer |

There is also a **Form Validation** story that shows how the inputs work with Angular reactive forms and with `react-hook-form` + `zod`.

---

## Repository structure

```
lumen-ui/
├── package.json                     # Repo-level scripts (no dependencies)
├── scripts/
│   ├── storybook.mjs                # Run both Storybooks at once
│   └── pack.mjs                     # Build tarballs for both libraries (or one)
├── USING-TARBALLS.txt               # Setup guide for projects that install a tarball
├── tarballs/                        # Output of `npm run tarball` (gitignored)
├── icons/                           # Shared SVG icon set used by both Icon components
│
├── angular/                         # Angular CLI workspace (source of truth)
│   ├── angular.json                 # Projects: lumen-ui (library), showcase (app)
│   ├── scripts/generate-icons.mjs   # icons/*.svg → TS modules for the library
│   ├── projects/lumen-ui/           # The @lumen-ui/angular library (ng-packagr)
│   │   ├── src/public-api.ts        # Public API: everything the package exports
│   │   ├── src/lib/
│   │   │   ├── components/ui/       # Library components (l-* selectors)
│   │   │   ├── directives/          # FormValidation directive
│   │   │   ├── services/            # Spinner service
│   │   │   ├── theme/               # Theme type, provideTheme, ThemeService
│   │   │   └── styles/              # lumen-ui.scss → _colors, _form, _utils
│   │   ├── stories/                 # Storybook stories (*.stories.ts)
│   │   └── .storybook/              # Storybook config
│   └── src/app/showcase/            # Showcase app: story pages, API tables
│
└── react/                           # The @lumen-ui/react library (port) + showcase
    ├── PORTING.md                   # Angular → React porting conventions
    ├── vite.lib.config.ts           # Library build → dist/
    ├── .storybook/                  # Storybook config
    └── src/
        ├── index.ts                 # Library entry: global CSS + components
        ├── components/
        │   ├── index.ts             # Library barrel export
        │   ├── provider/            # <LUIProvider> (all contexts + theme)
        │   ├── theme/               # LUITheme, luiThemeVars()
        │   └── ui/                  # Library components (LUI* exports)
        ├── styles/                  # colors.css, utils.css
        ├── stories/                 # Storybook stories (*.stories.tsx)
        └── showcase/                # Showcase app: story pages, API tables
```

Both showcases and both Storybooks import the library by its package name (`@lumen-ui/angular`, `@lumen-ui/react`). A path alias points that name at the library source, so changes show up without a rebuild.

---

## Getting started

### Prerequisites

- **Node.js**: a current LTS release (22 or 24)
- **npm**: the Angular package pins `npm@11` through `packageManager`

### From the repo root

The root `package.json` has scripts that drive both packages at once. They're plain Node, so they work the same on Windows, macOS and Linux. There's nothing to install at the root, and the scripts run `npm install` in a package whose `node_modules` is missing.

```bash
npm run storybook          # Angular (6006) and React (6007) Storybooks side by side
npm run tarball            # build both libraries and pack them into tarballs/
```

| Script | Description |
| --- | --- |
| `npm run storybook` | Start both Storybooks. Output is prefixed `[Angular]` / `[React]`, the URLs are printed once both are ready, and Ctrl+C stops both |
| `npm run storybook:angular` / `storybook:react` | Start just one |
| `npm run storybook -- --open` | Also open each Storybook in the browser when it's ready |
| `npm run tarball` | Build and pack both libraries into `tarballs/`, along with a copy of [`USING-TARBALLS.txt`](./USING-TARBALLS.txt) |
| `npm run tarball:angular` / `tarball:react` | Build and pack just one |
| `npm run tarball -- --out <dir>` | Write the tarballs somewhere else |

If a Storybook port is busy, Storybook moves to the next free one, and the ready banner shows the actual URL. You can also call the scripts directly: `node scripts/storybook.mjs react --open`, `node scripts/pack.mjs angular --out ../vendor`. Pass `--help` for the options.

The two packages are otherwise independent. To work on one, install and run it from its own folder.

### Angular

```bash
cd angular
npm install          # also generates the icon modules (npm run icons)
npm run storybook    # http://localhost:6006
npm start            # showcase app, http://localhost:4200
```

| Script | Description |
| --- | --- |
| `npm run storybook` | Start Storybook (component playground) |
| `npm start` | Start the dev server with the showcase app |
| `npm run build` | Build the library to `angular/dist/lumen-ui/` |
| `npm run pack` | Build the library and pack it as `angular/lumen-ui-angular-<version>.tgz` |
| `npm run build:showcase` | Production build of the showcase app to `angular/dist/showcase/` |
| `npm run build-storybook` | Static Storybook build to `angular/dist/storybook/` |
| `npm run watch` | Library development build in watch mode |
| `npm run icons` | Regenerate the icon modules from `icons/` (the other scripts run it for you) |
| `npm test` | Run unit tests with Vitest |

### React

```bash
cd react
npm install
npm run storybook  # http://localhost:6007
npm run dev        # showcase app, http://localhost:5173
```

| Script | Description |
| --- | --- |
| `npm run storybook` | Start Storybook (component playground) |
| `npm run dev` | Start the Vite dev server with the showcase app |
| `npm run build` | Build the library to `react/dist/` (JS, `styles.css`, `.d.ts`) |
| `npm pack` | Build the library (via `prepack`) and pack it as `react/lumen-ui-react-<version>.tgz` |
| `npm run build:showcase` | Type-check (`tsc -b`) and build the showcase app to `react/dist-showcase/` |
| `npm run preview` | Serve the showcase build locally |
| `npm run build-storybook` | Static Storybook build to `react/storybook-static/` |
| `npm run lint` | Lint with ESLint |

---

## Using LumenUI in another project

The step-by-step guide for the other project's developers is [`USING-TARBALLS.txt`](./USING-TARBALLS.txt). `npm run tarball` puts a copy next to the tarballs, so you can hand over the whole folder. It covers installing, styles, usage, updating and troubleshooting.

### 1. Build a tarball

From the repo root:

```bash
npm run tarball              # both → tarballs/lumen-ui-angular-0.1.0.tgz, tarballs/lumen-ui-react-0.1.0.tgz
npm run tarball -- angular   # just one (or: npm run tarball:angular)
```

Each package can also be packed on its own: `cd angular && npm run pack` or `cd react && npm pack`. Those write the tarball into the package folder.

### 2. Install it in the other project

```bash
npm install ./vendor/lumen-ui-angular-0.1.0.tgz
# or
npm install ./vendor/lumen-ui-react-0.1.0.tgz
```

Commit the tarball to the consuming project (e.g. under `vendor/`), so that project's `package.json` refers to it as `"@lumen-ui/angular": "file:vendor/lumen-ui-angular-0.1.0.tgz"`.

To ship a change, bump `version` in the package manifest, run `npm run tarball` again, and in the other project run `npm install ./vendor/<new file>.tgz`. Always bump the version. If you replace a tarball with a rebuilt one of the same name, a plain `npm install` or `npm ci` keeps installing the old cached contents.

### 3. Add the global styles

| | |
| --- | --- |
| **Angular** | `@use '@lumen-ui/angular/styles';` in `src/styles.scss`, or add `node_modules/@lumen-ui/angular/styles/lumen-ui.scss` to `styles` in `angular.json` |
| **React** | `import '@lumen-ui/react/styles.css';` once, near the app entry |

The components expect a base reset (`* { margin: 0; padding: 0; box-sizing: border-box; }`), which the showcases also use.

| | Peer dependencies |
| --- | --- |
| **Angular** | `@angular/common`, `core`, `forms`, `platform-browser`, `router` `^22.0.0` · `rxjs` `^7.8.0` |
| **React** | `react`, `react-dom` `^19.0.0` |

Each package's README, which ships inside the tarball, has the full setup: [`angular/projects/lumen-ui/README.md`](./angular/projects/lumen-ui/README.md) and [`react/README.md`](./react/README.md).

### Publishing to npm later

The tarballs are already npm packages, so nothing in the build has to change:

1. Make sure the `@lumen-ui` scope is yours on the target registry, or rename the packages to a scope you own. The names live in `angular/projects/lumen-ui/package.json` and `react/package.json`.
2. Set `license` in both manifests (currently `UNLICENSED`). For a private registry, add a `publishConfig.registry` entry.
3. Publish: `cd angular && npm run build && npm publish ./dist/lumen-ui` and `cd react && npm publish`. React's `prepack` script runs the build. Scoped packages are private by default, so add `--access public` for a public release.

---

## Usage

### Angular

Components are standalone, use `OnPush` change detection, and have `l-`-prefixed selectors. Import them into the component that uses them:

```ts
import { Component, inject } from '@angular/core';
import { Button, NotificationService } from '@lumen-ui/angular';

@Component({
  selector: 'app-example',
  imports: [Button],
  template: `
    <l-button variant="primary" size="md" (click)="save()">Save</l-button>
  `,
})
export class Example {
  private readonly notification = inject(NotificationService);

  save() {
    this.notification.success('Saved', 'Your changes were stored.');
  }
}
```

Services such as `NotificationService`, `ModalService` and `DrawerService` are injected with `inject()`. Form inputs implement `ControlValueAccessor`, so they work with `formControlName` and `ngModel`.

### React

Components are named exports with an `LUI` prefix. Mount `LUIProvider` once near the root so the notification, spinner, modal and drawer hooks work anywhere below it:

```tsx
import { LUIProvider, LUIButton, useLUINotification } from '@lumen-ui/react';
import '@lumen-ui/react/styles.css';

function SaveButton() {
  const notification = useLUINotification();

  return (
    <LUIButton variant="primary" onClick={() => notification.success('Saved', 'Your changes were stored.')}>
      Save
    </LUIButton>
  );
}

export default function App() {
  return (
    <LUIProvider>
      <SaveButton />
    </LUIProvider>
  );
}
```

Text-like inputs accept native props, so they work uncontrolled with `react-hook-form`'s `register()` or as plain controlled components:

```tsx
<LUITextInput label="Name" {...register('name')} error={errors.name?.message} />
<LUITextInput label="Name" value={name} onChange={(e) => setName(e.target.value)} />
```

Inputs that hold non-DOM values (Date Input, OTP Input, custom Select) are controlled through `value` and `onChange(value)`. Use them with react-hook-form through `<Controller>`.

`LUIBreadcrumb` doesn't depend on a router. It renders plain `<a href>` links unless you pass your router's link as `linkComponent` (TanStack Router's and React Router's `Link` both fit). The Angular `l-breadcrumb` uses `routerLink`.

### Naming across frameworks

| Angular | React |
| --- | --- |
| `<l-button>` | `<LUIButton>` |
| `<l-text-input>` | `<LUITextInput>` |
| `NotificationService` | `useLUINotification()` |
| `ModalService` | `useLUIModal()` |
| `DrawerService` | `useLUIDrawer()` |
| `input()` / `output()` / `model()` | props / `onX` callbacks / `value` + `onChange` |
| `<ng-content />` | `children` |

---

## Theming

Every colour in LumenUI comes from a CSS custom property (a design token). Both packages use the same token names, defined in `angular/projects/lumen-ui/src/lib/styles/_colors.scss` and `react/src/styles/colors.css`. You can override tokens in code or in CSS.

### In code

**Angular**: `provideTheme()` applies a theme before the first render, and `ThemeService` changes it at runtime.

```ts
// app.config.ts
import { provideTheme } from '@lumen-ui/angular';

export const appConfig: ApplicationConfig = {
  providers: [provideTheme({ accent: '#2563eb' })],
};
```

```ts
// later, e.g. once a tenant's branding has loaded
inject(ThemeService).set({ accent: tenant.brandColor, bgLight: '#f8fafc' });
```

**React**: pass `theme` to `LUIProvider`. Changing the prop re-themes the app.

```tsx
<LUIProvider theme={{ accent: '#2563eb' }}>
  <App />
</LUIProvider>
```

Both apply the tokens on `<html>`, so overlays rendered under `<body>` (modals, drawers, notifications, select menus) get them too. Tokens that a theme leaves out keep their defaults.

### In CSS

```css
:root {
  --accent: #2563eb;
}
```

### Tokens

Theme keys are the token names in camelCase: `accentBg` sets `--accent-bg`.

| Key | CSS variable | Default | Used for |
| --- | --- | --- | --- |
| `accent` | `--accent` | `#4cb139` | Brand colour: primary buttons, checked inputs, active tab, page and step, focus borders |
| `accentBg` | `--accent-bg` | 9% tint of `accent` | Primary chips, hovers, selected items, focus rings |
| `accentDark` | `--accent-dark` | `accent` mixed with 22% black | Primary button hover and bottom border |
| `accentContrast` | `--accent-contrast` | `var(--text-white)` | Text and icons on an accent fill |
| `success`, `error`, `warn`, `info`, `premium`, `cancel` | `--success`, … | | Status colours, each with a `…Bg` tint (`successBg` → `--success-bg`) |
| `textPrimary` … `textQuaternary`, `textWhite` | `--text-primary`, … | | Text, from strongest to faintest, and light text on coloured fills |
| `separator`, `separatorLight`, `separatorDark` | `--separator`, … | | Borders and dividers |
| `bgLightest`, `bgLight`, `bgSemiLight`, `bgDark` | `--bg-lightest`, … | | Backgrounds. `bgLightest` is the surface of inputs, cards, menus and modals |

**You only need the base colour.** `--accent-bg` and `--accent-dark` are computed from `--accent` with `color-mix()`, so setting the accent alone re-themes every component. The theme API goes a step further: any colour you pass without its `…Bg` partner also gets a matching tint. In plain CSS the status tints are fixed values, so if you change a status colour there, set its `-bg` as well.

**Light accents need dark text.** Text on accent fills is white by default. For a light accent such as yellow or lime, set `accentContrast` (`--accent-contrast`) to a dark colour.

### Theming part of a page

`themeVars()` (Angular) and `luiThemeVars()` (React) turn a theme into a style object, with the derived tints and shades filled in:

```ts
// Angular component
protected readonly dangerZone = themeVars({ accent: 'var(--error)' });
```

```html
<section [style]="dangerZone">…</section>
```

```tsx
// React
<section style={luiThemeVars({ accent: 'var(--error)' })}>…</section>
```

Overlays render under `<body>`, outside the section, so they keep the page-wide theme. If you override tokens on a container in your own CSS (`.brand { --accent: … }`), set `--accent-bg` and `--accent-dark` there too, because the derived values are computed once, at `:root`.

With server-side rendering in React, `LUIProvider` applies its theme after hydration. To theme the first paint, put the tokens on `<html>` yourself: `<html style={luiThemeVars(theme)}>`.

Both Storybooks have a **Theme** menu in the toolbar that applies sample themes to every story: blue, violet, rose, and amber with dark text.

Components use the same class names in both frameworks, so style overrides work in either one.

---

## Contributing

1. **Make changes in Angular first.** It is the reference implementation.
2. **Port the change to React** following [`react/PORTING.md`](./react/PORTING.md). It covers file layout, naming, the Angular → React translation table, CSS rules and the react-hook-form contract.
3. **Export it from the public API**: `angular/projects/lumen-ui/src/public-api.ts` and `react/src/components/index.ts`. Anything not exported there doesn't ship.
4. **Add or update the Storybook story** in both packages (`angular/projects/lumen-ui/stories/`, `react/src/stories/`), with the same title and story names in each.
5. **Add or update the story page** in both showcase apps, and register new components in each app's routes and showcase registry.
6. Before opening a PR, check that both libraries build (`npm run build`), both Storybooks build (`npm run build-storybook`), both showcases build (`npm run build:showcase`), React lints (`npm run lint`) and Angular tests pass (`npm test`).

### Conventions

- File and folder names are kebab-case and mirror each other across both packages (`ui/<name>/<name>.ts` ↔ `ui/<name>/<name>.tsx`).
- Keep public API surfaces aligned: same input/prop names, defaults, types and doc comments.
- Library code imports only its peer dependencies. Router-, form- or app-specific packages belong to the showcases and stories.
- Colours: use the tokens (`var(--accent)`, `var(--bg-lightest)`, …) rather than literal colours, so themes reach the component. Text or icons on an accent fill use `var(--accent-contrast)`. A new token goes in both colour files and in the theme type (`Theme` / `LUITheme`).
- Icons: drop an `.svg` into `icons/`. React picks it up automatically. Angular picks it up the next time any script runs (or run `npm run icons`).
- React: write plain function components (the React Compiler handles memoisation), pass `ref` as a normal prop (no `forwardRef`), and use one `.css` file per component.
- Angular: use standalone components, signals (`input()`, `computed()`), `OnPush` change detection and SCSS.
