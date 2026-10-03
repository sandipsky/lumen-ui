import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { LUITextarea } from '@lumen-ui/react';

const meta = {
  title: 'Form Inputs/Textarea',
  component: LUITextarea,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 360 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    defaultValue: '',
    label: 'Message',
    placeholder: 'Write something…',
    disabled: false,
    required: false,
    rows: 4,
    resizable: false,
    viewMode: false,
    onChange: fn(),
    onBlur: fn(),
    onEnter: fn(),
  },
  argTypes: {
    defaultValue: {
      control: 'text',
      description: 'Native `defaultValue` — seeds the field; editing it here remounts the textarea.',
    },
    value: { control: false },
    label: { control: 'text' },
    placeholder: { control: 'text', description: 'Native placeholder.' },
    disabled: {
      control: 'boolean',
      description: 'Native disabled.',
      table: { defaultValue: { summary: 'false' } },
    },
    required: {
      control: 'boolean',
      description: 'Native required — also adds the `*` to the label.',
      table: { defaultValue: { summary: 'false' } },
    },
    id: { control: 'text', table: { defaultValue: { summary: 'auto' } } },
    rows: {
      control: 'number',
      description: 'Visible rows before the field scrolls.',
      table: { defaultValue: { summary: '4' } },
    },
    resizable: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    error: { control: 'text' },
    viewMode: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    viewValue: { control: 'text' },
  },
  // Uncontrolled on purpose: a controlled value round-tripping through args lags a render behind
  // and makes the caret jump, so the arg only seeds the field (re-seeded when edited in Controls).
  render: (args) => <LUITextarea key={String(args.defaultValue)} {...args} />,
} satisfies Meta<typeof LUITextarea>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Every prop is wired to a control — use this one to play. */
export const Playground: Story = {};

export const Rows: Story = {
  args: { label: 'Notes', placeholder: 'Taller field', rows: 8 },
};

/** The drag-to-resize handle is hidden by default. */
export const Resizable: Story = {
  args: { label: 'Feedback', placeholder: 'Drag the bottom-right corner', resizable: true },
};

/** Pass the validation message through `error` (e.g. from react-hook-form). */
export const WithError: Story = {
  args: {
    label: 'Bio',
    placeholder: 'At least 10 characters',
    defaultValue: 'Too short',
    required: true,
    error: 'Must be at least 10 characters.',
  },
};

export const Disabled: Story = {
  args: { label: 'Disabled', placeholder: "Can't type here", disabled: true },
};

/** Renders the value as plain text with line breaks preserved. */
export const ViewMode: Story = {
  args: { label: 'Bio', defaultValue: 'First line.\nSecond line.', viewMode: true },
};
