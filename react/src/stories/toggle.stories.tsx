import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import { LUIToggle } from '@lumen-ui/react';

const meta = {
  title: 'Form Inputs/Toggle',
  component: LUIToggle,
  args: {
    checked: true,
    label: 'Wi-Fi',
    labelPosition: 'right',
    disabled: false,
    viewMode: false,
    onChange: fn(),
  },
  argTypes: {
    checked: { control: 'boolean', description: 'Native `checked` (controlled here).' },
    label: { control: 'text', table: { defaultValue: { summary: "''" } } },
    labelPosition: {
      control: 'inline-radio',
      options: ['left', 'right', 'top'],
      table: { defaultValue: { summary: "'right'" } },
    },
    disabled: {
      control: 'boolean',
      description: 'Native disabled.',
      table: { defaultValue: { summary: 'false' } },
    },
    id: { control: 'text' },
    viewMode: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    viewValue: { control: 'text' },
  },
  // Controlled here: write the new state back into the `checked` arg so the control stays in sync.
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <LUIToggle
        {...args}
        onChange={(event) => {
          updateArgs({ checked: event.target.checked });
          args.onChange?.(event);
        }}
      />
    );
  },
} satisfies Meta<typeof LUIToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Every prop is wired to a control — use this one to play. */
export const Playground: Story = {};

export const LabelPosition: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
      <LUIToggle label="Left label" labelPosition="left" />
      <LUIToggle label="Right label" labelPosition="right" />
      <LUIToggle label="Top label" labelPosition="top" />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24 }}>
      <LUIToggle label="Off" disabled />
      <LUIToggle label="On" defaultChecked disabled />
    </div>
  ),
};

/** Plain "Yes"/"No" text; `viewValue` overrides it. */
export const ViewMode: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 32 }}>
      <LUIToggle label="Wi-Fi" defaultChecked viewMode />
      <LUIToggle label="Bluetooth" viewMode />
      <LUIToggle label="Status" defaultChecked viewMode viewValue="Enabled" />
    </div>
  ),
};
