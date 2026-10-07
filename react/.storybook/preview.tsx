import type { Preview } from '@storybook/react-vite';
import { LUIProvider, type LUITheme } from '../src/components';
// Same global styles as the showcase: library tokens + utilities, plus the base reset.
import '../src/index.css';

/** Sample themes for the toolbar's Theme menu (same set as the Angular Storybook). */
const THEMES: Record<string, LUITheme> = {
  default: {},
  blue: { accent: '#2563eb' },
  violet: { accent: '#7c3aed' },
  rose: { accent: '#e11d48' },
  // A light accent needs dark text on top of it.
  amber: { accent: '#f59e0b', accentContrast: '#07090f' },
};

const preview: Preview = {
  // The notification, spinner, modal and drawer hooks need the provider above
  // them; it also applies the toolbar's theme.
  decorators: [
    (Story, { globals }) => (
      <LUIProvider theme={THEMES[globals.theme]}>
        <Story />
      </LUIProvider>
    ),
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
