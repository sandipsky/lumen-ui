import { provideRouter, withHashLocation } from '@angular/router';
import { applicationConfig, type Preview } from '@storybook/angular';

const preview: Preview = {
  decorators: [
    // Breadcrumb links use `routerLink`, which needs a router. The catch-all
    // route keeps the initial navigation (and clicked crumbs) from erroring, and
    // hash location leaves the iframe's own path alone.
    applicationConfig({
      providers: [provideRouter([{ path: '**', children: [] }], withHashLocation())],
    }),
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
