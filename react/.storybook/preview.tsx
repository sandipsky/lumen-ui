import type { Preview } from '@storybook/react-vite';
import { LUIProvider } from '../src/components';
// Same global styles as the showcase: library tokens + utilities, plus the base reset.
import '../src/index.css';

const preview: Preview = {
  // The notification, spinner, modal and drawer hooks need the provider above them.
  decorators: [
    (Story) => (
      <LUIProvider>
        <Story />
      </LUIProvider>
    ),
  ],
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
