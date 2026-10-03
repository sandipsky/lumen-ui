import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import { LUIOtpInput } from '@lumen-ui/react';

const meta = {
  title: 'Form Inputs/OTP Input',
  component: LUIOtpInput,
  args: {
    value: '',
    length: 6,
    type: 'number',
    mask: false,
    size: 'md',
    disabled: false,
    error: false,
    autoFocus: false,
    separator: false,
    ariaLabel: 'One-time code',
    onChange: fn(),
    onCompleted: fn(),
    onBlur: fn(),
  },
  argTypes: {
    value: { control: 'text' },
    length: {
      control: { type: 'number', min: 1, max: 10 },
      table: { defaultValue: { summary: '6' } },
    },
    type: {
      control: 'inline-radio',
      options: ['number', 'text'],
      description: '`number` restricts entry to digits; `text` allows any non-space character.',
      table: { defaultValue: { summary: "'number'" } },
    },
    mask: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      description: 'Box size preset.',
      table: { defaultValue: { summary: "'md'" } },
    },
    disabled: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    error: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    autoFocus: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    separator: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for the group of boxes.',
      table: { defaultValue: { summary: "'One-time code'" } },
    },
    name: { control: 'text', table: { defaultValue: { summary: 'auto' } } },
  },
  // Controlled component: write keystrokes back into the `value` arg so the control stays in sync.
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <LUIOtpInput
        {...args}
        onChange={(value) => {
          updateArgs({ value });
          args.onChange?.(value);
        }}
      />
    );
  },
} satisfies Meta<typeof LUIOtpInput>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Every prop is wired to a control — use this one to play. */
export const Playground: Story = {};

/** Hide the characters as dots — for PINs and secrets. */
export const Masked: Story = {
  args: { length: 4, mask: true, value: '1234' },
};

export const Sizes: Story = {
  render: function Render() {
    const [code, setCode] = useState('12');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <LUIOtpInput size="sm" length={4} value={code} onChange={setCode} />
        <LUIOtpInput size="md" length={4} value={code} onChange={setCode} />
        <LUIOtpInput size="lg" length={4} value={code} onChange={setCode} />
      </div>
    );
  },
};

export const WithSeparator: Story = {
  args: { separator: true, value: '123456' },
};

/** Error colouring — e.g. after a failed verification. */
export const WithError: Story = {
  args: { error: true, value: '123456' },
};

export const Disabled: Story = {
  args: { disabled: true, value: '123' },
};
