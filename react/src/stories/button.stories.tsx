import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { LUIButton } from '@lumen-ui/react';

const meta = {
  title: 'Actions/Button',
  component: LUIButton,
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    width: 'auto',
    rounded: false,
    disabled: false,
    onClick: fn(),
  },
  argTypes: {
    children: { control: 'text', description: 'Button content.' },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outlined', 'outlined-primary', 'danger', 'ghost'],
      description: 'Visual style of the button.',
      table: { defaultValue: { summary: "'primary'" } },
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      table: { defaultValue: { summary: "'md'" } },
    },
    width: {
      control: 'inline-radio',
      options: ['auto', 'full'],
      table: { defaultValue: { summary: "'auto'" } },
    },
    rounded: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    disabled: {
      control: 'boolean',
      description: 'Disable the native button.',
      table: { defaultValue: { summary: 'false' } },
    },
  },
} satisfies Meta<typeof LUIButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Every prop is wired to a control — use this one to play. */
export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <LUIButton variant="primary">Primary</LUIButton>
      <LUIButton variant="secondary">Secondary</LUIButton>
      <LUIButton variant="outlined">Outlined</LUIButton>
      <LUIButton variant="outlined-primary">Outlined primary</LUIButton>
      <LUIButton variant="danger">Danger</LUIButton>
      <LUIButton variant="ghost">Ghost</LUIButton>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <LUIButton size="sm">Small</LUIButton>
      <LUIButton size="md">Medium</LUIButton>
      <LUIButton size="lg">Large</LUIButton>
    </div>
  ),
};

export const FullWidth: Story = {
  args: { width: 'full' },
};

export const Disabled: Story = {
  args: { disabled: true },
};
