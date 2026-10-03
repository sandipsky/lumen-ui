import { Breadcrumb } from '@lumen-ui/angular';
import { argsToTemplate, type Meta, type StoryObj } from '@storybook/angular';

const meta: Meta<Breadcrumb> = {
  title: 'Navigation/Breadcrumb',
  component: Breadcrumb,
  args: {
    title: '',
    items: [
      { label: 'Home', link: '/' },
      { label: 'Components', link: '/components' },
      { label: 'Breadcrumb' },
    ],
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Optional page title rendered above the trail.',
      table: { defaultValue: { summary: "''" } },
    },
    items: {
      control: 'object',
      description:
        'The crumb trail, in order (`{ label: string; link?: string | unknown[] }`). The last ' +
        'item is the current page; earlier ones link via `routerLink` when they carry a `link`.',
      table: { defaultValue: { summary: '[]' } },
    },
  },
  render: (args) => ({
    props: args,
    template: `<l-breadcrumb ${argsToTemplate(args)} />`,
  }),
};

export default meta;
type Story = StoryObj<Breadcrumb>;

/** Every input is wired to a control — use this one to play. */
export const Playground: Story = {};

/** Set `title` to render a page heading above the trail. */
export const WithPageTitle: Story = {
  args: { title: 'Breadcrumb' },
};

/** Any depth works; a crumb without a `link` renders as plain text. */
export const ShortTrail: Story = {
  args: {
    items: [{ label: 'Docs', link: '/' }, { label: 'Getting started' }],
  },
};
