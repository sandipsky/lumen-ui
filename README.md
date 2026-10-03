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

35 components, available in both frameworks:

| Category | Components |
| --- | --- |
| **Actions** | Button, Icon, Menu, Segmented Control |
| **Form inputs** | Text Input, Password Input, Email Input, Username Input, Number Input, Select, Date Input (AD / BS Nepali calendar), Textarea, Toggle, Checkbox, Radio, OTP / PIN Input, File Upload |
| **Overlays & feedback** | Modal (+ Confirm Dialog), Drawer, Notification, Tooltip, Loading Spinner, Skeleton |
| **Navigation** | Breadcrumb, Pagination, Tabs, Stepper, Tree View, Sidebar & Header |
| **Data display** | Table, Card, Avatar, Badge, Chip, Accordion, Filter |
| **Layout** | Box, Flex, Grid, Spacer |

There is also a **Form Validation** story that shows how the inputs work with Angular reactive forms and with `react-hook-form` + `zod`.

---

## Repository structure

```
lumen-ui/
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
        │   ├── provider/            # <LUIProvider> (all contexts in one)
        │   ├── layout/              # App shell: header, sidebar
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

The two packages are independent, so install and run each one from its own folder.

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
| `npm pack` | Build the library and pack it as `react/lumen-ui-react-<version>.tgz` (`npm run pack` does the same) |
| `npm run build:showcase` | Type-check (`tsc -b`) and build the showcase app to `react/dist-showcase/` |
| `npm run preview` | Serve the showcase build locally |
| `npm run build-storybook` | Static Storybook build to `react/storybook-static/` |
| `npm run lint` | Lint with ESLint |

---

## Using LumenUI in another project

### 1. Build a tarball

```bash
cd angular && npm run pack   # → angular/lumen-ui-angular-0.1.0.tgz
cd react && npm pack         # → react/lumen-ui-react-0.1.0.tgz
```

### 2. Install it in the other project

```bash
npm install path/to/lumen-ui-angular-0.1.0.tgz
# or
npm install path/to/lumen-ui-react-0.1.0.tgz
```

Commit the tarball to the consuming project (e.g. under `vendor/`), or put it somewhere shared, so that project's `package.json` can refer to it with `"@lumen-ui/angular": "file:vendor/lumen-ui-angular-0.1.0.tgz"`. To ship a change, bump `version` in the package manifest, pack again and reinstall.

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

Colours are CSS custom properties defined in `angular/projects/lumen-ui/src/lib/styles/_colors.scss` and `react/src/styles/colors.css`, and both packages share the same token names. To re-theme LumenUI, override the variables at `:root` or on a container:

```css
:root {
  --accent: #2563eb;       /* brand colour (default green #4cb139) */
  --accent-bg: #eff6ff;
  --accent-dark: #1d4ed8;
}
```

Other tokens cover status colours (`--success`, `--error`, `--warn`, `--info`, each with a `-bg` variant), text (`--text-primary` … `--text-quaternary`) and separators. Components use the same class names in both frameworks, so style overrides work in either one.

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
- Icons: drop an `.svg` into `icons/`. React picks it up automatically. Angular picks it up the next time any script runs (or run `npm run icons`).
- React: write plain function components (the React Compiler handles memoisation), pass `ref` as a normal prop (no `forwardRef`), and use one `.css` file per component.
- Angular: use standalone components, signals (`input()`, `computed()`), `OnPush` change detection and SCSS.
