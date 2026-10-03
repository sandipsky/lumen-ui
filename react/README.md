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

Override the tokens at `:root` or on any container:

```css
:root {
  --accent: #2563eb;
  --accent-bg: #eff6ff;
  --accent-dark: #1d4ed8;
}
```

## Docs

Every component has a Storybook story with live controls. Run `npm run storybook` in the LumenUI repo's `react/` folder. The repo's root README covers development.
