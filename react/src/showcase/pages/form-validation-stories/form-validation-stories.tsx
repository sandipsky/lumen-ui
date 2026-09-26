import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { LUIButton } from '../../../components/ui/button/button';
import { LUIEmailInput } from '../../../components/ui/input/email-input/email-input';
import { LUIPasswordInput } from '../../../components/ui/input/password-input/password-input';
import { LUITextInput } from '../../../components/ui/input/text-input/text-input';
import { ApiTable, type ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';
import './form-validation-stories.css';

const apiInputs: ApiTableRow[] = [
  {
    name: 'error',
    description:
      'Validation message shown under the field; also applies the error style. Omit (or pass undefined) to keep a field quiet.',
    type: 'string',
    default: '—',
    example: "error={errors.name?.message}",
  },
  {
    name: 'required',
    description: 'Adds the required asterisk to the label (native prop, passed through).',
    type: 'boolean',
    default: 'false',
    example: 'required',
  },
];

/** Single-field demo: required + minimum length. */
const nameSchema = z.object({
  name: z.string().min(1, 'This field is required.').min(3, 'Must be at least 3 characters.'),
});
type NameForm = z.infer<typeof nameSchema>;

/** Opt-out demo: required, but the inline UI is suppressed. */
const quietSchema = z.object({
  quiet: z.string().min(1, 'This field is required.'),
});
type QuietForm = z.infer<typeof quietSchema>;

/** Full-form demo — errors surface on submit via handleSubmit. */
const signupSchema = z.object({
  fullName: z.string().min(1, 'This field is required.').min(3, 'Must be at least 3 characters.'),
  email: z.string().min(1, 'This field is required.'),
  password: z.string().min(1, 'This field is required.').min(8, 'Must be at least 8 characters.'),
});
type SignupForm = z.infer<typeof signupSchema>;

export default function FormValidationStories() {
  const {
    register: registerName,
    formState: { errors: nameErrors, isValid: nameValid, touchedFields: nameTouched },
  } = useForm<NameForm>({
    resolver: zodResolver(nameSchema),
    mode: 'onTouched',
    defaultValues: { name: '' },
  });

  const { register: registerQuiet } = useForm<QuietForm>({
    resolver: zodResolver(quietSchema),
    mode: 'onTouched',
    defaultValues: { quiet: '' },
  });

  const signupForm = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    mode: 'onTouched',
    defaultValues: { fullName: '', email: '', password: '' },
  });
  const signupErrors = signupForm.formState.errors;

  const [submittedValue, setSubmittedValue] = useState('—');

  const submit = signupForm.handleSubmit(
    (values) => setSubmittedValue(JSON.stringify(values, null, 2)),
    () => setSubmittedValue('Form is invalid — fix the highlighted fields.'),
  );

  const reset = (): void => {
    signupForm.reset();
    setSubmittedValue('—');
  };

  return (
    <div className="story-page">
      <header className="page-header">
        <h1 className="page-header__title">Form Validation</h1>
        <p className="page-header__lead">
          Validation is wired through <code>react-hook-form</code> + <code>zod</code> (replacing
          Angular's <code>FormValidation</code> host directive): spread{' '}
          <code>register('field')</code> onto any LumenUI input and pass{' '}
          <code>error=&#123;errors.field?.message&#125;</code> — the field gets the error style and
          an inline message once it is touched (<code>mode: 'onTouched'</code>) or the form is
          submitted. The required <code>*</code> on the label comes from the native{' '}
          <code>required</code> prop.
        </p>
      </header>

      <div className="stories">
        <Story
          title="Single field — required + minLength"
          description="Focus then blur the field while empty, or type fewer than 3 characters, to reveal the message. The asterisk comes from the required prop."
          code={`const schema = z.object({
  name: z.string().min(1, 'This field is required.').min(3, 'Must be at least 3 characters.'),
});
const { register, formState: { errors } } = useForm({
  resolver: zodResolver(schema),
  mode: 'onTouched',
});

<LUITextInput label="Name" required {...register('name')} error={errors.name?.message} />`}
        >
          <div className="demo-col">
            <LUITextInput
              label="Name"
              placeholder="At least 3 characters"
              required
              {...registerName('name')}
              error={nameErrors.name?.message}
            />
            <p className="demo-readout">
              valid: {String(nameValid)} · touched: {String(!!nameTouched.name)}
            </p>
          </div>
        </Story>

        <Story
          title="Full form — validate on submit"
          description="Submitting an incomplete form runs the whole schema and reveals every field's error at once (react-hook-form's equivalent of markAllAsTouched)."
          code={`const signupSchema = z.object({
  fullName: z.string().min(1, 'This field is required.').min(3, 'Must be at least 3 characters.'),
  email: z.string().min(1, 'This field is required.'),
  password: z.string().min(1, 'This field is required.').min(8, 'Must be at least 8 characters.'),
});

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(signupSchema),
  mode: 'onTouched',
});

const submit = handleSubmit((values) => {
  // ... use values
});

<form onSubmit={submit} noValidate>...</form>`}
        >
          <form className="demo-form" onSubmit={submit} noValidate>
            <LUITextInput
              label="Full name"
              placeholder="Jane Doe"
              required
              {...signupForm.register('fullName')}
              error={signupErrors.fullName?.message}
            />
            <LUIEmailInput
              label="Email"
              placeholder="you@example.com"
              required
              {...signupForm.register('email')}
              error={signupErrors.email?.message}
            />
            <LUIPasswordInput
              label="Password"
              placeholder="At least 8 characters"
              required
              {...signupForm.register('password')}
              error={signupErrors.password?.message}
            />

            <div className="demo-form__actions">
              <LUIButton variant="primary" type="submit">
                Create account
              </LUIButton>
              <LUIButton variant="outlined" type="button" onClick={reset}>
                Reset
              </LUIButton>
            </div>

            <pre className="demo-readout demo-readout--block">{submittedValue}</pre>
          </form>
        </Story>

        <Story
          title="Opt out — omit the error prop"
          description="A field stays quiet by simply not passing error — the control is still validated in the form state, but no inline UI is rendered (the Angular useValidation=false equivalent)."
          code={`<LUITextInput label="Name" {...register('quiet')} />  {/* no error prop */}`}
        >
          <div className="demo-col">
            <LUITextInput
              label="Name (no inline validation)"
              placeholder="Required, but stays quiet"
              {...registerQuiet('quiet')}
            />
          </div>
        </Story>

        <ApiTable
          component="error (validation pattern)"
          note="There is no directive in the React port — every LumenUI input exposes an error prop instead. With react-hook-form + zod, spread register('field') onto the input and pass error={errors.field?.message}: the field gets the error class and an inline message below it once it is touched or the form is submitted. Controlled components with non-DOM values (date-input, select, OTP) take the same error prop via <Controller>. No callbacks."
          inputs={apiInputs}
        />
      </div>
    </div>
  );
}
