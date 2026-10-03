import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordInput } from '@lumen-ui/angular';
import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

type PasswordInputStoryArgs = PasswordInput & { value: string; useValidation: boolean };

const meta: Meta<PasswordInputStoryArgs> = {
  title: 'Form Inputs/Password Input',
  component: PasswordInput,
  decorators: [moduleMetadata({ imports: [FormsModule, ReactiveFormsModule] })],
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    value: '',
    disabled: false,
    showRules: false,
    viewMode: false,
    useValidation: true,
    input: fn(),
    change: fn(),
    keyup: fn(),
    keydown: fn(),
    keypress: fn(),
    enter: fn(),
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
      control: 'text',
      description:
        'Story-only: the form value, passed via `[ngModel]`. Bind the real value with `[(ngModel)]` or a reactive form.',
    },
    disabled: {
      control: 'boolean',
      description:
        'Disable the field and the visibility toggle; a disabled FormControl does the same.',
      table: { defaultValue: { summary: 'false' } },
    },
    showRules: {
      control: 'boolean',
      description: 'Show the live-validating password-requirements checklist below the field.',
      table: { defaultValue: { summary: 'false' } },
    },
    viewMode: {
      control: 'boolean',
      description: 'Render the value as plain text instead of the input.',
      table: { defaultValue: { summary: 'false' } },
    },
    viewValue: {
      control: 'text',
      description: 'Custom text shown in view mode; falls back to the value when omitted.',
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
    input: {
      action: 'input',
      description: 'Emits the native input event on every keystroke.',
      table: { category: 'outputs', type: { summary: 'Event' } },
    },
    change: {
      action: 'change',
      description: 'Re-emits the native change event when the value is committed (on blur).',
      table: { category: 'outputs', type: { summary: 'Event' } },
    },
    keyup: {
      action: 'keyup',
      description: 'Re-emits the native keyup event.',
      table: { category: 'outputs', type: { summary: 'KeyboardEvent' } },
    },
    keydown: {
      action: 'keydown',
      description: 'Re-emits the native keydown event.',
      table: { category: 'outputs', type: { summary: 'KeyboardEvent' } },
    },
    keypress: {
      action: 'keypress',
      description: 'Re-emits the native keypress event.',
      table: { category: 'outputs', type: { summary: 'KeyboardEvent' } },
    },
    enter: {
      action: 'enter',
      description: 'Emits when Enter is pressed in the field.',
      table: { category: 'outputs', type: { summary: 'KeyboardEvent' } },
    },
  },
  render: ({ value, ...args }) => ({
    props: { ...args, value },
    template: `<l-password-input ${argsToTemplate(args)} [ngModel]="value" />`,
  }),
};

export default meta;
type Story = StoryObj<PasswordInputStoryArgs>;

/** Every input and output is wired up — use this one to play. */
export const Playground: Story = {};

/** The checklist re-validates as you type — this value still misses a special character. */
export const WithRules: Story = {
  args: { value: 'Lumen2026', showRules: true },
};

/** Validators on the bound control drive the inline message — here `Validators.minLength(8)`. */
export const WithError: Story = {
  render: () => {
    const control = new FormControl('abc', Validators.minLength(8));
    control.markAsTouched();
    return {
      props: { control },
      template: `<l-password-input label="Password" placeholder="Enter your password" [formControl]="control" />`,
    };
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const ViewMode: Story = {
  args: { value: 'hunter2!', viewMode: true },
};
