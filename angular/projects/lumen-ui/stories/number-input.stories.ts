import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NumberInput } from '@lumen-ui/angular';
import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

type NumberInputStoryArgs = NumberInput & { value: number | null; useValidation: boolean };

const meta: Meta<NumberInputStoryArgs> = {
  title: 'Form Inputs/Number Input',
  component: NumberInput,
  decorators: [moduleMetadata({ imports: [FormsModule, ReactiveFormsModule] })],
  args: {
    label: 'Amount',
    placeholder: '0',
    value: 1500,
    decimalPlaces: 2,
    prefix: 'Rs.',
    suffix: '',
    allowNegative: false,
    allowZero: true,
    disabled: false,
    viewMode: false,
    useValidation: true,
    valueChange: fn(),
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label rendered above the field, linked to the input.',
      table: { defaultValue: { summary: "''" } },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder shown while the field is empty.',
      table: { defaultValue: { summary: "''" } },
    },
    value: {
      control: 'number',
      description:
        'Story-only: the form value, passed via `[ngModel]`. Bind the real value with `[(ngModel)]` or a reactive form — it is always a `number` (or `null`).',
    },
    decimalPlaces: {
      control: { type: 'number', min: 0, max: 6, step: 1 },
      description:
        '`0` forbids decimals (the dot key is blocked); a positive number rounds the value to that many places on blur; left unset, any number of decimals is allowed.',
      table: { defaultValue: { summary: 'unset' } },
    },
    prefix: {
      control: 'text',
      description: 'Display-only adornment before the value — never part of the stored number.',
      table: { defaultValue: { summary: "''" } },
    },
    suffix: {
      control: 'text',
      description: 'Display-only adornment after the value — never part of the stored number.',
      table: { defaultValue: { summary: "''" } },
    },
    allowNegative: {
      control: 'boolean',
      description: 'Allow typing negative numbers; off by default (the minus key is blocked).',
      table: { defaultValue: { summary: 'false' } },
    },
    allowZero: {
      control: 'boolean',
      description:
        'Allow a value of `0`. When off, typing a bare `0` is blocked and a `0` value clears to `null` on blur.',
      table: { defaultValue: { summary: 'true' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the field; binding a disabled FormControl does the same.',
      table: { defaultValue: { summary: 'false' } },
    },
    viewMode: {
      control: 'boolean',
      description: 'Render the value (with prefix/suffix) as plain text instead of the input.',
      table: { defaultValue: { summary: 'false' } },
    },
    viewValue: {
      control: 'text',
      description: 'Custom text shown in view mode; falls back to the affixed value when omitted.',
    },
    id: {
      control: 'text',
      description: 'Id for the native input; auto-generated when omitted.',
      table: { defaultValue: { summary: 'auto' } },
    },
    useValidation: {
      control: 'boolean',
      description:
        'Opt the field out of the shared inline validation UI (`FormValidation` host directive). Read once on init.',
      table: { defaultValue: { summary: 'true' } },
    },
    // Outputs need `action` (or `control`): @storybook/angular strips other args before render.
    valueChange: {
      action: 'valueChange',
      description:
        'Emits the parsed numeric value on every change — `null` while the field is empty or incomplete.',
      table: { category: 'outputs', type: { summary: 'number | null' } },
    },
  },
  render: ({ value, ...args }) => ({
    props: { ...args, value },
    template: `<l-number-input ${argsToTemplate(args)} [ngModel]="value" />`,
  }),
};

export default meta;
type Story = StoryObj<NumberInputStoryArgs>;

/** Every input and output is wired up — use this one to play. Only numeric keys get through. */
export const Playground: Story = {};

/** `0` forbids decimals, a positive number rounds to that many places, unset allows any. */
export const DecimalPlaces: Story = {
  render: () => ({
    props: { value: 1234567.891 },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px">
        <l-number-input label="Integer (0)" [decimalPlaces]="0" [(ngModel)]="value" />
        <l-number-input label="Two places (2)" [decimalPlaces]="2" [(ngModel)]="value" />
        <l-number-input label="Any (unset)" [(ngModel)]="value" />
      </div>
    `,
  }),
};

/** Display-only adornments that stay visible (and uneditable) while you type. */
export const PrefixSuffix: Story = {
  render: () => ({
    props: { amount: 1234567, discount: 12.5 },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px">
        <l-number-input label="Amount" prefix="Rs." [decimalPlaces]="2" [(ngModel)]="amount" />
        <l-number-input label="Discount" suffix="%" [decimalPlaces]="2" [(ngModel)]="discount" />
      </div>
    `,
  }),
};

/** Validators on the bound control drive the inline message — here a touched, empty required field. */
export const WithError: Story = {
  render: () => {
    const control = new FormControl<number | null>(null, Validators.required);
    control.markAsTouched();
    return {
      props: { control },
      template: `<l-number-input label="Price" prefix="Rs." [decimalPlaces]="2" [formControl]="control" />`,
    };
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const ViewMode: Story = {
  args: { label: 'Price', prefix: 'Rs. ', decimalPlaces: undefined, value: 1500, viewMode: true },
};
