import { Button } from '@lumen-ui/angular';
import { argsToTemplate, type Meta, type StoryObj } from '@storybook/angular';

type ButtonStoryArgs = Button & { label: string };

const meta: Meta<ButtonStoryArgs> = {
  title: 'Actions/Button',
  component: Button,
  args: {
    label: 'Button',
    variant: 'primary',
    size: 'md',
    width: 'auto',
    rounded: false,
    disabled: false,
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Projected content (`<ng-content>`), not an input.',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outlined', 'outlined-primary', 'danger', 'ghost'],
      description: 'Visual style of the button.',
      table: { defaultValue: { summary: "'primary'" } },
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      description: 'Padding scale — sm 4×8, md 6×12, lg 8×16 (px).',
      table: { defaultValue: { summary: "'md'" } },
    },
    width: {
      control: 'inline-radio',
      options: ['auto', 'full'],
      description: '`auto` fits the content, `full` fills the parent width.',
      table: { defaultValue: { summary: "'auto'" } },
    },
    rounded: {
      control: 'boolean',
      description: 'Render as a circular icon button.',
      table: { defaultValue: { summary: 'false' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the underlying native button.',
      table: { defaultValue: { summary: 'false' } },
    },
  },
  render: ({ label, ...args }) => ({
    props: { ...args, label },
    template: `<l-button ${argsToTemplate(args)}>{{ label }}</l-button>`,
  }),
};

export default meta;
type Story = StoryObj<ButtonStoryArgs>;

/** Every input is wired to a control — use this one to play. */
export const Playground: Story = {};

export const Variants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap">
        <l-button variant="primary">Primary</l-button>
        <l-button variant="secondary">Secondary</l-button>
        <l-button variant="outlined">Outlined</l-button>
        <l-button variant="outlined-primary">Outlined primary</l-button>
        <l-button variant="danger">Danger</l-button>
        <l-button variant="ghost">Ghost</l-button>
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; align-items: center">
        <l-button size="sm">Small</l-button>
        <l-button size="md">Medium</l-button>
        <l-button size="lg">Large</l-button>
      </div>
    `,
  }),
};

export const FullWidth: Story = {
  args: { width: 'full' },
};

export const Disabled: Story = {
  args: { disabled: true },
};
