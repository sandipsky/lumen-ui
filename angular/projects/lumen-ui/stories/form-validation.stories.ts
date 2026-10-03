import { signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  Button,
  Checkbox,
  DateInput,
  Radio,
  Select,
  TextInput,
  Textarea,
  Toggle,
  type RadioOption,
} from '@lumen-ui/angular';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

const COUNTRIES = ['Nepal', 'India', 'Japan', 'Bhutan'];

const PLANS: RadioOption[] = [
  { label: 'Free', value: 'free' },
  { label: 'Pro', value: 'pro' },
  { label: 'Enterprise', value: 'enterprise' },
];

const meta: Meta = {
  title: 'Patterns/Form Validation',
  decorators: [
    moduleMetadata({
      imports: [
        ReactiveFormsModule,
        TextInput,
        Select,
        DateInput,
        Radio,
        Textarea,
        Toggle,
        Checkbox,
        Button,
      ],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'The `FormValidation` directive is applied to every LumenUI input via `hostDirectives`, so any bound `FormControl` gets a required `*` on its label, an error state on the field, and an inline message once it is touched or dirty — no extra markup in the consumer.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Fields show their error once touched (blur). Submitting an incomplete form calls
 * `markAllAsTouched()`, which reveals every field's error at once.
 */
export const ValidateOnSubmit: Story = {
  render: () => {
    const form = new FormGroup({
      fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      country: new FormControl<string | null>(null, [Validators.required]),
      startDate: new FormControl<Date | null>(null, [Validators.required]),
      plan: new FormControl('pro'),
      bio: new FormControl('', [Validators.required, Validators.minLength(10)]),
      notifications: new FormControl(true),
      terms: new FormControl(false, [Validators.requiredTrue]),
    });
    const result = signal('—');

    return {
      props: {
        form,
        result,
        countries: COUNTRIES,
        plans: PLANS,
        submit: () => {
          if (form.invalid) {
            form.markAllAsTouched();
            result.set('Form is invalid — fix the highlighted fields.');
            return;
          }
          result.set(JSON.stringify(form.getRawValue(), null, 2));
        },
        reset: () => {
          form.reset();
          result.set('—');
        },
      },
      template: `
        <form
          [formGroup]="form"
          style="display: flex; flex-direction: column; gap: 16px; max-width: 360px"
        >
          <l-text-input label="Full name" placeholder="Jane Doe" formControlName="fullName" />
          <l-select label="Country" [items]="countries" formControlName="country" />
          <l-date-input label="Start date" formControlName="startDate" />
          <l-radio label="Plan" [options]="plans" formControlName="plan" />
          <l-textarea
            label="About you"
            placeholder="At least 10 characters"
            [rows]="3"
            formControlName="bio"
          />
          <l-toggle label="Email me product updates" formControlName="notifications" />
          <l-checkbox label="I accept the terms" formControlName="terms" />

          <div style="display: flex; gap: 8px">
            <l-button variant="primary" (click)="submit()">Create account</l-button>
            <l-button variant="outlined" (click)="reset()">Reset</l-button>
          </div>

          <pre
            style="margin: 0; padding: 8px 10px; border-radius: 8px; background: var(--bg-dark); font-size: 13px; white-space: pre-wrap"
          >{{ result() }}</pre>
        </form>
      `,
    };
  },
};

/**
 * `[useValidation]="false"` keeps a single field quiet even when its control is invalid. Both
 * controls below are required, empty and already touched — only the first shows the error.
 */
export const OptOut: Story = {
  render: () => {
    const name = new FormControl('', [Validators.required]);
    const quiet = new FormControl('', [Validators.required]);
    name.markAsTouched();
    quiet.markAsTouched();

    return {
      props: { name, quiet },
      template: `
        <div style="display: flex; flex-direction: column; gap: 16px; max-width: 360px">
          <l-text-input label="Name" placeholder="Required" [formControl]="name" />
          <l-text-input
            label="Name (no inline validation)"
            placeholder="Required, but stays quiet"
            [formControl]="quiet"
            [useValidation]="false"
          />
        </div>
      `,
    };
  },
};
