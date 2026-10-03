import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import { LUITextInput } from '@lumen-ui/react';

const meta = {
  title: 'Form Inputs/Text Input',
  component: LUITextInput,
  args: {
    label: 'Full name',
    placeholder: 'Jane Doe',
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
      <LUITextInput
        {...args}
        onChange={(event) => {
          updateArgs({ value: event.target.value });
          args.onChange?.(event);
        }}
      />
    );
  },
} satisfies Meta<typeof LUITextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Every prop is wired up — use this one to play. All native input props pass through. */
export const Playground: Story = {};

/** A plain controlled component — the bound value is a string. */
export const FormBinding: Story = {
  render: function Render() {
    const [value, setValue] = useState('Jane Doe');
    return (
      <>
        <LUITextInput
          label="Full name"
          placeholder="Jane Doe"
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

/** Pass the validation message via `error` (e.g. from react-hook-form / zod). */
export const WithError: Story = {
  args: { required: true, error: 'This field is required.' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const ViewMode: Story = {
  args: { value: 'Jane Doe', viewMode: true },
};
