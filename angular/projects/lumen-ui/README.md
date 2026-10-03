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

Override the tokens at `:root` or on any container:

```css
:root {
  --accent: #2563eb;
  --accent-bg: #eff6ff;
  --accent-dark: #1d4ed8;
}
```

## Docs

Every component has a Storybook story with live controls. Run `npm run storybook` in the LumenUI repo's `angular/` folder.
