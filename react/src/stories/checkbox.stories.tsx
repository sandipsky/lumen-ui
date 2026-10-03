import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import { LUICheckbox } from '@lumen-ui/react';

const meta = {
  title: 'Form Inputs/Checkbox',
  component: LUICheckbox,
  args: {
    checked: false,
    label: 'Remember me',
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
      <LUICheckbox
        {...args}
        onChange={(event) => {
          updateArgs({ checked: event.target.checked });
          args.onChange?.(event);
        }}
      />
    );
  },
} satisfies Meta<typeof LUICheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Every prop is wired to a control — use this one to play. */
export const Playground: Story = {};

export const LabelPosition: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
      <LUICheckbox label="Left label" labelPosition="left" />
      <LUICheckbox label="Right label" labelPosition="right" />
      <LUICheckbox label="Top label" labelPosition="top" />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24 }}>
      <LUICheckbox label="Unchecked" disabled />
      <LUICheckbox label="Checked" defaultChecked disabled />
    </div>
  ),
};

/** Plain "Yes"/"No" text; `viewValue` overrides it. */
export const ViewMode: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 32 }}>
      <LUICheckbox label="Remember me" defaultChecked viewMode />
      <LUICheckbox label="Subscribe" viewMode />
      <LUICheckbox label="Terms" defaultChecked viewMode viewValue="Agreed" />
    </div>
  ),
};
