import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import { LUIPasswordInput } from '@lumen-ui/react';

const meta = {
  title: 'Form Inputs/Password Input',
  component: LUIPasswordInput,
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    value: '',
    disabled: false,
    required: false,
    showRules: false,
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
      description: 'Native disabled; also disables the visibility toggle.',
      table: { defaultValue: { summary: 'false' } },
    },
    required: {
      control: 'boolean',
      description: 'Native required; also adds a `*` to the label.',
      table: { defaultValue: { summary: 'false' } },
    },
    showRules: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
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
      <LUIPasswordInput
        {...args}
        onChange={(event) => {
          updateArgs({ value: event.target.value });
          args.onChange?.(event);
        }}
      />
    );
  },
} satisfies Meta<typeof LUIPasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Every prop is wired up — use this one to play. All native input props pass through. */
export const Playground: Story = {};

/** The checklist re-validates as you type — this value still misses a special character. */
export const WithRules: Story = {
  args: { value: 'Lumen2026', showRules: true },
};

/** Pass the validation message via `error` (e.g. from react-hook-form / zod). */
export const WithError: Story = {
  args: { value: 'abc', error: 'Must be at least 8 characters.' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const ViewMode: Story = {
  args: { value: 'hunter2!', viewMode: true },
};
