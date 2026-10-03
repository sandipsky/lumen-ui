import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import { LUIRadio, type RadioOption } from '@lumen-ui/react';

const PLANS: RadioOption[] = [
  { label: 'Free', value: 'free' },
  { label: 'Pro', value: 'pro' },
  { label: 'Enterprise', value: 'enterprise' },
];

const meta = {
  title: 'Form Inputs/Radio',
  component: LUIRadio,
  args: {
    value: 'pro',
    label: 'Plan',
    options: PLANS,
    disabled: false,
    labelPosition: 'right',
    orientation: 'inline',
    viewMode: false,
    onChange: fn(),
  },
  argTypes: {
    value: { control: 'inline-radio', options: ['free', 'pro', 'enterprise'] },
    // The Playground is controlled through `value`, so `defaultValue` would be ignored.
    defaultValue: { control: false },
    label: { control: 'text', table: { defaultValue: { summary: "''" } } },
    options: { control: 'object', table: { defaultValue: { summary: '[]' } } },
    name: {
      control: 'text',
      description: 'Native name shared across the group; auto-generated when omitted.',
      table: { defaultValue: { summary: 'auto' } },
    },
    disabled: {
      control: 'boolean',
      description:
        "Disable the whole group; a single entry can be disabled via its option's `disabled` flag.",
      table: { defaultValue: { summary: 'false' } },
    },
    labelPosition: {
      control: 'inline-radio',
      options: ['left', 'right', 'top'],
      table: { defaultValue: { summary: "'right'" } },
    },
    orientation: {
      control: 'inline-radio',
      options: ['inline', 'stacked'],
      table: { defaultValue: { summary: "'inline'" } },
    },
    viewMode: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    viewValue: { control: 'text' },
  },
  // Controlled here: write the picked option back into the `value` arg so the control stays in sync.
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <LUIRadio
        {...args}
        onChange={(event) => {
          updateArgs({ value: event.target.value });
          args.onChange?.(event);
        }}
      />
    );
  },
} satisfies Meta<typeof LUIRadio>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Every prop is wired to a control — use this one to play. */
export const Playground: Story = {};

export const Stacked: Story = {
  args: { orientation: 'stacked' },
};

export const LabelPosition: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <LUIRadio label="Left" options={PLANS} labelPosition="left" defaultValue="pro" />
      <LUIRadio label="Top" options={PLANS} labelPosition="top" defaultValue="pro" />
    </div>
  ),
};

/** Disable the whole group with `disabled`, or a single entry via its option's `disabled` flag. */
export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <LUIRadio label="Whole group" options={PLANS} defaultValue="pro" disabled />
      <LUIRadio
        label="Single option"
        options={[PLANS[0], PLANS[1], { ...PLANS[2], disabled: true }]}
        defaultValue="pro"
      />
    </div>
  ),
};

export const ViewMode: Story = {
  args: { viewMode: true },
};
