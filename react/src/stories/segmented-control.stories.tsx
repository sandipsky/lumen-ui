import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import { LUISegmentedControl, type SegmentedOption } from '@lumen-ui/react';

const ranges = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'];
const plans = ['Free', 'Pro', 'Team'];
const viewOptions: SegmentedOption[] = [
  { label: 'List', value: 'list' },
  { label: 'Board', value: 'board' },
  { label: 'Calendar', value: 'calendar' },
  { label: 'Timeline', value: 'timeline', disabled: true },
];

const meta = {
  title: 'Actions/Segmented Control',
  component: LUISegmentedControl,
  args: {
    options: ranges,
    value: 'Daily',
    orientation: 'horizontal',
    size: 'md',
    disabled: false,
    fullWidth: false,
    onChange: fn(),
  },
  argTypes: {
    options: {
      control: 'object',
      table: {
        type: { summary: '(string | SegmentedOption)[]' },
        defaultValue: { summary: '[]' },
      },
    },
    value: { control: 'text', table: { type: { summary: 'unknown' } } },
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
      table: { defaultValue: { summary: "'horizontal'" } },
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      table: { defaultValue: { summary: "'md'" } },
    },
    disabled: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    fullWidth: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    className: { control: 'text' },
    ref: { control: false },
  },
  // Controlled: keep the `value` control in sync with clicks.
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <LUISegmentedControl
        {...args}
        onChange={(value) => {
          updateArgs({ value });
          args.onChange?.(value);
        }}
      />
    );
  },
} satisfies Meta<typeof LUISegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Every prop is wired to a control — use this one to play. */
export const Playground: Story = {};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
};

export const Sizes: Story = {
  render: function Render() {
    const [size, setSize] = useState<unknown>('md');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12 }}>
        <LUISegmentedControl options={['sm', 'md', 'lg']} size="sm" value={size} onChange={setSize} />
        <LUISegmentedControl options={['sm', 'md', 'lg']} size="md" value={size} onChange={setSize} />
        <LUISegmentedControl options={['sm', 'md', 'lg']} size="lg" value={size} onChange={setSize} />
      </div>
    );
  },
};

/** `{ label, value, disabled }` objects; disabled segments are skipped by click and keyboard. */
export const ObjectOptions: Story = {
  args: { options: viewOptions, value: 'list' },
};

export const FullWidth: Story = {
  args: { options: plans, value: 'Pro', fullWidth: true },
};

export const Disabled: Story = {
  args: { options: plans, value: 'Pro', disabled: true },
};
