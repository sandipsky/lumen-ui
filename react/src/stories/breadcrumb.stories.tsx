import type { Meta, StoryObj } from '@storybook/react-vite';
import { LUIBreadcrumb } from '@lumen-ui/react';

// Hash links keep clicks inside the Storybook iframe (the default `linkComponent` is a plain
// `<a href>`); the Angular stories' `routerLink`s resolve to the same `#/…` URLs.
const meta = {
  title: 'Navigation/Breadcrumb',
  component: LUIBreadcrumb,
  args: {
    title: '',
    items: [
      { label: 'Home', link: '#/' },
      { label: 'Components', link: '#/components' },
      { label: 'Breadcrumb' },
    ],
  },
  argTypes: {
    title: { control: 'text', table: { defaultValue: { summary: "''" } } },
    items: { control: 'object', table: { defaultValue: { summary: '[]' } } },
    linkComponent: { control: false, table: { defaultValue: { summary: '<a href>' } } },
  },
} satisfies Meta<typeof LUIBreadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Every prop is wired to a control — use this one to play. */
export const Playground: Story = {};

/** Set `title` to render a page heading above the trail. */
export const WithPageTitle: Story = {
  args: { title: 'Breadcrumb' },
};

/** Any depth works; a crumb without a `link` renders as plain text. */
export const ShortTrail: Story = {
  args: {
    items: [{ label: 'Docs', link: '#/' }, { label: 'Getting started' }],
  },
};
