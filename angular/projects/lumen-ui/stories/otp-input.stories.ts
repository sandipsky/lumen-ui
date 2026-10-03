import { FormsModule } from '@angular/forms';
import { OtpInput } from '@lumen-ui/angular';
import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

type OtpInputStoryArgs = OtpInput & { value: string };

const meta: Meta<OtpInputStoryArgs> = {
  title: 'Form Inputs/OTP Input',
  component: OtpInput,
  decorators: [moduleMetadata({ imports: [FormsModule] })],
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
    change: fn(),
    completed: fn(),
  },
  argTypes: {
    value: {
      control: 'text',
      description:
        'Bound through `[(ngModel)]` (not an input) — the concatenated string of all boxes.',
    },
    length: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Number of character boxes.',
      table: { defaultValue: { summary: '6' } },
    },
    type: {
      control: 'inline-radio',
      options: ['number', 'text'],
      description: '`number` restricts entry to digits; `text` allows any non-space character.',
      table: { defaultValue: { summary: "'number'" } },
    },
    mask: {
      control: 'boolean',
      description: 'Hide the entered characters as dots (PIN mode).',
      table: { defaultValue: { summary: 'false' } },
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      description: 'Box size preset.',
      table: { defaultValue: { summary: "'md'" } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable all boxes; binding a disabled FormControl does the same.',
      table: { defaultValue: { summary: 'false' } },
    },
    error: {
      control: 'boolean',
      description: 'Paint the boxes in the error color — e.g. after a failed verification.',
      table: { defaultValue: { summary: 'false' } },
    },
    autoFocus: {
      control: 'boolean',
      description: 'Focus the first box on render.',
      table: { defaultValue: { summary: 'false' } },
    },
    separator: {
      control: 'boolean',
      description: 'Render a dash between every box, e.g. `123-456`.',
      table: { defaultValue: { summary: 'false' } },
    },
    ariaLabel: {
      control: 'text',
      description: 'Accessible label for the group of boxes.',
      table: { defaultValue: { summary: "'One-time code'" } },
    },
    name: {
      control: 'text',
      description:
        'Base name for the native inputs (each box appends its index); auto-generated when omitted.',
      table: { defaultValue: { summary: 'auto' } },
    },
    change: { action: 'change', description: 'Emits the full concatenated value on every change.' },
    completed: { action: 'completed', description: 'Emits the value once every box is filled.' },
  },
  render: ({ value, ...args }) => ({
    props: { ...args, value },
    template: `<l-otp-input ${argsToTemplate(args)} [(ngModel)]="value" />`,
  }),
};

export default meta;
type Story = StoryObj<OtpInputStoryArgs>;

/** Every input is wired to a control — use this one to play. */
export const Playground: Story = {};

/** Hide the characters as dots — for PINs and secrets. */
export const Masked: Story = {
  args: { length: 4, mask: true, value: '1234' },
};

export const Sizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px">
        <l-otp-input size="sm" [length]="4" ngModel="12" />
        <l-otp-input size="md" [length]="4" ngModel="12" />
        <l-otp-input size="lg" [length]="4" ngModel="12" />
      </div>
    `,
  }),
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
