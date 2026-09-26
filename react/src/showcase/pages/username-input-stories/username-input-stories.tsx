import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { LUIUsernameInput } from '../../../components/ui/input/username-input/username-input';
import { ApiTable, type ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';
import './username-input-stories.css';

const apiInputs: ApiTableRow[] = [
  {
    name: 'label',
    description: 'Label rendered above the field, linked to the input.',
    type: 'string',
    default: '—',
    example: 'label="Username"',
  },
  {
    name: 'placeholder',
    description: 'Placeholder shown while the field is empty (native prop).',
    type: 'string',
    default: '—',
    example: 'placeholder="jane.doe"',
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
    example: 'id="username"',
  },
  {
    name: 'error',
    description:
      'Validation message shown under the field (linked via aria-describedby); also applies the error style.',
    type: 'string',
    default: '—',
    example: 'error={errors.username?.message}',
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
    example: 'viewValue="@jane.doe"',
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

const usernameSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters.')
    .regex(/^[a-zA-Z0-9._-]+$/, 'Only letters, numbers, dots, hyphens and underscores.'),
});

type UsernameForm = z.infer<typeof usernameSchema>;

export default function UsernameInputStories() {
  const [controlledValue, setControlledValue] = useState('');

  const {
    register,
    formState: { errors, isValid },
  } = useForm<UsernameForm>({ resolver: zodResolver(usernameSchema), mode: 'onBlur' });

  return (
    <div className="story-page">
      <header className="page-header">
        <h1 className="page-header__title">Username Input</h1>
        <p className="page-header__lead">
          Text field with a user icon. Validation is the consumer's job (e.g. zod +
          react-hook-form) — pass the message via the error prop to show the inline alert.
        </p>
      </header>

      <div className="stories">
        <Story
          title="Basic"
          description="Label, placeholder and user icon."
          code={'<LUIUsernameInput label="Username" placeholder="jane.doe" />'}
        >
          <LUIUsernameInput label="Username" placeholder="jane.doe" />
        </Story>

        <Story
          title="Controlled"
          description="Bind the value with useState."
          code={`const [value, setValue] = useState('');

<LUIUsernameInput label="Username" value={value} onChange={(e) => setValue(e.target.value)} />`}
        >
          <div className="demo-col">
            <LUIUsernameInput
              label="Username"
              placeholder="jane.doe"
              value={controlledValue}
              onChange={(e) => setControlledValue(e.target.value)}
            />
            <p className="demo-readout">Value: {controlledValue || '—'}</p>
          </div>
        </Story>

        <Story
          title="Validation — react-hook-form + zod"
          description="Type an invalid username and blur to see the inline error, driven by a zod schema."
          code={`const schema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters.')
    .regex(/^[a-zA-Z0-9._-]+$/, 'Only letters, numbers, dots, hyphens and underscores.'),
});
const { register, formState: { errors } } = useForm({
  resolver: zodResolver(schema),
  mode: 'onBlur',
});

<LUIUsernameInput label="Username" {...register('username')} error={errors.username?.message} />`}
        >
          <div className="demo-col">
            <LUIUsernameInput
              label="Username"
              placeholder="jane.doe"
              {...register('username')}
              error={errors.username?.message}
            />
            <p className="demo-readout">valid: {String(isValid)}</p>
          </div>
        </Story>

        <Story
          title="Disabled"
          description="Non-interactive state."
          code={'<LUIUsernameInput label="Username" disabled />'}
        >
          <LUIUsernameInput label="Username" placeholder="jane.doe" disabled />
        </Story>

        <Story
          title="View mode"
          description="viewMode renders the value as plain text — no input container."
          code={'<LUIUsernameInput label="Username" value="jane.doe" viewMode />'}
        >
          <LUIUsernameInput label="Username" value="jane.doe" viewMode />
        </Story>

        <ApiTable
          component="LUIUsernameInput"
          note="Wraps a native text input — all native props pass through, so {...register('field')} works directly; the bound value is a string. There is no built-in format validator: validate in the consumer (zod/react-hook-form) and surface the message via error."
          inputs={apiInputs}
          outputs={apiOutputs}
        />
      </div>
    </div>
  );
}
