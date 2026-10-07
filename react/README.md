# @lumen-ui/react

LumenUI components for React 19: typed function components with `LUI*` names, shipped already compiled by the React Compiler. The Angular package, `@lumen-ui/angular`, has the same components, class names and design tokens.

## Install

From a tarball (run `npm pack` in the LumenUI repo's `react/` folder to build one):

```bash
npm install ./lumen-ui-react-0.1.0.tgz
```

Once the package is published to a registry, install it by name instead: `npm install @lumen-ui/react`.

Peer dependencies: `react` and `react-dom` (`^19.0.0`).

## Styles

Import the stylesheet once, near your app's entry point. It contains the design tokens, utility classes and every component's CSS:

```ts
import '@lumen-ui/react/styles.css';
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

Mount `LUIProvider` once near the root, so the notification, spinner, modal and drawer hooks work anywhere below it:

```tsx
import { LUIButton, LUIProvider, useLUINotification } from '@lumen-ui/react';
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

- Text-like inputs accept native props, so they work with `react-hook-form`'s `register()` or as plain controlled inputs.
- Inputs that hold non-DOM values (Date Input, OTP Input, Select) are controlled through `value` and `onChange(value)`. Use them with react-hook-form through `<Controller>`.
- `LUIBreadcrumb` renders plain `<a href>` links. For client-side navigation, pass your router's link: `<LUIBreadcrumb items={items} linkComponent={Link} />`. TanStack Router's and React Router's `Link` both work as-is.

## Theming

Every color comes from a CSS custom property (a design token). Pass a theme to `LUIProvider`, and change the prop to re-theme at runtime:

```tsx
<LUIProvider theme={{ accent: '#2563eb' }}>
  <App />
</LUIProvider>
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
- To theme one part of a page, use `luiThemeVars()`: `<section style={luiThemeVars({ accent: 'var(--error)' })}>`. Overlays render under `<body>`, so they keep the page-wide theme.
- With server-side rendering, `LUIProvider` applies the theme only after hydration. To theme the first paint, put the tokens on `<html>` yourself: `<html style={luiThemeVars(theme)}>`.

## Docs

Every component has a Storybook story with live controls. Run `npm run storybook` in the LumenUI repo's `react/` folder. The repo's root README covers development.
