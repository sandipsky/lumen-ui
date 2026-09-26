import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { LUIEmailInput } from '../../../components/ui/input/email-input/email-input';
import { ApiTable, type ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';
import './email-input-stories.css';

const apiInputs: ApiTableRow[] = [
  {
    name: 'label',
    description: 'Label rendered above the field, linked to the input.',
    type: 'string',
    default: '—',
    example: 'label="Email"',
  },
  {
    name: 'placeholder',
    description: 'Placeholder shown while the field is empty (native prop).',
    type: 'string',
    default: '—',
    example: 'placeholder="you@example.com"',
  },
  {
    name: 'disabled',
    description: 'Disable the field (native prop).',
    type: 'boolean',
    default: 'false',
    example: 'disabled',
  },
  {
    name: 'id',
    description: 'Id for the native input; auto-generated when omitted.',
    type: 'string',
    default: 'auto',
    example: 'id="email"',
  },
  {
    name: 'error',
    description:
      'Validation message shown under the field (linked via aria-describedby); also applies the error style.',
    type: 'string',
    default: '—',
    example: 'error={errors.email?.message}',
  },
  {
    name: 'viewMode',
    description: 'Render the value as plain text (from value/defaultValue) instead of the input.',
    type: 'boolean',
    default: 'false',
    example: 'viewMode',
  },
  {
    name: 'viewValue',
    description: 'Custom content shown in view mode; falls back to the value when omitted.',
    type: 'ReactNode',
    default: '—',
    example: 'viewValue={<a href="mailto:…">…</a>}',
  },
];

const apiOutputs: ApiTableRow[] = [
  {
    name: 'onInput',
    description: 'Native input event, on every keystroke.',
    type: 'FormEvent',
    example: 'onInput={(e) => …}',
  },
  {
    name: 'onChange',
    description: "Native change handler — in React it fires on every keystroke (what register() uses).",
    type: 'ChangeEvent',
    example: 'onChange={(e) => …}',
  },
  {
    name: 'onKeyUp',
    description: 'Native keyup event.',
    type: 'KeyboardEvent',
    example: 'onKeyUp={(e) => …}',
  },
  {
    name: 'onKeyDown',
    description: 'Native keydown event.',
    type: 'KeyboardEvent',
    example: 'onKeyDown={(e) => …}',
  },
  {
    name: 'onKeyPress',
    description: 'Native keypress event (deprecated in the DOM — prefer onKeyDown).',
    type: 'KeyboardEvent',
    example: 'onKeyPress={(e) => …}',
  },
  {
    name: 'onEnter',
    description: 'Called when Enter is pressed in the field.',
    type: 'KeyboardEvent',
    example: 'onEnter={(e) => …}',
  },
];

const emailSchema = z.object({
  email: z.email('Please enter a valid email address.'),
});

type EmailForm = z.infer<typeof emailSchema>;

export default function EmailInputStories() {
  const [controlledValue, setControlledValue] = useState('');

  const {
    register,
    formState: { errors, isValid },
  } = useForm<EmailForm>({ resolver: zodResolver(emailSchema), mode: 'onBlur' });

  return (
    <div className="story-page">
      <header className="page-header">
        <h1 className="page-header__title">Email Input</h1>
        <p className="page-header__lead">
          Email field with a mail icon. Format validation is the consumer's job (e.g. zod +
          react-hook-form) — pass the message via the error prop to show the inline alert.
        </p>
      </header>

      <div className="stories">
        <Story
          title="Basic"
          description="Label, placeholder and mail icon."
          code={'<LUIEmailInput label="Email" placeholder="you@example.com" />'}
        >
          <LUIEmailInput label="Email" placeholder="you@example.com" />
        </Story>

        <Story
          title="Controlled"
          description="Bind the value with useState."
          code={`const [value, setValue] = useState('');

<LUIEmailInput label="Email" value={value} onChange={(e) => setValue(e.target.value)} />`}
        >
          <div className="demo-col">
            <LUIEmailInput
              label="Email"
              placeholder="you@example.com"
              value={controlledValue}
              onChange={(e) => setControlledValue(e.target.value)}
            />
            <p className="demo-readout">Value: {controlledValue || '—'}</p>
          </div>
        </Story>

        <Story
          title="Validation — react-hook-form + zod"
          description="Type an invalid address and blur to see the inline error, driven by a zod schema."
          code={`const schema = z.object({ email: z.email('Please enter a valid email address.') });
const { register, formState: { errors } } = useForm({
  resolver: zodResolver(schema),
  mode: 'onBlur',
});

<LUIEmailInput label="Email" {...register('email')} error={errors.email?.message} />`}
        >
          <div className="demo-col">
            <LUIEmailInput
              label="Email"
              placeholder="you@example.com"
              {...register('email')}
              error={errors.email?.message}
            />
            <p className="demo-readout">valid: {String(isValid)}</p>
          </div>
        </Story>

        <Story
          title="Disabled"
          description="Non-interactive state."
          code={'<LUIEmailInput label="Email" disabled />'}
        >
          <LUIEmailInput label="Email" placeholder="you@example.com" disabled />
        </Story>

        <Story
          title="View mode"
          description="viewMode renders the value as plain text — no input container."
          code={'<LUIEmailInput label="Email" value="jane@example.com" viewMode />'}
        >
          <LUIEmailInput label="Email" value="jane@example.com" viewMode />
        </Story>

        <ApiTable
          component="LUIEmailInput"
          note="Wraps a native email input — all native props pass through, so {...register('field')} works directly; the bound value is a string. Unlike the Angular version there is no built-in format validator: validate in the consumer (zod/react-hook-form) and surface the message via error."
          inputs={apiInputs}
          outputs={apiOutputs}
        />
      </div>
    </div>
  );
}
