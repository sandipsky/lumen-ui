# @lumen-ui/angular

LumenUI components for Angular 22: standalone, signal-based and `OnPush`, with `l-*` selectors. The React package, `@lumen-ui/react`, has the same components, class names and design tokens.

## Install

From a tarball (run `npm run pack` in the LumenUI repo's `angular/` folder to build one):

```bash
npm install ./lumen-ui-angular-0.1.0.tgz
```

Once the package is published to a registry, install it by name instead: `npm install @lumen-ui/angular`.

Peer dependencies: `@angular/common`, `@angular/core`, `@angular/forms`, `@angular/platform-browser` and `@angular/router` (all `^22.0.0`), plus `rxjs` (`^7.8.0`).

## Global styles

Include the global stylesheet once per app. It contains the design tokens (CSS custom properties), the shared form classes and the utility classes. Add it to `src/styles.scss`:

```scss
@use '@lumen-ui/angular/styles';
```

or to the `styles` array in `angular.json`:

```json
"styles": ["node_modules/@lumen-ui/angular/styles/lumen-ui.scss", "src/styles.scss"]
```

The components expect a base reset like the one the LumenUI showcase uses:

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

## Usage

Import components into the standalone component that uses them, and inject the services:

```ts
import { Component, inject } from '@angular/core';
import { Button, NotificationService } from '@lumen-ui/angular';

@Component({
  selector: 'app-example',
  imports: [Button],
  template: `<l-button variant="primary" (click)="save()">Save</l-button>`,
})
export class Example {
  private readonly notification = inject(NotificationService);

  save() {
    this.notification.success('Saved', 'Your changes were stored.');
  }
}
```

- `NotificationService`, `ModalService`, `DrawerService` and `SpinnerService` are provided in root, so they need no setup.
- Form inputs implement `ControlValueAccessor`, so they work with `formControlName` and `ngModel`.
- `l-breadcrumb` links use `routerLink`, so apps that render it need `provideRouter(...)`.
- Icons are lazy-loaded: each one is its own chunk in your build and is fetched the first time it renders.

## Theming

Every color comes from a CSS custom property (a design token). Set a theme when the app starts:

```ts
// app.config.ts
import { provideTheme } from '@lumen-ui/angular';

export const appConfig: ApplicationConfig = {
  providers: [provideTheme({ accent: '#2563eb' })],
};
```

Change it at runtime with `ThemeService`. `set()` replaces the current overrides, and `reset()` restores the defaults:

```ts
inject(ThemeService).set({ accent: tenant.brandColor, bgLight: '#f8fafc' });
```

The theme is applied on `<html>`, so it also reaches modals, drawers, notifications and select menus. Tokens it leaves out keep their defaults. The same tokens can be overridden in CSS instead:

```css
:root {
  --accent: #2563eb;
}
```

Theme keys are the token names in camelCase (`accentBg` → `--accent-bg`):

| Keys | Used for |
| --- | --- |
| `accent` | Brand color (default `#4cb139`): primary buttons, checked inputs, active tab, page and step |
| `accentBg`, `accentDark` | Accent tint (chips, hovers, focus rings) and hover shade. Derived from `accent` |
| `accentContrast` | Text and icons on an accent fill. Default `var(--text-white)` |
| `success`, `error`, `warn`, `info`, `premium`, `cancel` | Status colors, each with a `…Bg` tint |
| `textPrimary`, `textSecondary`, `textTertiary`, `textQuaternary`, `textWhite` | Text colors |
| `separator`, `separatorLight`, `separatorDark` | Borders and dividers |
| `bgLightest`, `bgLight`, `bgSemiLight`, `bgDark` | Backgrounds. `bgLightest` is the surface of inputs, cards, menus and modals |

- The accent alone is enough: `--accent-bg` and `--accent-dark` follow it. In a theme, a status color passed without its `…Bg` gets a matching tint too. In plain CSS, set both.
- For a light accent such as yellow, set `accentContrast` to a dark color so text on accent fills stays readable.
- To theme one part of a page, bind `themeVars()` with `[style]`: `<section [style]="vars">`, where `vars = themeVars({ accent: 'var(--error)' })`. Overlays render under `<body>`, so they keep the page-wide theme.

## Docs

Every component has a Storybook story with live controls. Run `npm run storybook` in the LumenUI repo's `angular/` folder.
