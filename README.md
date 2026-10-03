# LumenUI

A UI component library for **Angular** and **React**, with the same components, class names and design tokens in both.

The Angular implementation is the source of truth. The React package is a faithful port: public APIs, defaults, CSS and behaviour match the Angular originals, adapted to React where the framework requires it.

| Package | Stack | Folder |
| --- | --- | --- |
| **LumenUI Angular** | Angular 22 · standalone components · signals · SCSS · Vitest | [`angular/`](./angular) |
| **LumenUI React** | React 19 · TypeScript · Vite 8 · React Compiler · plain CSS | [`react/`](./react) |

Each package also ships a **showcase app** with a story page for every component: live examples, code snippets and an API table.

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
├── angular/                         # LumenUI for Angular (source of truth)
│   └── src/app/
│       ├── shared/
│       │   ├── components/ui/       # Library components (l-* selectors)
│       │   ├── directives/          # FormValidation directive
│       │   ├── services/            # Spinner service
│       │   └── styles/              # _colors, _form, _utils (SCSS)
│       └── showcase/                # Showcase app: story pages, API tables
│
└── react/                           # LumenUI for React (port)
    ├── PORTING.md                   # Angular → React porting conventions
    └── src/
        ├── components/
        │   ├── index.ts             # Library barrel export
        │   ├── provider/            # <LUIProvider> (all contexts in one)
        │   ├── layout/              # App shell: header, sidebar, main layout
        │   └── ui/                  # Library components (LUI* exports)
        ├── styles/                  # colors.css, utils.css
        └── showcase/                # Showcase app: story pages, API tables
```

---

## Getting started

### Prerequisites

- **Node.js**: a current LTS release (22 or 24)
- **npm**: the Angular package pins `npm@11` through `packageManager`

The two packages are independent, so install and run each one from its own folder.

### Angular

```bash
cd angular
npm install
npm start          # http://localhost:4200
```

| Script | Description |
| --- | --- |
| `npm start` | Start the dev server with the showcase app |
| `npm run build` | Production build to `angular/dist/` |
| `npm run watch` | Development build in watch mode |
| `npm test` | Run unit tests with Vitest |

### React

```bash
cd react
npm install
npm run dev        # http://localhost:5173
```

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server with the showcase app |
| `npm run build` | Type-check (`tsc -b`) and build to `react/dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Lint with ESLint |

---

## Usage

### Angular

Components are standalone, use `OnPush` change detection, and have `l-`-prefixed selectors. Import them into the component that uses them:

```ts
import { Component, inject } from '@angular/core';
import { Button } from './shared/components/ui/button/button';
import { NotificationService } from './shared/components/ui/notification';

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
import { LUIProvider, LUIButton, useLUINotification } from './components';

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

Colours are CSS custom properties defined in `angular/src/app/shared/styles/_colors.scss` and `react/src/styles/colors.css`, and both packages share the same token names. To re-theme LumenUI, override the variables at `:root` or on a container:

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
3. **Add or update the story page** in both showcase apps, and register new components in each app's routes and showcase registry.
4. Before opening a PR, check that both packages build (`npm run build`), that React lints (`npm run lint`) and that Angular tests pass (`npm test`).

### Conventions

- File and folder names are kebab-case and mirror each other across both packages (`ui/<name>/<name>.ts` ↔ `ui/<name>/<name>.tsx`).
- Keep public API surfaces aligned: same input/prop names, defaults, types and doc comments.
- React: write plain function components (the React Compiler handles memoisation), pass `ref` as a normal prop (no `forwardRef`), and use one `.css` file per component.
- Angular: use standalone components, signals (`input()`, `computed()`), `OnPush` change detection and SCSS.
