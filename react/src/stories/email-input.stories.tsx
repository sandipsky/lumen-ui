import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import { LUIEmailInput } from '@lumen-ui/react';

const meta = {
  title: 'Form Inputs/Email Input',
  component: LUIEmailInput,
  args: {
    label: 'Email',
    placeholder: 'you@example.com',
    value: '',
    disabled: false,
    required: false,
    viewMode: false,
    onChange: fn(),
    onInput: fn(),
    onKeyDown: fn(),
    onKeyUp: fn(),
    onEnter: fn(),
  },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text', description: 'Native placeholder.' },
    value: { control: 'text', description: 'Native value — kept in sync as you type here.' },
    error: { control: 'text' },
    disabled: {
      control: 'boolean',
      description: 'Native disabled.',
      table: { defaultValue: { summary: 'false' } },
    },
    required: {
      control: 'boolean',
      description: 'Native required; also adds a `*` to the label.',
      table: { defaultValue: { summary: 'false' } },
    },
    viewMode: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    viewValue: { control: 'text' },
    id: {
      control: 'text',
      description: 'Id for the native input; auto-generated when omitted.',
      table: { defaultValue: { summary: 'auto' } },
    },
  },
  // Controlled: keep the `value` control in sync with typing.
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <LUIEmailInput
        {...args}
        onChange={(event) => {
          updateArgs({ value: event.target.value });
          args.onChange?.(event);
        }}
      />
    );
  },
} satisfies Meta<typeof LUIEmailInput>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Every prop is wired up — use this one to play. All native input props pass through. */
export const Playground: Story = {};

/** A plain controlled component — the bound value is a string. */
export const FormBinding: Story = {
  render: function Render() {
    const [value, setValue] = useState('jane@example.com');
    return (
      <>
        <LUIEmailInput
          label="Email"
          placeholder="you@example.com"
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
        <p style={{ margin: '8px 0 0', fontSize: 13, color: 'var(--text-secondary)' }}>
          Value: {value || '—'}
        </p>
      </>
    );
  },
};

/**
 * No built-in format validator (unlike the Angular version) — validate in the consumer and pass
 * the message via `error`.
 */
export const WithError: Story = {
  args: { value: 'jane@example', error: 'Please enter a valid email address.' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const ViewMode: Story = {
  args: { value: 'jane@example.com', viewMode: true },
};
