import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  LUIButton,
  LUICheckbox,
  LUIDateInput,
  LUIRadio,
  LUISelect,
  LUITextInput,
  LUITextarea,
  LUIToggle,
  type RadioOption,
} from '@lumen-ui/react';

const COUNTRIES = ['Nepal', 'India', 'Japan', 'Bhutan'];

const PLANS: RadioOption[] = [
  { label: 'Free', value: 'free' },
  { label: 'Pro', value: 'pro' },
  { label: 'Enterprise', value: 'enterprise' },
];

const REQUIRED = 'This field is required.';

const signupSchema = z.object({
  fullName: z.string().min(1, REQUIRED).min(3, 'Must be at least 3 characters.'),
  country: z
    .string()
    .nullable()
    .refine((value) => value !== null, REQUIRED),
  startDate: z
    .date()
    .nullable()
    .refine((value) => value !== null, REQUIRED),
  plan: z.string(),
  bio: z.string().min(1, REQUIRED).min(10, 'Must be at least 10 characters.'),
  notifications: z.boolean(),
  terms: z.boolean().refine((value) => value, REQUIRED),
});

const optOutSchema = z.object({
  name: z.string().min(1, REQUIRED),
  quiet: z.string().min(1, REQUIRED),
});

const column = { display: 'flex', flexDirection: 'column', maxWidth: 360 } as const;

const meta = {
  title: 'Patterns/Form Validation',
  parameters: {
    docs: {
      description: {
        component:
          "Validation is wired through `react-hook-form` + `zod`: spread `register('field')` onto a native-value input (or wrap a controlled one in a `<Controller>`) and pass `error={errors.field?.message}` — the field gets the error style and an inline message once it is touched (`mode: 'onTouched'`) or the form is submitted. The required `*` comes from the native `required` prop.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Fields show their error once touched (blur). Submitting an incomplete form runs the whole
 * schema and reveals every field's error at once.
 */
export const ValidateOnSubmit: Story = {
  render: function Render() {
    const {
      register,
      control,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm({
      resolver: zodResolver(signupSchema),
      mode: 'onTouched',
      defaultValues: {
        fullName: '',
        country: null,
        startDate: null,
        plan: 'pro',
        bio: '',
        notifications: true,
        terms: false,
      },
    });
    const [result, setResult] = useState('—');

    const submit = handleSubmit(
      (values) => setResult(JSON.stringify(values, null, 2)),
      () => setResult('Form is invalid — fix the highlighted fields.'),
    );

    return (
      <form onSubmit={submit} noValidate style={{ ...column, gap: 16 }}>
        <LUITextInput
          label="Full name"
          placeholder="Jane Doe"
          required
          {...register('fullName')}
          error={errors.fullName?.message}
        />

        {/* LUISelect has no `error` prop, so its message is rendered beside it. */}
        <div style={{ ...column, gap: 6 }}>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <LUISelect
                label="Country"
                items={COUNTRIES}
                value={field.value}
                onChange={(value) => field.onChange(value as string | null)}
                onBlur={field.onBlur}
              />
            )}
          />
          {errors.country && <div className="alert error">{errors.country.message}</div>}
        </div>

        {/* No `onBlur` prop either — mark the field touched as soon as a date is picked. */}
        <Controller
          name="startDate"
          control={control}
          render={({ field, fieldState }) => (
            <LUIDateInput
              label="Start date"
              value={field.value}
              onChange={(date) => {
                field.onChange(date);
                field.onBlur();
              }}
              error={fieldState.error?.message}
            />
          )}
        />

        <LUIRadio label="Plan" options={PLANS} {...register('plan')} />

        <LUITextarea
          label="About you"
          placeholder="At least 10 characters"
          rows={3}
          required
          {...register('bio')}
          error={errors.bio?.message}
        />

        <LUIToggle label="Email me product updates" {...register('notifications')} />

        {/* LUICheckbox has no `error` prop either. */}
        <div style={{ ...column, gap: 6 }}>
          <LUICheckbox label="I accept the terms" {...register('terms')} />
          {errors.terms && <div className="alert error">{errors.terms.message}</div>}
        </div>

        <div style={{ display: 'flex', gap: 8 }}>
          <LUIButton variant="primary" type="submit">
            Create account
          </LUIButton>
          <LUIButton
            variant="outlined"
            type="button"
            onClick={() => {
              reset();
              setResult('—');
            }}
          >
            Reset
          </LUIButton>
        </div>

        <pre
          style={{
            margin: 0,
            padding: '8px 10px',
            borderRadius: 8,
            background: 'var(--bg-dark)',
            fontSize: 13,
            whiteSpace: 'pre-wrap',
          }}
        >
          {result}
        </pre>
      </form>
    );
  },
};

/**
 * A field stays quiet by simply not passing `error` — it is still validated in the form state.
 * Both fields below are required, empty and already validated — only the first shows the error.
 */
export const OptOut: Story = {
  render: function Render() {
    const {
      register,
      trigger,
      formState: { errors },
    } = useForm({
      resolver: zodResolver(optOutSchema),
      mode: 'onTouched',
      defaultValues: { name: '', quiet: '' },
    });

    // Validate on mount so the difference is visible without interacting.
    useEffect(() => {
      void trigger();
    }, [trigger]);

    return (
      <div style={{ ...column, gap: 16 }}>
        <LUITextInput
          label="Name"
          placeholder="Required"
          required
          {...register('name')}
          error={errors.name?.message}
        />
        <LUITextInput
          label="Name (no inline validation)"
          placeholder="Required, but stays quiet"
          {...register('quiet')}
        />
      </div>
    );
  },
};
