import { provideRouter, withHashLocation } from '@angular/router';
import { themeVars, type Theme } from '@lumen-ui/angular';
import { applicationConfig, type Decorator, type Preview } from '@storybook/angular';

/** Sample themes for the toolbar's Theme menu (same set as the React Storybook). */
const THEMES: Record<string, Theme> = {
  default: {},
  blue: { accent: '#2563eb' },
  violet: { accent: '#7c3aed' },
  rose: { accent: '#e11d48' },
  // A light accent needs dark text on top of it.
  amber: { accent: '#f59e0b', accentContrast: '#07090f' },
};

let appliedVars: string[] = [];

/** Puts the selected theme on <html>, the same way ThemeService does in an app. */
const withTheme: Decorator = (story, { globals }) => {
  const { style } = document.documentElement;
  const vars = themeVars(THEMES[globals['theme']] ?? {});
  for (const name of appliedVars) style.removeProperty(name);
  for (const [name, value] of Object.entries(vars)) style.setProperty(name, value);
  appliedVars = Object.keys(vars);
  return story();
};

const preview: Preview = {
  decorators: [
    withTheme,
    // Breadcrumb links use `routerLink`, which needs a router. The catch-all
    // route keeps the initial navigation (and clicked crumbs) from erroring, and
    // hash location leaves the iframe's own path alone.
    applicationConfig({
      providers: [provideRouter([{ path: '**', children: [] }], withHashLocation())],
    }),
  ],
  globalTypes: {
    theme: {
      description: 'LumenUI theme overrides',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        dynamicTitle: true,
        items: [
          { value: 'default', title: 'Default (green)' },
          { value: 'blue', title: 'Blue' },
          { value: 'violet', title: 'Violet' },
          { value: 'rose', title: 'Rose' },
          { value: 'amber', title: 'Amber (dark text)' },
        ],
      },
    },
  },
  initialGlobals: { theme: 'default' },
  parameters: {
    layout: 'padded',
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  tags: ['autodocs'],
};

export default preview;
