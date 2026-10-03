import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import { LUINumberInput } from '@lumen-ui/react';

const meta = {
  title: 'Form Inputs/Number Input',
  component: LUINumberInput,
  args: {
    label: 'Amount',
    placeholder: '0',
    value: '1500.00',
    decimalPlaces: 2,
    prefix: 'Rs.',
    suffix: '',
    allowNegative: false,
    allowZero: true,
    disabled: false,
    required: false,
    viewMode: false,
    onValueChange: fn(),
    onChange: fn(),
  },
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text', description: 'Native placeholder.' },
    value: {
      control: 'text',
      description:
        'Native value — a string, like any input; read the parsed number from `onValueChange`.',
    },
    decimalPlaces: {
      control: { type: 'number', min: 0, max: 6, step: 1 },
      table: { defaultValue: { summary: 'unset' } },
    },
    prefix: { control: 'text', table: { defaultValue: { summary: "''" } } },
    suffix: { control: 'text', table: { defaultValue: { summary: "''" } } },
    allowNegative: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    allowZero: { control: 'boolean', table: { defaultValue: { summary: 'true' } } },
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
  // Controlled: sync the `value` control on input and on blur (where decimal formatting lands).
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <LUINumberInput
        {...args}
        onChange={(event) => {
          updateArgs({ value: event.target.value });
          args.onChange?.(event);
        }}
        onBlur={(event) => updateArgs({ value: event.target.value })}
      />
    );
  },
} satisfies Meta<typeof LUINumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Every prop is wired up — use this one to play. Only numeric keys get through. */
export const Playground: Story = {};

/** `0` forbids decimals, a positive number rounds to that many places on blur, unset allows any. */
export const DecimalPlaces: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <LUINumberInput label="Integer (0)" decimalPlaces={0} defaultValue="1234567" />
      <LUINumberInput label="Two places (2)" decimalPlaces={2} defaultValue="1234567.89" />
      <LUINumberInput label="Any (unset)" defaultValue="1234567.891" />
    </div>
  ),
};

/** Display-only adornments that stay visible (and uneditable) while you type. */
export const PrefixSuffix: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <LUINumberInput label="Amount" prefix="Rs." decimalPlaces={2} defaultValue="1234567.00" />
      <LUINumberInput label="Discount" suffix="%" decimalPlaces={2} defaultValue="12.50" />
    </div>
  ),
};

/** Pass the validation message via `error` (e.g. from react-hook-form). */
export const WithError: Story = {
  args: { label: 'Price', value: '', required: true, error: 'This field is required.' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const ViewMode: Story = {
  args: { label: 'Price', prefix: 'Rs. ', decimalPlaces: undefined, value: '1500', viewMode: true },
};
