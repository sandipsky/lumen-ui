import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { LUIPasswordInput } from '../../../components/ui/input/password-input/password-input';
import { ApiTable, type ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';
import './password-input-stories.css';

const apiInputs: ApiTableRow[] = [
  {
    name: 'label',
    description: 'Label rendered above the field, linked to the input.',
    type: 'string',
    default: '—',
    example: 'label="Password"',
  },
  {
    name: 'placeholder',
    description: 'Placeholder shown while the field is empty (native prop).',
    type: 'string',
    default: '—',
    example: 'placeholder="Enter your password"',
  },
  {
    name: 'disabled',
    description: 'Disable the field and the visibility toggle (native prop).',
    type: 'boolean',
    default: 'false',
    example: 'disabled',
  },
  {
    name: 'id',
    description: 'Id for the native input; auto-generated when omitted.',
    type: 'string',
    default: 'auto',
    example: 'id="password"',
  },
  {
    name: 'showRules',
    description: 'Show the live-validating password-requirements checklist below the field.',
    type: 'boolean',
    default: 'false',
    example: 'showRules',
  },
  {
    name: 'error',
    description: 'Validation message shown under the field; also applies the error style.',
    type: 'string',
    default: '—',
    example: 'error={errors.password?.message}',
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
    example: 'viewValue="••••••••"',
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

export default function PasswordInputStories() {
  const [controlledValue, setControlledValue] = useState('');

  const { register, control } = useForm<{ password: string }>();
  const rhfPassword = useWatch({ control, name: 'password' });

  return (
    <div className="story-page">
      <header className="page-header">
        <h1 className="page-header__title">Password Input</h1>
        <p className="page-header__lead">
          Password field with a lock icon and a show/hide toggle. Works uncontrolled with
          react-hook-form's register() and as a plain controlled component.
        </p>
      </header>

      <div className="stories">
        <Story
          title="Basic"
          description="Label, placeholder, lock icon and visibility toggle."
          code={'<LUIPasswordInput label="Password" placeholder="Enter your password" />'}
        >
          <LUIPasswordInput label="Password" placeholder="Enter your password" />
        </Story>

        <Story
          title="Controlled"
          description="Toggle visibility to reveal the typed value."
          code={`const [value, setValue] = useState('');

<LUIPasswordInput label="Password" value={value} onChange={(e) => setValue(e.target.value)} />`}
        >
          <div className="demo-col">
            <LUIPasswordInput
              label="Password"
              placeholder="Enter your password"
              value={controlledValue}
              onChange={(e) => setControlledValue(e.target.value)}
            />
            <p className="demo-readout">Value: {controlledValue || '—'}</p>
          </div>
        </Story>

        <Story
          title="react-hook-form — register"
          description="Spread register() onto the field."
          code={`const { register } = useForm<{ password: string }>();

<LUIPasswordInput label="Password" {...register('password')} />`}
        >
          <div className="demo-col">
            <LUIPasswordInput
              label="Password"
              placeholder="Enter your password"
              {...register('password')}
            />
            <p className="demo-readout">Form value: {rhfPassword || '—'}</p>
          </div>
        </Story>

        <Story
          title="Requirements checklist"
          description="Set showRules to display live-validating password rules. Type to see them turn valid."
          code={'<LUIPasswordInput label="Password" showRules />'}
        >
          <div className="demo-col">
            <LUIPasswordInput label="Password" placeholder="Enter your password" showRules />
          </div>
        </Story>

        <Story
          title="Disabled"
          description="Input and toggle are both disabled."
          code={'<LUIPasswordInput label="Password" disabled />'}
        >
          <LUIPasswordInput label="Password" placeholder="Enter your password" disabled />
        </Story>

        <Story
          title="View mode"
          description="viewMode renders the value as plain text — no input container or visibility toggle."
          code={'<LUIPasswordInput label="Password" value="hunter2!" viewMode />'}
        >
          <LUIPasswordInput label="Password" value="hunter2!" viewMode />
        </Story>

        <ApiTable
          component="LUIPasswordInput"
          note="Wraps a native input — all native props pass through, so {...register('field')} works directly; the bound value is a string. The show/hide toggle only switches the rendered input type; the value never changes."
          inputs={apiInputs}
          outputs={apiOutputs}
        />
      </div>
    </div>
  );
}
